import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { addUser, updateUser } from '../../store/usersSlice'
import styles from './UsuarioFormPage.module.css'

export default function UsuarioFormPage() {
  const { id } = useParams()
  const users = useSelector(state => state.users.list)
  const existing = users.find(u => u.id === id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (id && !existing) return <Navigate to="/usuarios" replace />

  const [form, setForm] = useState({
    nome: existing?.nome || '',
    email: existing?.email || '',
    role: existing?.role || 'user',
    senha: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    setForm({
      nome: existing?.nome || '',
      email: existing?.email || '',
      role: existing?.role || 'user',
      senha: ''
    })
    setError('')
  }, [id])

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const duplicate = users.find(u => u.email === form.email && u.id !== id)
    if (duplicate) {
      setError('Já existe um usuário com este email.')
      return
    }
    if (id) {
      // Na edição, só atualiza a senha se o campo foi preenchido
      const updated = { ...existing, ...form }
      if (!form.senha) updated.senha = existing.senha
      dispatch(updateUser(updated))
    } else {
      dispatch(addUser({ id: crypto.randomUUID(), ...form }))
    }
    navigate('/usuarios')
  }

  return (
    <div>
      <h2 className={styles.title}>{id ? 'Editar Usuário' : 'Novo Usuário'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}
        <label>
          Nome
          <input name="nome" value={form.nome} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Perfil
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
        <label>
          {id ? 'Nova Senha (deixe em branco para manter)' : 'Senha'}
          <input
            name="senha"
            type="password"
            value={form.senha}
            onChange={handleChange}
            required={!id}
            placeholder={id ? '••••••' : ''}
          />
        </label>
        <div className={styles.actions}>
          <button type="button" onClick={() => navigate('/usuarios')} className={styles.cancelBtn}>Cancelar</button>
          <button type="submit" className={styles.saveBtn}>Salvar</button>
        </div>
      </form>
    </div>
  )
}
