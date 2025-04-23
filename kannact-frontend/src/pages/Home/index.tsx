import { useCallback, useMemo, useState } from "react"
import { usePatientDelete, usePatients } from "../../api/patients"
import { Patient } from "../../interfaces/patients"
import styles from "./index.module.css"
import { PatientCard } from "../../components/Cards/PatientCard"
import { CreatePatientDialog } from "../../components/Dialog/Patient/Create/CreatePatientDialog"
import { EditPatientDialog } from "../../components/Dialog/Patient/Edit/EditPatientDialog"
import { TextButton } from "../../components/SharedUI"
import toast from "react-hot-toast"

export default function Home() {
    const { data: patients = [], isLoading, error } = usePatients()

    const [search, setSearch] = useState("")
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
    const [showDialogNewPatient, setShowDialogNewPatient] = useState(false)
    const deleteMutation = usePatientDelete()

    const filteredPatients = useMemo(() => {
        const searchLower = search.toLowerCase()
        return patients.filter((patient) =>
            patient.name.toLowerCase().includes(searchLower)
        )
    }, [patients, search])

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
        []
    )

    const handleAdd = () => {
        setShowDialogNewPatient(true)
    }

    const handleEditPatient = useCallback((patient: Patient) => {
        setSelectedPatient(patient)
        setShowDialogNewPatient(false)
    }, [])

    const handleDeletePatient = useCallback(
        async (id: string): Promise<boolean> => {
            try {
                await deleteMutation.mutateAsync(`/patients/${id}`)
                return true
            } catch (error) {
                console.error("Failed to delete patient", error)
                return false
            }
        },
        [deleteMutation]
    )

    const handleDialogClose = useCallback(() => {
        setSelectedPatient(null)
        setShowDialogNewPatient(false)
    }, [])

    if (error) {
        toast.error("Failed to load patients")
        return <p>Error loading patients: {error.message}</p>
    }

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Patient List</h1>

                <input
                    type="text"
                    placeholder="Search by name"
                    className={styles.search}
                    value={search}
                    onChange={handleSearchChange}
                />

                <TextButton
                    text="+ Add Patient"
                    handleAction={() => handleAdd()}
                />

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className={styles.list}>
                        {filteredPatients.map((p) => (
                            <PatientCard
                                key={p.id}
                                patient={p}
                                onEdit={handleEditPatient}
                                onDelete={handleDeletePatient}
                            />
                        ))}
                    </ul>
                )}
                {showDialogNewPatient && (
                    <CreatePatientDialog onClose={handleDialogClose} />
                )}
                {selectedPatient && (
                    <EditPatientDialog
                        patient={selectedPatient}
                        onClose={handleDialogClose}
                    />
                )}
            </div>
        </>
    )
}
