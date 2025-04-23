import { PatientNote } from "../../../interfaces/patients"
import styles from "./index.module.css"
import { CardActions } from "../../SharedUI"

type Props = {
    note: PatientNote
    onEdit: (note: PatientNote) => void
    onDelete: (id: number) => Promise<boolean>
}

export const PatientNoteCard = ({ note, onEdit, onDelete }: Props) => {
    const handleDelete = async () => {
        const result = await onDelete(note.id)
        return result
    }

    return (
        <li className={styles.card}>
            <div className={styles.content}>
                <div className={styles.date}>
                    <strong>Date:</strong>{" "}
                    {new Date(note.date).toLocaleDateString()}
                </div>
                <div className={styles.text}>
                    <strong>Note:</strong> {note.content}
                </div>
            </div>
            <CardActions onDelete={handleDelete} onEdit={() => onEdit(note)} />
        </li>
    )
}
