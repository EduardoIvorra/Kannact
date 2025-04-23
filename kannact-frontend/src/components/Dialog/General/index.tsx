import React, { useEffect, useState } from "react"
import styles from "./index.module.css"
import { FaSpinner, FaCheck, FaTimes } from "react-icons/fa"

type DialogProps = {
    isOpen: boolean
    onClose: () => void
    onSave: () => void
    children: React.ReactNode
    canSave: boolean
    loading?: boolean
    status?: "success" | "error" | null
}

const Dialog = ({
    isOpen,
    onClose,
    onSave,
    children,
    canSave,
    loading = false,
    status = null
}: DialogProps) => {
    const [showStatus, setShowStatus] = useState<"success" | "error" | null>(
        null
    )

    useEffect(() => {
        if (status) {
            setShowStatus(status)
            const timer = setTimeout(() => setShowStatus(null), 1000)
            return () => clearTimeout(timer)
        }
    }, [status])

    if (!isOpen) return null

    return (
        <div className={styles.overlay}>
            <div className={styles.dialog}>
                <div className={styles.content}>{children}</div>
                <div className={styles.actions}>
                    <button
                        className={styles.button}
                        onClick={onClose}
                        disabled={loading}
                    >
                        Close
                    </button>
                    {canSave && (
                        <button
                            className={styles.buttonPrimary}
                            onClick={onSave}
                            disabled={loading}
                        >
                            {loading && (
                                <FaSpinner
                                    className={`${styles.spinner} ${styles.icon}`}
                                />
                            )}
                            {!loading && showStatus === "success" && (
                                <FaCheck
                                    className={`${styles.feedbackIcon} ${styles.success}`}
                                />
                            )}
                            {!loading && showStatus === "error" && (
                                <FaTimes
                                    className={`${styles.feedbackIcon} ${styles.errorIcon}`}
                                />
                            )}
                            {!loading && !showStatus && "Save"}
                            {loading && " Saving..."}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dialog
