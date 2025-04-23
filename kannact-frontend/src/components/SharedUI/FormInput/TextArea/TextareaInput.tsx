import { useState } from "react"
import InputWrapper from "../GeneralInput"
import styles from "../index.module.css"

type Props = {
    label: string
    value: string | number
    disabled: boolean
    editable?: boolean
    error?: string
    onConfirm: (val: string | number) => void
    placeholder?: string
}

export const TextareaInput = ({
    label,
    value,
    onConfirm,
    disabled,
    editable = false,
    error,
    placeholder = ""
}: Props) => {
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleConfirm = async () => {
        setLoading(true)
        onConfirm(value)
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
            editable={editable}
            error={error}
            onEditClick={() => setEditing(true)}
            onConfirmClick={handleConfirm}
            onCancelClick={handleCancel}
        >
            <textarea
                className={styles.textarea}
                rows={4}
                value={value}
                disabled={disabled || loading}
                onFocus={() => setEditing(true)}
                onChange={(e) => onConfirm(e.target.value)}
                placeholder={placeholder}
            />
        </InputWrapper>
    )
}
