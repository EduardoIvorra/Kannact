import { useEffect, useState } from "react"
import { Patient } from "../../../../interfaces/patients"
import { usePatientMutation } from "../../../../api/patients"
import {
    correctName,
    correctAge,
    correctPrimaryCondition
} from "../verificationUtils"
import {
    createCommandName,
    createCommandAge,
    createCommandPrimaryCondition
} from "../../../../api/commands"

type PatientState = {
    name: string
    age: number
    primaryCondition: string
}

type PatientStore = {
    state: PatientState
    errors: Partial<Record<keyof PatientState, string>>
    updateName: (val: string | number) => Promise<boolean>
    updateAge: (val: number | string) => Promise<boolean>
    updatePrimaryCondition: (val: string | number) => Promise<boolean>
}
export const usePatientsStore = (patient: Patient): PatientStore => {
    const defaultState: PatientState = {
        name: patient.name,
        age: patient.age,
        primaryCondition: patient.primaryCondition
    }

    const mutation = usePatientMutation(patient.id.toString())
    const [state, setState] = useState(defaultState)
    const [errors, setErrors] = useState<
        Partial<Record<keyof PatientState, string>>
    >({})

    useEffect(() => {
        setState(defaultState)
        setErrors({})
    }, [patient])

    const DEFAULT_URL = `/patients/${patient.id}`

    async function updateName(val: string | number): Promise<boolean> {
        try {
            if (correctName(val)) {
                await mutation.mutateAsync(
                    createCommandName(DEFAULT_URL, val as string)
                )
                setErrors((e) => ({ ...e, name: undefined }))
                return true
            } else {
                setErrors((e) => ({
                    ...e,
                    name: "Name must be a non-empty string"
                }))
                return false
            }
        } catch (err) {
            setErrors((e) => ({ ...e, name: "Error saving name" }))
            return false
        }
    }

    async function updateAge(val: number | string): Promise<boolean> {
        try {
            if (correctAge(val)) {
                await mutation.mutateAsync(
                    createCommandAge(DEFAULT_URL, val.toString())
                )
                setErrors((e) => ({ ...e, age: undefined }))
                return true
            } else {
                setErrors((e) => ({
                    ...e,
                    age: "Age must be a number greater than 18"
                }))
                return false
            }
        } catch (err) {
            setErrors((e) => ({ ...e, age: "Error saving age" }))
            return false
        }
    }

    async function updatePrimaryCondition(
        val: string | number
    ): Promise<boolean> {
        try {
            if (correctPrimaryCondition(val)) {
                await mutation.mutateAsync(
                    createCommandPrimaryCondition(DEFAULT_URL, val as string)
                )
                setErrors((e) => ({ ...e, primaryCondition: undefined }))
                return true
            } else {
                setErrors((e) => ({
                    ...e,
                    primaryCondition:
                        "Primary condition must be a non-empty string"
                }))
                return false
            }
        } catch (err) {
            setErrors((e) => ({
                ...e,
                primaryCondition: "Error saving condition"
            }))
            return false
        }
    }

    return {
        state,
        errors,
        updateName,
        updateAge,
        updatePrimaryCondition
    }
}
