import { useState } from "react"
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa"
import { FaSpinner } from "react-icons/fa6"
import styles from "./index.module.css"

type CardActionsProps = {
    onEdit: () => void
    onDelete: () => Promise<boolean>
}

export const CardActions = ({ onEdit, onDelete }: CardActionsProps) => {
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<"success" | "error" | null>(null)

    const handleDeleteClick = async () => {
        setLoading(true)
        const result = await onDelete()
        setLoading(false)
        setStatus(result ? "success" : "error")

        setTimeout(() => setStatus(null), 1000)
    }

    return (
        <div className={styles.actions}>
            <button
                className={`${styles.iconButton} ${styles.edit}`}
                onClick={onEdit}
                disabled={loading}
            >
                <FaEdit />
            </button>

            <button
                className={`${styles.iconButton} ${styles.delete}`}
                onClick={handleDeleteClick}
                disabled={loading}
            >
                {loading && (
                    <FaSpinner
                        data-testid="icon-spinner"
                        className={`${styles.icon} ${styles.spinner}`}
                    />
                )}
                {!loading && status === "success" && (
                    <FaCheck
                        data-testid="icon-success"
                        className={`${styles.icon} ${styles.success}`}
                    />
                )}
                {!loading && status === "error" && (
                    <FaTimes
                        data-testid="icon-error"
                        className={`${styles.icon} ${styles.errorIcon}`}
                    />
                )}
                {!loading && !status && <FaTrash />}
            </button>
        </div>
    )
}
