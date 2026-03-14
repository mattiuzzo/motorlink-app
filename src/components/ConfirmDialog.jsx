import styles from './ConfirmDialog.module.css'

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <p>{message}</p>
        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancelBtn}>Cancelar</button>
          <button onClick={onConfirm} className={styles.confirmBtn}>Confirmar</button>
        </div>
      </div>
    </div>
  )
}
