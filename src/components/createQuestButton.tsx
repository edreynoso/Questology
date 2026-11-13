import { FaPlus } from 'react-icons/fa'
import './createQuestButton.css'

type CreateQuestButtonProps = {
    onClick: () => void;
}

export default function CreateQuestButton({ onClick }: CreateQuestButtonProps) {
    return (
        <button type="button" className="CreateQuestButton" aria-label="Create a quest" onClick={onClick}>
            <FaPlus aria-hidden="true" />
        </button>
    )
}
