import { useState } from "react";
import { toast } from "react-toastify";
import { formatQuestDate, type QuestProps } from "../data/quests";
import Modal from "./modal";
import "./questDetailsModal.css";

type QuestDetailsModalProps = {
  quest: QuestProps;
  onClose: () => void;
};

export default function QuestDetailsModal({ quest, onClose }: QuestDetailsModalProps) {
  const [acknowledged, setAcknowledged] = useState(false); // requirements
  const [showReminder, setShowReminder] = useState(false); // popup notif

  function handleReminderChoice(allowReminders: boolean) {
    toast.success(
      allowReminders
        ? `Successfully RSVP'd to ${quest.name}! We'll remind you before it starts.`
        : `Successfully RSVP'd to ${quest.name}!`
    );
    onClose(); // closes both modals
  }

  return (
    <>
      <Modal label={quest.name} onClose={onClose} className="quest-card">
        <h2>{quest.name}</h2>

        <div className="quest-information">
          <section>
            <h3>Date:</h3>
            <p>{formatQuestDate(quest.date)}</p>
          </section>

          <section>
            <h3>Time:</h3>
            <p>{quest.time}</p>
          </section>

          <section>
            <h3>Location:</h3>
            <p>{quest.location}</p>
          </section>

          <section>
            <h3>Description:</h3>
            <p>{quest.description}</p>
          </section>

          <section>
            <h3>Additional Requirements:</h3>
            <ul>
              {quest.requirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
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
          type="button"
          className="rsvp-button"
          onClick={() => setShowReminder(true)}
          disabled={!acknowledged}
        >
          RSVP
        </button>
      </Modal>

      {showReminder && (
        <Modal
          label={`RSVP to ${quest.name}`}
          onClose={() => setShowReminder(false)}
          className="reminder-modal"
        >
          <h2>You're attending:</h2>
          <h2>{quest.name}</h2>

          <h3>Allow Reminders?</h3>

          <div className="modal-buttons">
            <button type="button" autoFocus onClick={() => handleReminderChoice(true)}>Yes</button>
            <button type="button" onClick={() => handleReminderChoice(false)}>No</button>
          </div>
        </Modal>
      )}
    </>
  );
}
