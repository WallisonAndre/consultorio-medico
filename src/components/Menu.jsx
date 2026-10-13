import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button, Dropdown } from '@heroui/react'
import { useAuth } from '../AuthContext'
import { Foto } from './Foto'

const classeLink = ({ isActive }) =>
  `rounded-md px-2 py-1.5 text-sm font-medium no-underline ${
    isActive ? 'bg-white/15 text-white' : 'text-blue-100 hover:bg-white/10 hover:text-white'
  }`

export function Menu() {
  const { usuario, pode, inicio, sair } = useAuth()
  const organizacao = usuario.organizacao
  const navegar = useNavigate()
  const [aberto, setAberto] = useState(false)

  const itensPrincipais = pode('api.change_organizacao')
    ? [
        { para: '/admin/agenda', rotulo: 'Agenda' },
        { para: '/admin/confirmar', rotulo: 'A confirmar' },
        { para: '/admin/avaliacoes', rotulo: 'Avaliações' },
      ]
    : [
        { para: '/inicio', rotulo: 'Início' },
        ...(pode('api.add_agendamento') ? [{ para: '/agendar', rotulo: 'Agendar' }] : []),
        { para: '/consultas', rotulo: 'Minhas consultas' },
        { para: '/medicos', rotulo: 'Médicos' },
      ]

  const itensCadastros = [
    { para: '/admin/negocio', rotulo: 'Dados do negócio' },
    { para: '/admin/recursos', rotulo: 'Médicos' },
    { para: '/admin/servicos', rotulo: 'Serviços' },
  ]

  const logo = (
    <img src="/favicon.png" alt="" className="me-2" height={32} width={32} />
  )

  return (
    <header className="bg-[#0a2f5f] text-white shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3">
        <Link to={inicio} className="flex items-center text-lg font-bold text-white no-underline">
          {logo}
          {organizacao.nome}
        </Link>

        <nav className="ms-4 hidden items-center gap-1 md:flex">
          {itensPrincipais.map((item) => (
            <NavLink key={item.para} to={item.para} className={classeLink}>
              {item.rotulo}
            </NavLink>
          ))}
          {pode('api.change_organizacao') && (
            <Dropdown>
              <Dropdown.Trigger className="rounded-md px-2 py-1.5 text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white">
                Cadastros
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu>
                  {itensCadastros.map((item) => (
                    <Dropdown.Item
                      key={item.para}
                      id={item.para}
                      onAction={() => navegar(item.para)}
                    >
                      {item.rotulo}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </nav>

        <div className="ms-auto hidden md:block">
          <Dropdown>
            <Dropdown.Trigger className="flex items-center gap-2 text-sm font-medium text-white no-underline">
              <Foto src={usuario.foto} tamanho={24} />
              {usuario.nome}
            </Dropdown.Trigger>
            <Dropdown.Popover placement="bottom right">
              <Dropdown.Menu>
                <Dropdown.Item id="perfil" onAction={() => navegar('/perfil')}>
                  <i className="bi bi-person"></i> Meu perfil
                </Dropdown.Item>
                <Dropdown.Item id="sair" onAction={sair}>
                  <i className="bi bi-box-arrow-right"></i> Sair
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>

        <Button
          variant="ghost"
          isIconOnly
          className="ms-auto text-white md:hidden"
          onPress={() => setAberto(!aberto)}
        >
          <i className={`bi ${aberto ? 'bi-x-lg' : 'bi-list'}`} />
        </Button>
      </div>

      {aberto && (
        <nav className="space-y-1 border-t border-white/10 px-4 py-2 md:hidden">
          {itensPrincipais.map((item) => (
            <NavLink key={item.para} to={item.para} className={classeLink} onClick={() => setAberto(false)}>
              {item.rotulo}
            </NavLink>
          ))}
          {pode('api.change_organizacao') &&
            itensCadastros.map((item) => (
              <Link key={item.para} to={item.para} className={classeLink} onClick={() => setAberto(false)}>
                {item.rotulo}
              </Link>
            ))}
          <Link to="/perfil" className={classeLink} onClick={() => setAberto(false)}>
            <i className="bi bi-person"></i> Meu perfil
          </Link>
          <button
            type="button"
            className="w-full rounded-md px-2 py-1.5 text-left text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white"
            onClick={() => {
              setAberto(false)
              sair()
            }}
          >
            <i className="bi bi-box-arrow-right"></i> Sair
          </button>
        </nav>
      )}
    </header>
  )
}