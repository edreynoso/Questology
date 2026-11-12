
import { useState } from "react";
import Page from "../components/page";
import "./quest-details.css";

export default function QuestDetails() {
  const [acknowledged, setAcknowledged] = useState(false); // requirements
  const [showReminder, setShowReminder] = useState(false); // popup notif
  const [confirmed, setConfirmed] = useState(false); // rsvp 

  function handleRSVP() {
    if (acknowledged) {
      setShowReminder(true);
    }
  }

  function handleReminderChoice() {
    setShowReminder(false);
    setConfirmed(true);
  }

  return (
    <Page>
      <div className="quest-details">
        <div className="quest-card">
          <h2>Quest Name: Rock Climbing Quest</h2>

          <div className="quest-information">
            <section>
              <h3>Date:</h3>
              <p>January 1, 2027</p>
            </section>

            <section>
              <h3>Time:</h3>
              <p>12:00 PM PST</p>
            </section>

            <section>
              <h3>Location:</h3>
              <p>Somewhere in SLO</p>
            </section>

            <section>
              <h3>Description:</h3>
              <p>
                A very descriptive description for this very interesting random
                hiking quest. Wow it is very interesting.
              </p>
            </section>

            <section>
              <h3>Additional Requirements:</h3>
              <ul>
                <li>A very important requirement probably goes here.</li>
                <li>Another very important requirement probably goes here.</li>
              </ul>
            </section>
          </div>

          <label className="requirements-checkbox">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(event) => setAcknowledged(event.target.checked)}
            />
            I acknowledge all requirements...
          </label>

          <button
            className="rsvp-button"
            onClick={handleRSVP}
            disabled={!acknowledged || confirmed}
          >
            {confirmed ? "Attending!" : "RSVP"}
          </button>
        </div>

        {showReminder && (
          <div className="modal-overlay">
            <div className="reminder-modal">
              <h2>You're attending:</h2>
              <h2>Rock Climbing Quest</h2>

              <h3>Allow Reminders?</h3>

              <div className="modal-buttons">
                <button onClick={handleReminderChoice}>Yes</button>

                <button onClick={handleReminderChoice}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}
