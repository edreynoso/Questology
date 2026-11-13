import { formatQuestDate, type QuestProps } from "../data/quests";
import "./pending-quests.css";
import { useState } from "react";
import PendingQuestDetailsModal from "../components/pendingQuestDetailsModal";

type PendingQuestsProps = {
  quests: QuestProps[];
  onQuestReviewed: (questId: string, action: "approve" | "deny") => void;
};

export default function PendingQuests({
  quests,
  onQuestReviewed,
}: PendingQuestsProps) {
  const [selectedQuest, setSelectedQuest] = useState<QuestProps | null>(null);
  const sortedQuests = [...quests].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  return (
    <main className="pending-quests-page">
      <div className="pending-quests-heading">
        <h2>Rock Climbing</h2>
        <p className="pending-quests-subheading">Pending Quests</p>
      </div>

      <section
        className="pending-quests-panel"
        aria-labelledby="pending-list-title"
      >
        <h3 id="pending-list-title">Awaiting review</h3>

        {sortedQuests.length === 0 ? (
          <p className="pending-quests-empty">
            No quests are waiting for approval.
          </p>
        ) : (
          <div className="pending-quest-list">
            {sortedQuests.map((quest) => (
              <button
                type="button"
                className="pending-quest"
                key={quest.id}
                onClick={() => setSelectedQuest(quest)}
              >
                <span className="pending-quest-name">{quest.name}</span>
                <span className="pending-quest-date">
                  {formatQuestDate(quest.date)}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>
      {selectedQuest && (
        <PendingQuestDetailsModal
          quest={selectedQuest}
          onClose={() => setSelectedQuest(null)}
          onReview={(action) => onQuestReviewed(selectedQuest.id, action)}
        />
      )}
    </main>
  );
}
