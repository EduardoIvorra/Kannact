import { usePatientFind } from "../../api/patients"
import { useCallback, useState } from "react"
import { useParams } from "react-router-dom"
import { PatientNote } from "../../interfaces/patients"
import { CreateNoteDialog } from "../../components/Dialog/Note/Create/CreateNoteDialog"
import { EditNoteDialog } from "../../components/Dialog/Note/Edit/EditNoteDialog"
import styles from "./index.module.css"
import { PatientNoteCard } from "../../components/Cards/NoteCard/NoteCard"
import { TextButton } from "../../components/SharedUI"
import { createCommandDeleteNotes } from "../../api/commands"
import { useNotesDelete } from "../../api/notes"

export default function PatientDetailPage() {
    const { id } = useParams()
    const { data: patient, isLoading } = usePatientFind(id)
    const [editingNote, setEditingNote] = useState<PatientNote | null>(null)
    const [showDialogNewNote, setShowDialogNewNote] = useState(false)

    const deleteMutation = useNotesDelete()

    const handleNewNote = () => {
        setShowDialogNewNote(true)
    }

    const handleEditNote = useCallback((note: PatientNote) => {
        setEditingNote(note)
        setShowDialogNewNote(false)
    }, [])

    const handleCloseDialog = useCallback(() => {
        setEditingNote(null)
        setShowDialogNewNote(false)
    }, [])

    if (!id || isLoading) return <p>Loading...</p>
    if (!patient) return <p>Patient not found</p>

    const handleDelete = async (noteId: number): Promise<boolean> => {
        try {
            const updatedNotes = patient.notes.filter(
                (note: { id: number }) => note.id !== noteId
            )

            await deleteMutation.mutateAsync(
                createCommandDeleteNotes(
                    `/patients/${id}`,
                    noteId,
                    updatedNotes
                )
            )
            return true
        } catch (err) {
            console.error("Failed to delete patient", err)
            return false
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Patient Detail</h1>
            <TextButton
                text="+ Add Note"
                handleAction={() => handleNewNote()}
            />

            <div className={styles.card}>
                <p>
                    <strong>Name:</strong> {patient.name}
                </p>
                <p>
                    <strong>Age:</strong> {patient.age}
                </p>
                <p>
                    <strong>Primary Condition:</strong>{" "}
                    {patient.primaryCondition}
                </p>

                {patient.notes.length > 0 && (
                    <ul className={styles.list}>
                        {patient.notes.map((note) => (
                            <PatientNoteCard
                                key={note.id}
                                note={note}
                                onEdit={handleEditNote}
                                onDelete={handleDelete}
                            />
                        ))}
                    </ul>
                )}
            </div>

            {showDialogNewNote && (
                <CreateNoteDialog
                    onClose={handleCloseDialog}
                    patientId={patient.id}
                    allNotes={patient.notes}
                />
            )}
            {editingNote && (
                <EditNoteDialog
                    onClose={handleCloseDialog}
                    patientId={patient.id}
                    note={editingNote}
                    allNotes={patient.notes}
                />
            )}
        </div>
    )
}
