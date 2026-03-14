import { useSelector } from 'react-redux'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const users = useSelector(state => state.users.list)
  const vehicles = useSelector(state => state.vehicles.list)

  return (
    <div>
      <h2 className={styles.title}>Dashboard</h2>
      <div className={styles.cards}>
        <div className={styles.card}>
          <span className={styles.count}>{users.length}</span>
          <span className={styles.label}>Usuários</span>
        </div>
        <div className={styles.card}>
          <span className={styles.count}>{vehicles.length}</span>
          <span className={styles.label}>Veículos</span>
        </div>
      </div>
    </div>
  )
}
