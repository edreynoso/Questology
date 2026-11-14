import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaCog } from "react-icons/fa";
import { toast } from "react-toastify";
import CreateQuestButton from "../components/createQuestButton";
import CreateQuestModal from "../components/createQuestModal";
import QuestDetailsModal from "../components/questDetailsModal";
import PendingQuestDetailsModal from "../components/pendingQuestDetailsModal";
import { getCommunity } from "../data/communities";
import {
  formatQuestDate,
  getCommunityQuests,
  hasRsvped,
  reviewQuest,
  rsvpToQuest,
  submitQuest,
  type QuestProps,
} from "../data/quests";
import { bannerStyle } from "../utils/bannerStyle";
import NotFound, { NOT_FOUND_PATH } from "./notFound";
import "./community-quests.css";

type QuestListProps = {
  quests: QuestProps[];
  emptyText: string;
  onSelect: (quest: QuestProps) => void;
  signedUpQuestIds: string[];
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

export default function CommunityQuests() {
  const { communityId } = useParams();
  const community = getCommunity(communityId);
  const navigate = useNavigate();
  const [selectedQuest, setSelectedQuest] = useState<QuestProps | null>(null);
  const [showCreateQuest, setShowCreateQuest] = useState(false);
  const [selectedPendingQuest, setSelectedPendingQuest] =
    useState<QuestProps | null>(null);
  // Bumped after submit/review/RSVP so quests re-read from the data module
  const [, setQuestDataVersion] = useState(0);

  if (!community) {
    return <NotFound />;
  }

  const quests = getCommunityQuests(community.id, "approved");
  const signedUpQuestIds = quests
    .filter((quest) => hasRsvped(quest.id))
    .map((quest) => quest.id);
  const activeQuests = quests.filter((quest) => quest.status === "active");
  const upcomingQuests = quests.filter((quest) => quest.status === "upcoming");
  const currentCommunityId = community.id;
  const isModeratedCommunity = community.isModerated;
  const pendingQuests = isModeratedCommunity
    ? getCommunityQuests(currentCommunityId, "pending")
    : [];
  
  function handleSubmitForReview(quest: QuestProps) {
    submitQuest(quest, currentCommunityId);
    setQuestDataVersion((version) => version + 1);
    setShowCreateQuest(false);
    toast.success(
      isModeratedCommunity
        ? `${quest.name} was submitted for review!`
        : `${quest.name} was posted to Upcoming Quests!`,
    );
  }

  function handleQuestReviewed(questId: string, action: "approve" | "deny") {
    reviewQuest(questId, action);
    setQuestDataVersion((version) => version + 1);
  }

  function handleRsvp(questId: string) {
    rsvpToQuest(questId);
    setQuestDataVersion((version) => version + 1);
  }
  
  return (
    <>
      <div className="community-page">
        <Link to="/communities" className="community-back-link">
          <FaChevronLeft aria-hidden="true" />
          Communities
        </Link>

        <section
          className="community-banner"
          style={bannerStyle(community.bannerUrl, true)}
        >
          <div className="community-heading">
            <h2 className="page-title">{community.name}</h2>

            <div className="community-actions">
              {isModeratedCommunity && (
                <div className="community-action-buttons">
                  <button
                    type="button"
                    className="community-settings-button"
                    aria-label="Community settings"
                    title="Community settings"
                    onClick={() => {
                      toast.info("Community settings are not implemented yet!");
                      navigate(NOT_FOUND_PATH, {
                        state: { feature: "Community settings" },
                      });
                    }}
                  >
                    <FaCog aria-hidden="true" />
                  </button>
                </div>
              )}

              <span className="community-status">Joined</span>

            </div>
          </div>

          <p>{community.description}</p>
        </section>

        <div className="quest-sections">
          <section className="active-quests">
            <h3 className="section-title">Active Quests</h3>
            <QuestList
              quests={activeQuests}
              emptyText="None at the moment..."
              onSelect={setSelectedQuest}
              signedUpQuestIds={signedUpQuestIds}
            />
          </section>

          <section className="upcoming-quests">
            <h3 className="section-title">Upcoming Quests</h3>
            <QuestList
              quests={upcomingQuests}
              emptyText="None at the moment..."
              onSelect={setSelectedQuest}
              signedUpQuestIds={signedUpQuestIds}
            />
          </section>

          {isModeratedCommunity && (
            <section className="pending-quests">
              <h3 className="section-title">Pending Quests</h3>
              <QuestList
                quests={pendingQuests}
                emptyText="No quests are waiting for approval."
                onSelect={setSelectedPendingQuest}
                signedUpQuestIds={[]}
              />
            </section>
          )}
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

      {selectedPendingQuest && (
        <PendingQuestDetailsModal
          key={selectedPendingQuest.id}
          quest={selectedPendingQuest}
          onClose={() => setSelectedPendingQuest(null)}
          onReview={(action) =>
            handleQuestReviewed(selectedPendingQuest.id, action)
          }
        />
      )}
    </>
  );
}
