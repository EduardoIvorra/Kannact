import { Link } from "react-router-dom"
import styles from "./index.module.css"
import { Patient } from "../../../interfaces/patients"
import { Routes } from "../../../routes"
import { CardActions } from "../../SharedUI"

type Props = {
    patient: Patient
    onEdit: (p: Patient) => void
    onDelete: (id: string) => Promise<boolean>
}

export const PatientCard = ({ patient, onEdit, onDelete }: Props) => {
    return (
        <li className={styles.card}>
            <Link
                to={Routes.PatientDetail(patient.id.toString())}
                className={styles.link}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.info}>
                    <strong className={styles.name}>{patient.name}</strong>{" "}
                    <span className={styles.age}>
                        — {patient.age} years old
                    </span>
                    <div className={styles.condition}>
                        {patient.primaryCondition}
                    </div>
                </div>
            </Link>
            <CardActions
                onDelete={() => onDelete(patient.id)}
                onEdit={() => onEdit(patient)}
            />
        </li>
    )
}
