export interface PatientNote {
    id: number
    date: string
    content: string
}

export interface Patient {
    id: string
    name: string
    age: number
    primaryCondition: string
    notes: PatientNote[]
}
