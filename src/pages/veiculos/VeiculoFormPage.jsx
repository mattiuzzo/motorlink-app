import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { addVehicle, updateVehicle } from '../../store/vehiclesSlice'
import styles from './VeiculoFormPage.module.css'

export default function VeiculoFormPage() {
  const { id } = useParams()
  const vehicles = useSelector(state => state.vehicles.list)
  const users = useSelector(state => state.users.list)
  const existing = vehicles.find(v => v.id === id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (id && !existing) return <Navigate to="/veiculos" replace />

  const [form, setForm] = useState({
    placa: existing?.placa || '',
    marca: existing?.marca || '',
    modelo: existing?.modelo || '',
    ano: existing?.ano || new Date().getFullYear(),
    proprietarioId: existing?.proprietarioId || ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    setForm({
      placa: existing?.placa || '',
      marca: existing?.marca || '',
      modelo: existing?.modelo || '',
      ano: existing?.ano || new Date().getFullYear(),
      proprietarioId: existing?.proprietarioId || ''
    })
    setError('')
  }, [id])

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const duplicate = vehicles.find(v => v.placa === form.placa && v.id !== id)
    if (duplicate) {
      setError('Já existe um veículo com esta placa.')
      return
    }
    const ano = Number(form.ano)
    if (!ano) {
      setError('Informe um ano válido.')
      return
    }
    if (id) {
      dispatch(updateVehicle({ ...existing, ...form, ano }))
    } else {
      dispatch(addVehicle({ id: crypto.randomUUID(), ...form, ano }))
    }
    navigate('/veiculos')
  }

  return (
    <div>
      <h2 className={styles.title}>{id ? 'Editar Veículo' : 'Novo Veículo'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}
        <label>
          Placa
          <input name="placa" value={form.placa} onChange={handleChange} placeholder="ABC-1234" required />
        </label>
        <label>
          Marca
          <input name="marca" value={form.marca} onChange={handleChange} required />
        </label>
        <label>
          Modelo
          <input name="modelo" value={form.modelo} onChange={handleChange} required />
        </label>
        <label>
          Ano
          <input name="ano" type="number" value={form.ano} onChange={handleChange} min="1900" max="2030" required />
        </label>
        <label>
          Proprietário
          <select name="proprietarioId" value={form.proprietarioId} onChange={handleChange}>
            <option value="">— Selecione —</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.nome}</option>
            ))}
          </select>
        </label>
        <div className={styles.actions}>
          <button type="button" onClick={() => navigate('/veiculos')} className={styles.cancelBtn}>Cancelar</button>
          <button type="submit" className={styles.saveBtn}>Salvar</button>
        </div>
      </form>
    </div>
  )
}
