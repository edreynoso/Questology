import { useState } from "react";
import { useParams } from "react-router-dom";
import QuestDetailsModal from "../components/questDetailsModal";
import { getCommunity } from "../data/communities";
import { formatQuestDate, getQuest, type QuestProps } from "../data/quests";
import NotFound from "./notFound";
import "./community-quests.css";

function todayIso(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

type QuestListProps = {
  quests: QuestProps[];
  emptyText: string;
  onSelect: (quest: QuestProps) => void;
};

function QuestList({ quests, emptyText, onSelect }: QuestListProps) {
  if (quests.length === 0) {
    return <p className="empty-quests">{emptyText}</p>;
  }
  return (
    <div className="quest-list">
      {quests.map((quest) => (
        <button
          key={quest.id}
          type="button"
          className="quest-list-item"
          onClick={() => onSelect(quest)}
        >
          <span className="quest-name">{quest.name}</span>
          <span className="quest-date">{formatQuestDate(quest.date)}</span>
        </button>
      ))}
    </div>
  );
}

export default function CommunityQuests() {
  const { communityId } = useParams();
  const community = getCommunity(communityId);
  const [selectedQuest, setSelectedQuest] = useState<QuestProps | null>(null);

  if (!community) {
    return <NotFound />;
  }

  const today = todayIso();
  const quests = (community.communityQuestIds ?? [])
    .map(getQuest)
    .filter((quest): quest is QuestProps => quest !== undefined)
    .sort((a, b) => a.date.localeCompare(b.date));
  const activeQuests = quests.filter((quest) => quest.date === today);
  const upcomingQuests = quests.filter((quest) => quest.date > today);

  return (
    <>
      <div className="community-page">
        {/* community banner */}
        <section className="community-banner">
          <div className="community-heading">
            <h2>{community.name}</h2>
            <span className="community-status">Joined</span>
          </div>

          <p>{community.description}</p>
        </section>

        {/* quests list */}
        <div className="quest-sections">
          {/* active quests */}
          <section className="active-quests">
            <h3>Active Quests</h3>
            <QuestList quests={activeQuests} emptyText="None at the moment..." onSelect={setSelectedQuest} />
          </section>

          {/* upcoming quests */}
          <section className="upcoming-quests">
            <h3>Upcoming Quests</h3>
            <QuestList quests={upcomingQuests} emptyText="None at the moment..." onSelect={setSelectedQuest} />
          </section>
        </div>
      </div>

      {selectedQuest && (
        <QuestDetailsModal
          key={selectedQuest.id}
          quest={selectedQuest}
          onClose={() => setSelectedQuest(null)}
        />
      )}
    </>
  );
}
