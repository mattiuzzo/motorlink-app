import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import DashboardPage from './pages/DashboardPage'
import UsuariosPage from './pages/usuarios/UsuariosPage'
import UsuarioFormPage from './pages/usuarios/UsuarioFormPage'
import VeiculosPage from './pages/veiculos/VeiculosPage'
import VeiculoFormPage from './pages/veiculos/VeiculoFormPage'

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/usuarios" element={<UsuariosPage />} />
              <Route path="/usuarios/novo" element={<UsuarioFormPage />} />
              <Route path="/usuarios/:id/editar" element={<UsuarioFormPage />} />
              <Route path="/veiculos" element={<VeiculosPage />} />
              <Route path="/veiculos/novo" element={<VeiculoFormPage />} />
              <Route path="/veiculos/:id/editar" element={<VeiculoFormPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
