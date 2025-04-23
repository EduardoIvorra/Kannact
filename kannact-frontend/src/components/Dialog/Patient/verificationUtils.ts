export const correctName = (name: any): boolean => {
    return typeof name === "string" && name.length > 0
}

export const correctAge = (age: any): boolean => {
    return typeof age === "number" && age > 18 && age < 120
}

export const correctPrimaryCondition = (primaryCondition: any): boolean => {
    return typeof primaryCondition === "string" && primaryCondition.length > 0
}

export const correctNotes = (notes: any): boolean => {
    return notes.content && notes.id && notes.date
}
