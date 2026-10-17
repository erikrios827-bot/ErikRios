import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { FeedView } from './components/FeedView';
import { SearchView } from './components/SearchView';
import { PracticeDetailModal } from './components/PracticeDetailModal';
import { SubmitPracticeModal } from './components/SubmitPracticeModal';
import { ApprovalsView } from './components/ApprovalsView';
import { InsightsView } from './components/InsightsView';
import { ProfileView } from './components/ProfileView';
import { AdminView } from './components/AdminView';
import { AuthRoleModal } from './components/AuthRoleModal';
import { HelpProcessModal } from './components/HelpProcessModal';

import { storageService } from './services/storageService';
import { GoodPractice, SupportedLanguage, UserProfile } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile>(storageService.getCurrentUser());
  const [lang, setLang] = useState<SupportedLanguage>(storageService.getLanguage());
  const [selectedCountry, setSelectedCountry] = useState<string>(storageService.getCountry());
  
  const [practices, setPractices] = useState<GoodPractice[]>(storageService.getPractices());
  const [selectedPractice, setSelectedPractice] = useState<GoodPractice | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(storageService.getUserBookmarks(currentUser.id));
  
  // Modals
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');

  // Sync bookmarks when user switches
  useEffect(() => {
    setBookmarks(storageService.getUserBookmarks(currentUser.id));
  }, [currentUser.id]);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLang(newLang);
    storageService.setLanguage(newLang);
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    storageService.setCountry(country);
  };

  const handleUserSelect = (user: UserProfile) => {
    setCurrentUser(user);
    storageService.setCurrentUser(user);
    setBookmarks(storageService.getUserBookmarks(user.id));
  };

  const handleSelectPractice = (practice: GoodPractice) => {
    storageService.incrementView(practice.id);
    setPractices(storageService.getPractices());
    const refreshed = storageService.getPracticeById(practice.id) || practice;
    setSelectedPractice(refreshed);
  };

  const handleToggleBookmark = (practiceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    storageService.toggleBookmark(practiceId, currentUser.id);
    setBookmarks(storageService.getUserBookmarks(currentUser.id));
    setPractices(storageService.getPractices());
    if (selectedPractice && selectedPractice.id === practiceId) {
      setSelectedPractice(storageService.getPracticeById(practiceId) || null);
    }
  };

  const handleToggleReaction = (practiceId: string, type: 'useful' | 'excellent' | 'inspiring' | 'replicable') => {
    const updated = storageService.toggleReaction(practiceId, currentUser.id, type);
    if (updated) {
      setPractices(storageService.getPractices());
      if (selectedPractice && selectedPractice.id === practiceId) {
        setSelectedPractice(updated);
      }
    }
  };

  const handleAddComment = (practiceId: string, text: string) => {
    const updated = storageService.addComment(practiceId, text, currentUser);
    if (updated) {
      setPractices(storageService.getPractices());
      if (selectedPractice && selectedPractice.id === practiceId) {
        setSelectedPractice(updated);
      }
    }
  };

  const handleSubmitPractice = (practiceData: Partial<GoodPractice>) => {
    storageService.createPractice(practiceData, currentUser);
    setPractices(storageService.getPractices());
    setCurrentView('approvals'); // Take user directly to review queue to inspect unanimous status
  };

  const handleReviewDecision = (
    practiceId: string,
    approverId: string,
    decision: 'approved' | 'rejected' | 'changes_requested',
    comments: string
  ) => {
    const updated = storageService.submitReviewDecision(
      practiceId,
      approverId,
      decision,
      comments,
      currentUser
    );
    if (updated) {
      setPractices(storageService.getPractices());
      if (selectedPractice && selectedPractice.id === practiceId) {
        setSelectedPractice(updated);
      }
    }
  };

  const handleSearchSubmitFromHero = (queryText: string) => {
    setSearchInitialQuery(queryText);
    setCurrentView('search');
  };

  const pendingApprovalsCount = practices.filter(p => 
    p.status === 'pending_approval' || p.status === 'under_review'
  ).length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 font-sans">
      {/* Dark Green Vertical Sidebar matching Imagen8.png */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'help') {
            setIsHelpModalOpen(true);
          } else if (view === 'share') {
            setIsSubmitModalOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
        lang={lang}
        pendingApprovalsCount={pendingApprovalsCount}
      />

      {/* Main App Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <TopHeader
          currentUser={currentUser}
          lang={lang}
          onLanguageChange={handleLanguageChange}
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          {currentView === 'home' && (
            <FeedView
              practices={practices}
              onSelectPractice={handleSelectPractice}
              onNavigate={setCurrentView}
              onSearchSubmit={handleSearchSubmitFromHero}
              onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
              lang={lang}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {currentView === 'search' && (
            <SearchView
              practices={practices}
              initialQuery={searchInitialQuery}
              onSelectPractice={handleSelectPractice}
              lang={lang}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {currentView === 'approvals' && (
            <ApprovalsView
              practices={practices}
              currentUser={currentUser}
              lang={lang}
              onSelectPractice={handleSelectPractice}
              onReviewDecision={handleReviewDecision}
            />
          )}

          {currentView === 'insights' && (
            <InsightsView
              practices={practices}
              lang={lang}
            />
          )}

          {currentView === 'contributions' && (
            <ProfileView
              currentUser={currentUser}
              practices={practices}
              bookmarks={bookmarks}
              onSelectPractice={handleSelectPractice}
              onToggleBookmark={handleToggleBookmark}
              lang={lang}
            />
          )}

          {currentView === 'admin' && (
            <AdminView
              currentUser={currentUser}
              lang={lang}
            />
          )}
        </main>
      </div>

      {/* Practice Detail Modal (Right view in Imagen8.png) */}
      {selectedPractice && (
        <PracticeDetailModal
          practice={selectedPractice}
          onClose={() => setSelectedPractice(null)}
          currentUser={currentUser}
          lang={lang}
          isBookmarked={bookmarks.includes(selectedPractice.id)}
          onToggleBookmark={handleToggleBookmark}
          onToggleReaction={handleToggleReaction}
          onAddComment={handleAddComment}
        />
      )}

      {/* Multi-step Practice Submission Form Modal */}
      <SubmitPracticeModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmit={handleSubmitPractice}
        currentUser={currentUser}
        lang={lang}
      />

      {/* Public Visitor & Corporate Persona Switcher Modal */}
      <AuthRoleModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onSelectUser={handleUserSelect}
        lang={lang}
      />

      {/* Help & Framework Rules Modal */}
      <HelpProcessModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
