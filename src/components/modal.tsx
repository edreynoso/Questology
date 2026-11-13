import { useEffect, useId, useRef, type ReactNode } from 'react'
import './modal.css'

type ModalProps = {
    onClose: () => void;
    label: string;
    className?: string;
    children: ReactNode;
}

const openModals: symbol[] = []

export default function Modal({ onClose, label, className, children }: ModalProps) {
    const titleId = useId()
    const onCloseRef = useRef(onClose)

    useEffect(() => {
        onCloseRef.current = onClose
    }, [onClose])

    useEffect(() => {
        const token = Symbol('modal')
        openModals.push(token)

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape' && openModals[openModals.length - 1] === token) {
                onCloseRef.current()
            }
        }
        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            openModals.splice(openModals.indexOf(token), 1)
        }
    }, [])

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={className ? `modal ${className}` : 'modal'}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onClick={(event) => event.stopPropagation()}
            >
                <span id={titleId} className="modal-label">{label}</span>
                <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    )
}
