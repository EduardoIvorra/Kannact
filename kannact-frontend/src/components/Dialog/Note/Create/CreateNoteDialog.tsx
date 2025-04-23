import { useState } from "react"
import { useAddNoteToPatient } from "./useAddNoteToPatient"
import { PatientNote } from "../../../../interfaces/patients"
import Dialog from "../../General"
import { TextareaInput } from "../../../SharedUI"

export const CreateNoteDialog = ({
    onClose,
    patientId,
    allNotes
}: {
    onClose: () => void
    patientId: string
    allNotes: PatientNote[]
}) => {
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<"success" | "error" | null>(null)

    const { addNote, errors } = useAddNoteToPatient(patientId, allNotes)
    const handleSave = async () => {
        setLoading(true)
        const success = await addNote({
            id: Math.floor(Math.random() * 1000),
            content: text,
            date: new Date().toISOString()
        })

        if (success) {
            setStatus("success")
            setTimeout(() => onClose(), 1000)
        } else {
            setStatus("error")
        }
        setLoading(false)
    }

    return (
        <Dialog
            onSave={handleSave}
            onClose={onClose}
            isOpen
            canSave
            status={status}
            loading={loading}
        >
            <h2>Add Note</h2>
            <TextareaInput
                label="Note"
                value={text}
                onConfirm={(v) => setText(v.toString())}
                disabled={loading}
                error={errors.text}
                placeholder="Write a note about the patient..."
            />
        </Dialog>
    )
}
