import { usePatientsStore } from "./usePatientsStore"
import { Patient } from "../../../../interfaces/patients"
import { TextInputWithUpdate, TextareaInputWithUpdate } from "../../../SharedUI"
import Dialog from "../../General"

export const EditPatientDialog = ({
    onClose,
    patient
}: {
    onClose: () => void
    patient: Patient
}) => {
    const { state, updateName, updateAge, updatePrimaryCondition, errors } =
        usePatientsStore(patient)

    const handleSave = () => {
        onClose()
    }

    return (
        <Dialog onSave={handleSave} onClose={onClose} isOpen canSave={false}>
            <h2>Edit Patient</h2>
            <TextInputWithUpdate
                label="Name"
                value={state.name}
                onConfirm={(v) => updateName(v.toString())}
                error={errors.name}
                placeholder="Enter patient's name"
            />
            <TextInputWithUpdate
                label="Age"
                type="number"
                value={state.age}
                onConfirm={(v) => updateAge(Number(v))}
                error={errors.age}
            />
            <TextareaInputWithUpdate
                label="Primary Condition"
                value={state.primaryCondition}
                onConfirm={(v) => updatePrimaryCondition(v.toString())}
                error={errors.primaryCondition}
                placeholder="Primary condition of patient"
            />
        </Dialog>
    )
}
