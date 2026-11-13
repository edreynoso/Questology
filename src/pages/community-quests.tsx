import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import { toast } from "react-toastify";
import CreateQuestButton from "../components/createQuestButton";
import CreateQuestModal from "../components/createQuestModal";
import QuestDetailsModal from "../components/questDetailsModal";
import { getCommunity } from "../data/communities";
import { formatQuestDate, getQuest, type QuestProps } from "../data/quests";
import { bannerStyle } from "../utils/bannerStyle";
import NotFound from "./notFound";
import "./community-quests.css";

type QuestListProps = {
  quests: QuestProps[];
  emptyText: string;
  onSelect: (quest: QuestProps) => void;
  signedUpQuestIds: string[];
};

type CommunityQuestsProps = {
  onQuestSubmitted: (quest: QuestProps) => void;
  approvedQuests: QuestProps[];
};

function QuestList({
  quests,
  emptyText,
  onSelect,
  signedUpQuestIds,
}: QuestListProps) {
  if (quests.length === 0) {
    return <p className="empty-quests">{emptyText}</p>;
  }

  return (
    <div className="quest-list">
      {quests.map((quest) => {
        const hasSignedUp = signedUpQuestIds.includes(quest.id);

        return (
          <button
            key={quest.id}
            type="button"
            className={`quest-list-item ${
              hasSignedUp ? "quest-list-item--joined" : ""
            }`}
            onClick={() => onSelect(quest)}
          >
            <span className="quest-name-with-check">
              <span className="quest-name">{quest.name}</span>

              {hasSignedUp && (
                <span className="quest-joined-mark" aria-label="Signed up">
                  ✓
                </span>
              )}
            </span>

            <span className="quest-date">{formatQuestDate(quest.date)}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function CommunityQuests({
  onQuestSubmitted,
  approvedQuests,
}: CommunityQuestsProps) {
  const { communityId } = useParams();
  const community = getCommunity(communityId);
  const navigate = useNavigate();
  const [selectedQuest, setSelectedQuest] = useState<QuestProps | null>(null);
  const [showCreateQuest, setShowCreateQuest] = useState(false);
  const [signedUpQuestIds, setSignedUpQuestIds] = useState<string[]>([]);

  if (!community) {
    return <NotFound />;
  }

 const existingQuests = (community.communityQuestIds ?? [])
    .map(getQuest)
    .filter((quest): quest is QuestProps => quest !== undefined);

  const newlyApprovedQuests =
    community.id === "rock-climbing" ? approvedQuests : [];

  const quests = [...existingQuests, ...newlyApprovedQuests].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  const activeQuests = quests.filter((quest) => quest.status === "active");
  const upcomingQuests = quests.filter((quest) => quest.status === "upcoming");
  const isModeratedCommunity = community.id === "rock-climbing";
  
  function handleSubmitForReview(quest: QuestProps) {
    if (isModeratedCommunity) {
      onQuestSubmitted(quest);
    }

    setShowCreateQuest(false);
    toast.success(`${quest.name} was submitted for review!`);
  }

  function handleRsvp(questId: string) {
    setSignedUpQuestIds((currentIds) => {
      if (currentIds.includes(questId)) {
        return currentIds;
      }

      return [...currentIds, questId];
    });
  }
  
  return (
    <>
      <div className="community-page">
        {/* community banner */}
        <section
          className="community-banner"
          style={bannerStyle(community.bannerUrl)}
        >
          <div className="community-heading">
            <h2>{community.name}</h2>

            <div className="community-actions">
              <span className="community-status">Joined</span>

              {community.id === "rock-climbing" && (
                <div className="community-action-buttons">
                  <button
                    type="button"
                    className="pending-quests-button"
                    onClick={() => navigate("/moderator/quests")}
                  >
                    Pending Quests
                  </button>

                  <button
                    type="button"
                    className="community-settings-button"
                    onClick={() =>
                      toast.info("Community settings are not implemented yet!")
                    }
                  >
                    <FaCog aria-hidden="true" />
                    Settings
                  </button>
                </div>
              )}
            </div>
          </div>

          <p>{community.description}</p>
        </section>

        {/* quests list */}
        <div className="quest-sections">
          {/* active quests */}
          <section className="active-quests">
            <h3>Active Quests</h3>
            <QuestList
              quests={activeQuests}
              emptyText="None at the moment..."
              onSelect={setSelectedQuest}
              signedUpQuestIds={signedUpQuestIds}
            />
          </section>

          {/* upcoming quests */}
          <section className="upcoming-quests">
            <h3>Upcoming Quests</h3>
            <QuestList
              quests={upcomingQuests}
              emptyText="None at the moment..."
              onSelect={setSelectedQuest}
              signedUpQuestIds={signedUpQuestIds}
            />
          </section>
        </div>
      </div>

      <CreateQuestButton onClick={() => setShowCreateQuest(true)} />

      {showCreateQuest && (
        <CreateQuestModal
          communityName={community.name}
          communityRequirements={community.questRequirements}
          onSubmitForReview={handleSubmitForReview}
          onClose={() => setShowCreateQuest(false)}
        />
      )}

      {selectedQuest && (
        <QuestDetailsModal
          key={selectedQuest.id}
          quest={selectedQuest}
          onClose={() => setSelectedQuest(null)}
          onRsvp={handleRsvp}
        />
      )}
    </>
  );
}
