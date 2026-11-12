import Page from "../components/page";
import "./community-quests.css";
import { Link } from "react-router-dom";

export default function CommunityQuests() {
  return (
    <Page>
      <div className="community-page">
        {/* community banner */}
        <section className="community-banner">
          <div className="community-heading">
            <h2>Rock Climbing</h2>
            <span className="community-status">Joined</span>
          </div>

          <p>A very great description about rock climbing...</p>
        </section>

        {/* quests list */}
        <div className="quest-sections">
          {/* active quests */}
          <section className="active-quests">
            <h3>Active Quests</h3>

            <p className="empty-quests">None at the moment...</p>
          </section>

          {/* upcoming quests */}
          <section className="upcoming-quests">
            <h3>Upcoming Quests</h3>

            <div className="quest-list">
              <Link to="/quest/rock-climbing" className="quest-list-item">
                <span className="quest-name">Rock Climbing Quest</span>

                <span className="quest-date">January 1, 2027</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Page>
  );
}
