import { useEffect, useState } from "react"
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa"
import { FaSpinner } from "react-icons/fa6"
import styles from "./index.module.css"

type InputWrapperProps = {
    label: string
    children: React.ReactNode
    editing: boolean
    loading: boolean
    editable: boolean
    error?: string
    onEditClick: () => void
    onConfirmClick: () => void
    onCancelClick: () => void
    status?: "success" | "error" | null
}

const InputWrapper = ({
    label,
    children,
    editing,
    loading,
    editable,
    error,
    onEditClick,
    onConfirmClick,
    onCancelClick,
    status = null
}: InputWrapperProps) => {
    const [showStatus, setShowStatus] = useState<"success" | "error" | null>(
        null
    )

    useEffect(() => {
        if (status) {
            setShowStatus(status)
            const timer = setTimeout(() => {
                setShowStatus(null)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [status])

    return (
        <div className={styles.inputWrapper}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputContainer}>
                {children}
                <div className={styles.actions}>
                    {editable && !editing && !loading && !showStatus && (
                        <button
                            className={styles.iconButton}
                            onClick={onEditClick}
                            title="Edit"
                        >
                            <FaEdit color="#2563eb" />
                        </button>
                    )}
                    {editable && editing && !loading && (
                        <>
                            <button
                                className={`${styles.iconButton} ${styles.confirm}`}
                                onClick={onConfirmClick}
                                title="Confirm"
                            >
                                <FaCheck />
                            </button>
                            <button
                                className={`${styles.iconButton} ${styles.cancel}`}
                                onClick={onCancelClick}
                                title="Cancel"
                            >
                                <FaTimes />
                            </button>
                        </>
                    )}
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
                </div>
            </div>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    )
}

export default InputWrapper
