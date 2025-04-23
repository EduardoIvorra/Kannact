import {
    useQueryClient,
    useMutation,
    UseMutationResult
} from "@tanstack/react-query"
import { Command } from "../interfaces/mutationCommand"
import { PatientNote } from "../interfaces/patients"
import { apiClientPatch } from "./fetch"

export function createCommandNotes(
    defaultUrl: string,
    updatedNote: PatientNote,
    notesPatient: PatientNote[]
): Command {
    const updatedNotes: PatientNote[] = notesPatient.map((note) =>
        note.id === updatedNote.id
            ? { ...note, content: updatedNote.content }
            : note
    )
    return {
        url: defaultUrl,
        payload: JSON.stringify({ notes: updatedNotes })
    }
}

export function useNotesDelete(): UseMutationResult<void, void, Command, void> {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (command: Command) => {
            await apiClientPatch(command.url, command.payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients"] })
        }
    })
}
