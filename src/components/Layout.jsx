import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { Carregando } from './Carregando'
import { Menu } from './Menu'

export function Layout() {
  const { usuario, carregando } = useAuth()

  if (carregando) {
    return <Carregando />
  }
  if (!usuario) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Menu />
      <div className="mx-auto w-full max-w-6xl px-4 py-4">
        <Outlet />
      </div>
    </>
  )
}
