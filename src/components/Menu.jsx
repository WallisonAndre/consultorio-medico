import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button, Dropdown } from '@heroui/react'
import { useAuth } from '../AuthContext'
import { Foto } from './Foto'
import { Navbar } from './Navbar'

function classeNav({ isActive }) {
  return `rounded-md px-3 py-2 text-sm font-medium transition-colors no-underline ${
    isActive ? 'text-accent' : 'text-muted hover:bg-default/50 hover:text-foreground'
  }`
}

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
    <Navbar
      menu={
        aberto && (
          <div className="border-t border-separator md:hidden">
            <ul className="flex flex-col gap-1 p-4">
              {itensPrincipais.map((item) => (
                <li key={item.para}>
                  <NavLink
                    to={item.para}
                    className={classeNav}
                    onClick={() => setAberto(false)}
                  >
                    {item.rotulo}
                  </NavLink>
                </li>
              ))}
              {pode('api.change_organizacao') &&
                itensCadastros.map((item) => (
                  <li key={item.para}>
                    <Link
                      to={item.para}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-muted no-underline transition-colors hover:bg-default/50 hover:text-foreground"
                      onClick={() => setAberto(false)}
                    >
                      {item.rotulo}
                    </Link>
                  </li>
                ))}
            </ul>
            <div className="flex flex-col gap-1 border-t border-separator p-4 md:hidden">
              <Link
                to="/perfil"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted no-underline transition-colors hover:bg-default/50 hover:text-foreground"
                onClick={() => setAberto(false)}
              >
                <i className="bi bi-person"></i> Meu perfil
              </Link>
              <button
                type="button"
                className="rounded-md px-3 py-2 text-left text-sm font-medium text-muted transition-colors hover:bg-default/50 hover:text-foreground"
                onClick={() => {
                  setAberto(false)
                  sair()
                }}
              >
                <i className="bi bi-box-arrow-right"></i> Sair
              </button>
            </div>
          </div>
        )
      }
    >
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          isIconOnly
          aria-label="Alternar menu"
          className="text-foreground md:hidden"
          onPress={() => setAberto(!aberto)}
        >
          <i className={`bi text-xl ${aberto ? 'bi-x-lg' : 'bi-list'}`} />
        </Button>
        <Link to={inicio} className="flex items-center text-lg font-bold text-foreground no-underline">
          {logo}
          {organizacao.nome}
        </Link>
      </div>

      <ul className="hidden items-center gap-1 ms-4 md:flex">
        {itensPrincipais.map((item) => (
          <li key={item.para}>
            <NavLink to={item.para} className={classeNav}>
              {item.rotulo}
            </NavLink>
          </li>
        ))}
        {pode('api.change_organizacao') && (
          <li>
            <Dropdown>
              <Dropdown.Trigger className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-default/50 hover:text-foreground">
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
          </li>
        )}
      </ul>

      <div className="ms-auto hidden md:block">
        <Dropdown>
          <Dropdown.Trigger className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-default/50">
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
    </Navbar>
  )
}