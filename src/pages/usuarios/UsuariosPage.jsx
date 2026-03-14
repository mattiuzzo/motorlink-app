import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser } from '../../store/usersSlice'
import ConfirmDialog from '../../components/ConfirmDialog'
import styles from './UsuariosPage.module.css'

export default function UsuariosPage() {
  const users = useSelector(state => state.users.list)
  const vehicles = useSelector(state => state.vehicles.list)
  const dispatch = useDispatch()
  const [confirm, setConfirm] = useState(null)

  function handleDeleteClick(user) {
    const userVehicles = vehicles.filter(v => v.proprietarioId === user.id)
    const msg = userVehicles.length > 0
      ? `Excluir "${user.nome}"? Este usuário possui ${userVehicles.length} veículo(s) cadastrado(s). Os veículos ficarão sem proprietário.`
      : `Excluir "${user.nome}"?`
    setConfirm({ id: user.id, msg })
  }

  function handleConfirm() {
    dispatch(deleteUser(confirm.id))
    setConfirm(null)
  }

  return (
    <div>
      <div className={styles.header}>
        <h2>Usuários</h2>
        <Link to="/usuarios/novo" className={styles.newBtn}>+ Novo Usuário</Link>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Perfil</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan={4} className={styles.empty}>Nenhum usuário cadastrado.</td></tr>
            ) : users.map(u => (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td><span className={styles.badge} data-role={u.role}>{u.role}</span></td>
                <td className={styles.actions}>
                  <Link to={`/usuarios/${u.id}/editar`} className={styles.editBtn}>Editar</Link>
                  <button onClick={() => handleDeleteClick(u)} className={styles.deleteBtn}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {confirm && (
        <ConfirmDialog
          message={confirm.msg}
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  )
}
