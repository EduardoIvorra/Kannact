import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import router, { queryClient } from "./routes.ts"
import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
)
