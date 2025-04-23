import { useState } from "react"
import { Patient } from "../../../../interfaces/patients"
import { useCreationPatient } from "./useCreationPatient"
import Dialog from "../../General"
import { TextInput, TextareaInput } from "../../../SharedUI"
export const CreatePatientDialog = ({ onClose }: { onClose: () => void }) => {
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [primaryCondition, setPrimaryCondition] = useState("")
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<"success" | "error" | null>(null)
    const { addPatient, errors } = useCreationPatient()

    const handleSave = async () => {
        setLoading(true)
        const newPatient: Patient = {
            id: Math.floor(Math.random() * 1000).toString(),
            name,
            age,
            primaryCondition,
            notes: []
        }
        const success = await addPatient(newPatient)

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
            loading={loading}
            status={status}
        >
            <h2>Add Patient</h2>
            <TextInput
                label="Name"
                value={name}
                onConfirm={(v) => setName(v.toString())}
                disabled={loading}
                error={errors.name}
                placeholder="Enter patient's name"
            />
            <TextInput
                label="Age"
                type="number"
                value={age}
                onConfirm={(v) => setAge(Number(v))}
                disabled={loading}
                error={errors.age}
            />
            <TextareaInput
                label="Primary Condition"
                value={primaryCondition}
                onConfirm={(v) => setPrimaryCondition(v.toString())}
                disabled={loading}
                error={errors.primaryCondition}
                placeholder="Primary condition of patient"
            />
        </Dialog>
    )
}
