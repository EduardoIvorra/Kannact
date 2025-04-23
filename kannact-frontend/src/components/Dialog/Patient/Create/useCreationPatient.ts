import { useState } from "react"
import { Patient } from "../../../../interfaces/patients"
import {
    correctName,
    correctAge,
    correctPrimaryCondition
} from "../verificationUtils"
import { usePatientCreate } from "../../../../api/patients"

type PatientState = {
    name: string
    age: number
    primaryCondition: string
}

type CreationPatientReturnType = {
    addPatient: (patient: Patient) => Promise<boolean>
    errors: Partial<Record<keyof PatientState, string>>
}

export const useCreationPatient = (): CreationPatientReturnType => {
    const [errors, setErrors] = useState<
        Partial<Record<keyof PatientState, string>>
    >({})
    const mutation = usePatientCreate()

    const validatePatient = (patient: Patient): boolean => {
        const newErrors: Partial<Record<keyof PatientState, string>> = {}

        if (!correctName(patient.name)) {
            newErrors.name = "Name must be a non-empty string"
        }

        if (!correctAge(patient.age)) {
            newErrors.age = "Age must be a number greater than 18"
        }

        if (!correctPrimaryCondition(patient.primaryCondition)) {
            newErrors.primaryCondition =
                "Primary condition must be a non-empty string"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const addPatient = async (patient: Patient): Promise<boolean> => {
        if (!validatePatient(patient)) return false

        try {
            await mutation.mutateAsync({
                url: `/patients`,
                body: JSON.stringify(patient)
            })
            return true
        } catch (err) {
            console.error("Failed to create patient", err)
            return false
        }
    }

    return { addPatient, errors }
}
