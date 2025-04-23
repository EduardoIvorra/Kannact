import { Command } from "../interfaces/mutationCommand"
import { PatientNote } from "../interfaces/patients"

export function createCommandName(defaultUrl: string, val: string): Command {
    return {
        url: defaultUrl,
        payload: JSON.stringify({ name: val })
    }
}

export function createCommandAge(defaultUrl: string, val: string): Command {
    return {
        url: defaultUrl,
        payload: JSON.stringify({ age: val })
    }
}

export function createCommandPrimaryCondition(
    defaultUrl: string,
    val: string
): Command {
    return {
        url: defaultUrl,
        payload: JSON.stringify({ primaryCondition: val })
    }
}

export function createCommandNote(defaultUrl: string, val: string): Command {
    return {
        url: defaultUrl,
        payload: JSON.stringify({ notes: val })
    }
}

export function createCommandAddNotes(
    defaultUrl: string,
    note: PatientNote,
    notesPatient: PatientNote[]
): Command {
    const updatedNotes: PatientNote[] = notesPatient.concat(note)
    return {
        url: defaultUrl,
        payload: JSON.stringify({ notes: updatedNotes })
    }
}
export function createCommandDeleteNotes(
    defaultUrl: string,
    noteId: number,
    notesPatient: PatientNote[]
): Command {
    const updatedNotes: PatientNote[] = notesPatient.filter(
        (n) => n.id !== noteId
    )
    return {
        url: defaultUrl,
        payload: JSON.stringify({ notes: updatedNotes })
    }
}
