import {
    UseMutationResult,
    UseQueryResult,
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query"
import {
    apiClientDelete,
    apiClientGet,
    apiClientPatch,
    apiClientPost
} from "./fetch"
import { Patient } from "../interfaces/patients"
import { Command } from "../interfaces/mutationCommand"

async function findPatients(): Promise<Patient[]> {
    return await apiClientGet("/patients")
}

async function findPatientById(id: string): Promise<Patient> {
    return await apiClientGet(`/patients/${id}`)
}

export function usePatients(): UseQueryResult<Patient[]> {
    return useQuery({
        queryKey: ["patients"],
        queryFn: findPatients
    })
}

export function usePatientFind(id?: string): UseQueryResult<Patient> {
    return useQuery({
        queryKey: ["patients", id],
        queryFn: () => findPatientById(id ?? ""),
        enabled: !!id
    })
}

//HERE I WOULD USE A MORE GENERIC SOLUTION WITH TYPESCRIPT FOR AN OPTIMAL SOLUTION

export function usePatientMutation(
    id: string
): UseMutationResult<void, void, Command, void> {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (command: Command) => {
            await apiClientPatch(command.url, command.payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients", id] })
            queryClient.invalidateQueries({ queryKey: ["patients"] })
        }
    })
}

export function usePatientDelete(): UseMutationResult<
    void,
    void,
    string,
    void
> {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (url: string) => {
            await apiClientDelete(url)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients"] })
        }
    })
}

type CreatePatientPayload = {
    url: string
    body: string
}

export function usePatientCreate(): UseMutationResult<
    void,
    void,
    CreatePatientPayload,
    void
> {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ url, body }: CreatePatientPayload) => {
            await apiClientPost(url, body)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients"] })
        }
    })
}
