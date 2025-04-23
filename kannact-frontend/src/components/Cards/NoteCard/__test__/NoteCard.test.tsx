import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { PatientNoteCard } from "../NoteCard"
import { PatientNote } from "../../../../interfaces/patients"

const mockNote: PatientNote = {
    id: 42,
    date: "2023-04-01T10:00:00Z",
    content: "Patient is recovering well."
}

describe("PatientNoteCard", () => {
    it("renders note content and formatted date", () => {
        render(
            <ul>
                <PatientNoteCard
                    note={mockNote}
                    onEdit={() => {}}
                    onDelete={async () => true}
                />
            </ul>
        )
        expect(screen.getByText("Date:")).toBeInTheDocument()
        expect(screen.getByText("Note:")).toBeInTheDocument()
        expect(
            screen.getByText("Patient is recovering well.")
        ).toBeInTheDocument()
        expect(screen.getByText("4/1/2023")).toBeInTheDocument()
    })

    it("calls onEdit with the correct note", () => {
        const onEdit = vi.fn()
        render(
            <ul>
                <PatientNoteCard
                    note={mockNote}
                    onEdit={onEdit}
                    onDelete={async () => true}
                />
            </ul>
        )

        const editButton = screen.getAllByRole("button")[0]
        fireEvent.click(editButton)

        expect(onEdit).toHaveBeenCalledWith(mockNote)
    })

    it("calls onDelete", async () => {})
})
