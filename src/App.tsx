import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import Layout from './components/_layout'
import Communities from './pages/communities'
import Login from './pages/login'
import RequireAuth from './components/requireAuth'
import NotFound from './pages/notFound'
import CommunityQuests from './pages/community-quests'
import PendingQuests from './pages/pending-quests'
import { useState } from "react";
import type { QuestProps } from "./data/quests";

type AppRoutesProps = {
  pendingQuests: QuestProps[];
  approvedQuests: QuestProps[];
  onQuestSubmitted: (quest: QuestProps) => void;
  onQuestReviewed: (questId: string, action: "approve" | "deny") => void;
};

function AppRoutes({
  pendingQuests,
  approvedQuests,
  onQuestSubmitted,
  onQuestReviewed,
}: AppRoutesProps) {
  // Future pages/ route logic
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Layout/>}>
        <Route element={<RequireAuth/>}>
          <Route index element={<Navigate to='/communities' replace/>}/>
          <Route path='communities' element={<Communities/>}/>
          <Route
            path="communities/:communityId"
            element={
              <CommunityQuests
                onQuestSubmitted={onQuestSubmitted}
                approvedQuests={approvedQuests}
              />
            }
          />
          <Route
            path="moderator/quests"
            element={
              <PendingQuests
                quests={pendingQuests}
                onQuestReviewed={onQuestReviewed}
              />
            }
          />
        </Route>
        <Route path='404' element={<NotFound/>}/>
      </Route>
      <Route path='*' element={<NotFound/>}/>
      
    </Routes>
  )
}

export default function App() {

  const [pendingQuests, setPendingQuests] = useState<QuestProps[]>([]);
  const [approvedQuests, setApprovedQuests] = useState<QuestProps[]>([]);

  function handleQuestSubmitted(quest: QuestProps) {
    setPendingQuests((currentQuests) => [...currentQuests, quest]);
  }

  function handleQuestReviewed(
    questId: string,
    action: "approve" | "deny",
  ) {
    const reviewedQuest = pendingQuests.find((quest) => quest.id === questId);

    if (!reviewedQuest) {
      return;
    }

    setPendingQuests((currentQuests) =>
      currentQuests.filter((quest) => quest.id !== questId),
    );

    if (action === "approve") {
      setApprovedQuests((currentQuests) => [
        ...currentQuests,
        { ...reviewedQuest, status: "upcoming" },
      ]);
    }
  }

  return (
    <BrowserRouter>
      <AppRoutes
        pendingQuests={pendingQuests}
        approvedQuests={approvedQuests}
        onQuestSubmitted={handleQuestSubmitted}
        onQuestReviewed={handleQuestReviewed}
      />
      <ToastContainer
        position='top-right'
        autoClose={3000}
        theme='colored'
      />
    </BrowserRouter>
  )
}