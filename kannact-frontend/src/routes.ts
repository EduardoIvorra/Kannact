import { createBrowserRouter } from "react-router"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import PatientDetailPage from "./pages/PatientDetail"
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2
        },
        mutations: {
            retry: 2
        }
    },
    queryCache: new QueryCache({
        //The errors should me managed in a 'professional' way
        onError: (error) => {
            console.error("Query error", error)
        }
    }),
    mutationCache: new MutationCache({
        onError: (error) => {
            console.error("Mutation error", error)
        }
    })
})

const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                path: "/",
                Component: Home
            },
            {
                path: "/patients/:id",
                Component: PatientDetailPage
            }
        ]
    }
])

export const Routes = {
    Home: "/",
    PatientDetail: (id: string) => `/patients/${id}`,
    Login: "/auth/login",
    Register: "/auth/register"
}

export default router
