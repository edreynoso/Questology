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
  const [reviewAction, setReviewAction] = useState<ReviewAction | null>(null);
  const [reason, setReason] = useState("");

  function openReviewPopup(action: ReviewAction) {
    setReason("");
    setReviewAction(action);
  }

  function handleReviewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const actionLabel =
      reviewAction === "approve" ? "approved" : "denied";


    if (!reviewAction) {
        return;
    }

    onReview(reviewAction);
    toast.success(`${quest.name} was ${actionLabel}.`);
    setReviewAction(null);
    onClose();
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
            onClick={() => openReviewPopup("approve")}
          >
            <FaCheck aria-hidden="true" />
            Approve Quest
          </button>

          <button
            type="button"
            className="review-deny-button"
            onClick={() => openReviewPopup("deny")}
          >
            <FaTimes aria-hidden="true" />
            Deny Quest
          </button>
        </div>
      </Modal>

      {reviewAction && (
        <Modal
          label={`${reviewAction === "approve" ? "Approve" : "Deny"} ${
            quest.name
          }`}
          onClose={() => setReviewAction(null)}
          className="review-reason-modal"
        >
          <form onSubmit={handleReviewSubmit}>
            <h2>
              {reviewAction === "approve"
                ? "Approve Quest"
                : "Deny Quest"}
            </h2>

            <label>
              Reason for {reviewAction === "approve" ? "approval" : "denial"}
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
                onClick={() => setReviewAction(null)}
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