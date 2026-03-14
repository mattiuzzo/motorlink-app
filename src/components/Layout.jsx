import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './Layout.module.css';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className={styles.shell}>
      <nav className={styles.navbar}>
        <span className={styles.logo}>Motorlink</span>
        <div className={styles.navRight}>
          <span className={styles.userName}>{user?.nome}</span>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Sair
          </button>
        </div>
      </nav>
      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/usuarios">Usuários</Link>
          <Link to="/veiculos">Veículos</Link>
        </aside>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
