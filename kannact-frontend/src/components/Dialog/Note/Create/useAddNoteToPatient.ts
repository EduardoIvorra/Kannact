import { useState } from "react"
import { PatientNote } from "../../../../interfaces/patients"
import { usePatientMutation } from "../../../../api/patients"
import { correctNotes } from "../../Patient/verificationUtils"
import { createCommandAddNotes } from "../../../../api/commands"

export const useAddNoteToPatient = (
    patientId: string,
    allNotes: PatientNote[]
) => {
    const [errors, setErrors] = useState<{ text?: string }>({})
    const mutation = usePatientMutation(patientId.toString())
    const DEFAULT_URL = `/patients/${patientId}`
    const addNote = async (note: PatientNote): Promise<boolean> => {
        if (!correctNotes(note)) {
            setErrors(() => ({ text: "Note cannot be empty." }))
            return false
        }
        try {
            setErrors({})
            await mutation.mutateAsync(
                createCommandAddNotes(DEFAULT_URL, note, allNotes)
            )
            return true
        } catch (err) {
            console.error("Failed to add note", err)
            return false
        }
    }

    return { addNote, errors }
}
