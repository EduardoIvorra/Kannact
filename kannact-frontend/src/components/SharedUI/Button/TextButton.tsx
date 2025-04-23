import styles from "./index.module.css"
export const TextButton = ({
    text,
    handleAction
}: {
    text: string
    handleAction: () => void
}) => {
    return (
        <button className={styles.addButton} onClick={handleAction}>
            {text}
        </button>
    )
}
