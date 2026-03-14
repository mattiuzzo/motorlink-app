import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteVehicle } from '../../store/vehiclesSlice'
import ConfirmDialog from '../../components/ConfirmDialog'
import styles from './VeiculosPage.module.css'

export default function VeiculosPage() {
  const vehicles = useSelector(state => state.vehicles.list)
  const users = useSelector(state => state.users.list)
  const dispatch = useDispatch()
  const [confirm, setConfirm] = useState(null)

  function getUserName(id) {
    return users.find(u => u.id === id)?.nome || '—'
  }

  function handleDeleteClick(v) {
    setConfirm({ id: v.id, msg: `Excluir veículo "${v.placa} - ${v.modelo}"?` })
  }

  function handleConfirm() {
    dispatch(deleteVehicle(confirm.id))
    setConfirm(null)
  }

  return (
    <div>
      <div className={styles.header}>
        <h2>Veículos</h2>
        <Link to="/veiculos/novo" className={styles.newBtn}>+ Novo Veículo</Link>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Ano</th>
              <th>Proprietário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length === 0 ? (
              <tr><td colSpan={6} className={styles.empty}>Nenhum veículo cadastrado.</td></tr>
            ) : vehicles.map(v => (
              <tr key={v.id}>
                <td><code>{v.placa}</code></td>
                <td>{v.marca}</td>
                <td>{v.modelo}</td>
                <td>{v.ano}</td>
                <td>{getUserName(v.proprietarioId)}</td>
                <td className={styles.actions}>
                  <Link to={`/veiculos/${v.id}/editar`} className={styles.editBtn}>Editar</Link>
                  <button onClick={() => handleDeleteClick(v)} className={styles.deleteBtn}>Excluir</button>
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
