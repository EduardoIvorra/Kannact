import { useState } from "react"
import { PatientNote } from "../../../../interfaces/patients"
import { usePatientMutation } from "../../../../api/patients"
import { createCommandNotes } from "../../../../api/notes"

export const useNotesStore = (patientId: string, allNotes: PatientNote[]) => {
    const [errors, setErrors] = useState<{ text?: string }>({})
    const mutation = usePatientMutation(patientId.toString())
    const DEFAULT_URL = `/patients/${patientId}`

    const editNote = async (updatedNote: PatientNote): Promise<boolean> => {
        if (!updatedNote.content.trim()) {
            setErrors({ text: "Note cannot be empty." })
            return false
        }

        try {
            setErrors({})
            await mutation.mutateAsync(
                createCommandNotes(DEFAULT_URL, updatedNote, allNotes)
            )
            return true
        } catch (err) {
            console.error("Failed to edit note", err)
            return false
        }
    }

    return { editNote, errors }
}
