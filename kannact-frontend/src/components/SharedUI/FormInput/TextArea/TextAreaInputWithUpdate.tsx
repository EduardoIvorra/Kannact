import { useState } from "react"
import InputWrapper from "../GeneralInput"
import styles from "../index.module.css"

type Props = {
    label: string
    value: string | number
    editable?: boolean
    error?: string
    onConfirm: (val: string | number) => Promise<boolean>
    placeholder?: string
}

export const TextareaInputWithUpdate = ({
    label,
    value,
    onConfirm,
    error,
    placeholder = ""
}: Props) => {
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState(value)
    const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(
        null
    )
    const handleConfirm = async () => {
        setLoading(true)
        const success = await onConfirm(inputValue)
        success ? setSaveStatus("success") : setSaveStatus("error")
        setLoading(false)
        setEditing(false)
    }

    const handleCancel = () => {
        setEditing(false)
    }

    return (
        <InputWrapper
            label={label}
            editing={editing}
            loading={loading}
            editable={true}
            error={error}
            onEditClick={() => setEditing(true)}
            onConfirmClick={handleConfirm}
            onCancelClick={handleCancel}
            status={saveStatus}
        >
            <textarea
                className={styles.textarea}
                rows={4}
                value={inputValue}
                disabled={loading}
                onFocus={() => setEditing(true)}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
            />
        </InputWrapper>
    )
}
