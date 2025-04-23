import { useEffect, useState } from "react"
import InputWrapper from "../GeneralInput"
import styles from "../index.module.css"

type Props = {
    label: string
    value: string | number
    type?: "text" | "number"
    disabled: boolean
    error?: string
    onConfirm: (val: string | number) => void
    placeholder?: string
}

export const TextInput = ({
    label,
    value,
    onConfirm,
    disabled,
    error,
    type = "text",
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
            editable={false}
            error={error}
            onEditClick={() => setEditing(true)}
            onConfirmClick={handleConfirm}
            onCancelClick={handleCancel}
        >
            <input
                className={styles.input}
                type={type}
                value={value}
                disabled={disabled || loading}
                onFocus={() => setEditing(true)}
                onChange={(e) => onConfirm(e.target.value)}
                placeholder={placeholder}
            />
        </InputWrapper>
    )
}
