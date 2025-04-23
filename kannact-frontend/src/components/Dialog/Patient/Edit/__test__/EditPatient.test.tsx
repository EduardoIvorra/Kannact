import { render, screen } from "@testing-library/react"
import { vi, describe, it, expect } from "vitest"
import { EditPatientDialog } from "../EditPatientDialog"
import { Patient } from "../../../../../interfaces/patients"
import * as useStore from "../usePatientsStore"

const mockPatient: Patient = {
    id: "1",
    name: "John Doe",
    age: 45,
    primaryCondition: "Hypertension",
    notes: []
}

describe("EditPatientDialog", () => {
    const onClose = vi.fn()
    it("displays validation errors when present", () => {
        vi.spyOn(useStore, "usePatientsStore").mockReturnValue({
            state: {
                name: "",
                age: 17,
                primaryCondition: ""
            },
            errors: {
                name: "Name is required",
                age: "Must be over 18",
                primaryCondition: "Primary condition required"
            },
            updateName: vi.fn(),
            updateAge: vi.fn(),
            updatePrimaryCondition: vi.fn()
        })

        render(<EditPatientDialog patient={mockPatient} onClose={onClose} />)

        expect(screen.getByText(/name is required/i)).toBeInTheDocument()
        expect(screen.getByText(/must be over 18/i)).toBeInTheDocument()
        expect(
            screen.getByText(/primary condition required/i)
        ).toBeInTheDocument()
    })

    it("renders correctly with patient data", () => {})

    it("calls updateName when confirming name", () => {})

    it("closes dialog when handleSave is called", () => {})
})
