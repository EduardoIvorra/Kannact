import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, vi, expect } from "vitest"
import { CardActions } from "../index"

describe("CardActions", () => {
    it("renders edit and delete buttons", () => {
        render(<CardActions onEdit={() => {}} onDelete={async () => true} />)
        expect(screen.getAllByRole("button").length).toBe(2)
    })

    it("calls onEdit when edit button is clicked", () => {
        const onEdit = vi.fn()
        render(<CardActions onEdit={onEdit} onDelete={async () => true} />)
        const editButton = screen.getAllByRole("button")[0]
        fireEvent.click(editButton)
        expect(onEdit).toHaveBeenCalled()
    })

    it("shows spinner during delete and success icon after", async () => {
        const onDelete = vi.fn().mockResolvedValue(true)
        render(<CardActions onEdit={() => {}} onDelete={onDelete} />)
        const deleteButton = screen.getAllByRole("button")[1]
        fireEvent.click(deleteButton)
        expect(screen.getByTestId("icon-spinner")).toBeInTheDocument()
        await waitFor(() =>
            expect(screen.getByTestId("icon-success")).toBeInTheDocument()
        )
    })

    it("shows error icon when delete fails", async () => {})

    it("disables buttons during loading", async () => {})
})
