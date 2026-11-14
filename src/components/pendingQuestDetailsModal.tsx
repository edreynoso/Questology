import { useState, type FormEvent } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { formatQuestDate, type QuestProps } from "../data/quests";
import Modal from "./modal";
import "./questDetailsModal.css";

type ReviewAction = "approve" | "deny";

type PendingQuestDetailsModalProps = {
  quest: QuestProps;
  onClose: () => void;
  onReview: (action: ReviewAction) => void;
};

export default function PendingQuestDetailsModal({
  quest,
  onClose,
  onReview,
}: PendingQuestDetailsModalProps) {
  const [showDenyForm, setShowDenyForm] = useState(false);
  const [reason, setReason] = useState("");

  function finishReview(action: ReviewAction) {
    onReview(action);
    toast.success(`${quest.name} was ${action === "approve" ? "approved" : "denied"}.`);
    onClose();
  }

  function openDenyForm() {
    setReason("");
    setShowDenyForm(true);
  }

  function handleDenySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowDenyForm(false);
    finishReview("deny");
  }

  return (
    <>
      <Modal
        label={`Review ${quest.name}`}
        onClose={onClose}
        className="quest-card"
      >
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

        <div className="review-actions">
          <button
            type="button"
            className="review-approve-button"
            onClick={() => finishReview("approve")}
          >
            <FaCheck aria-hidden="true" />
            Approve Quest
          </button>

          <button
            type="button"
            className="review-deny-button"
            onClick={openDenyForm}
          >
            <FaTimes aria-hidden="true" />
            Deny Quest
          </button>
        </div>
      </Modal>

      {showDenyForm && (
        <Modal
          label={`Deny ${quest.name}`}
          onClose={() => setShowDenyForm(false)}
          className="review-reason-modal"
        >
          <form onSubmit={handleDenySubmit}>
            <h2>Deny Quest</h2>

            <label>
              Reason for denial
              <textarea
                required
                rows={6}
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Enter reason here..."
              />
            </label>

            <div className="review-reason-actions">
              <button
                type="button"
                onClick={() => setShowDenyForm(false)}
              >
                Cancel
              </button>

              <button type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}