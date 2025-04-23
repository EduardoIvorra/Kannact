import { useState } from "react"
import InputWrapper from "../GeneralInput"
import styles from "../index.module.css"

type Props = {
    label: string
    value: string | number
    type?: "text" | "number"
    error?: string
    onConfirm: (val: string | number) => Promise<boolean>
    placeholder?: string
}

export const TextInputWithUpdate = ({
    label,
    value,
    onConfirm,
    error,
    type = "text",
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
            error={error}
            onEditClick={() => setEditing(true)}
            onConfirmClick={handleConfirm}
            onCancelClick={handleCancel}
            editable={true}
            status={saveStatus}
        >
            <input
                className={styles.input}
                type={type}
                value={inputValue}
                disabled={loading}
                onFocus={() => {
                    setEditing(true)
                    setSaveStatus(null)
                }}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
            />
        </InputWrapper>
    )
}
