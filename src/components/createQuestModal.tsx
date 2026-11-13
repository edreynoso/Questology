import { useState, type FormEvent } from "react";
import type { QuestProps } from "../data/quests";
import Modal from "./modal";
import "./createQuestModal.css";

type CreateQuestModalProps = {
  communityName: string;
  communityRequirements: string[];
  onSubmitForReview: (quest: QuestProps) => void;
  onClose: () => void;
};

function formatTime(value: string): string {
  const [hours, minutes] = value.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export default function CreateQuestModal({
  communityName,
  communityRequirements,
  onSubmitForReview,
  onClose,
}: CreateQuestModalProps) {
  const [showRequirements, setShowRequirements] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAcknowledged(false);
    setShowRequirements(true);
  }

  function handleSubmitForReview() {
    onSubmitForReview({
      id: crypto.randomUUID(),
      status: "upcoming",
      name: name.trim(),
      date,
      time: formatTime(time),
      location: location.trim(),
      description: description.trim(),
      requirements: requirements
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    });
  }

  return (
    <>
      <Modal
        label="Create a quest"
        onClose={onClose}
        className="create-quest-modal"
      >
        <h2>Create a Quest</h2>
        <p className="create-quest-community">in {communityName}</p>

        <form className="create-quest-form" onSubmit={handleSubmit}>
          <label>
            Quest name
            <input
              type="text"
              required
              autoFocus
              maxLength={80}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <div className="create-quest-row">
            <label>
              Date
              <input
                type="date"
                required
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>
            <label>
              Time
              <input
                type="time"
                required
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </label>
          </div>

          <label>
            Location
            <input
              type="text"
              required
              maxLength={120}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </label>

          <label>
            Description
            <textarea
              required
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>

          <label>
            Additional requirements{" "}
            <span className="create-quest-hint">(optional, one per line)</span>
            <textarea
              rows={3}
              value={requirements}
              onChange={(event) => setRequirements(event.target.value)}
            />
          </label>

          <div className="create-quest-actions">
            <button type="submit" className="create-quest-submit">
              Acknowledge Community Requirements
            </button>
          </div>
        </form>
      </Modal>

      {showRequirements && (
        <Modal
          label={`${communityName} community requirements`}
          onClose={() => setShowRequirements(false)}
          className="create-quest-modal community-requirements-modal"
        >
          <h2>Community Requirements</h2>
          <p className="create-quest-community">{communityName}</p>

          <ol className="community-requirements-list">
            {communityRequirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ol>

          <label className="community-requirements-check">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(event) => setAcknowledged(event.target.checked)}
            />
            My quest follows all of the requirements above.
          </label>

          <div className="create-quest-actions">
            <button
              type="button"
              className="create-quest-cancel"
              onClick={() => setShowRequirements(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="create-quest-submit"
              disabled={!acknowledged}
              onClick={handleSubmitForReview}
            >
              Submit for Review
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
