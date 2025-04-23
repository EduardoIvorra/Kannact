import { useNotesStore } from "./useNotesStore"
import { PatientNote } from "../../../../interfaces/patients"
import Dialog from "../../General"
import { TextareaInputWithUpdate } from "../../../SharedUI/FormInput/TextArea/TextAreaInputWithUpdate"

type Props = {
    onClose: () => void
    patientId: string
    note: PatientNote
    allNotes: PatientNote[]
}

export const EditNoteDialog = ({
    onClose,
    patientId,
    note,
    allNotes
}: Props) => {
    const { editNote, errors } = useNotesStore(patientId, allNotes)

    const handleSave = async () => {
        onClose()
    }

    return (
        <Dialog onSave={handleSave} onClose={onClose} isOpen canSave={false}>
            <h2>Edit Note</h2>
            <TextareaInputWithUpdate
                label="Note"
                value={note.content}
                onConfirm={(v) =>
                    editNote({
                        ...note,
                        content: v.toString()
                    })
                }
                error={errors.text}
                placeholder="Write a note about the patient..."
            />
        </Dialog>
    )
}
