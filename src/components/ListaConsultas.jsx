import { usePaginado } from '../hooks/useApi'
import { Carregando } from './Carregando'
import { CarregarMais } from './CarregarMais'
import { ConsultaItem } from './ConsultaItem'
import { Erro } from './Erro'

export function ListaConsultas({ caminho, vazio = 'Nenhuma consulta aqui.', mostrarPaciente = false }) {
  const consultas = usePaginado(caminho)

  if (consultas.erro) return <Erro erro={consultas.erro} tentarDeNovo={consultas.recarregar} />

  return (
    <>
      {!consultas.carregando && consultas.itens.length === 0 && <p className="text-gray-500">{vazio}</p>}
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200">
        {consultas.itens.map(consulta => (
          <ConsultaItem key={consulta.id} consulta={consulta} mostrarPaciente={mostrarPaciente} />
        ))}
      </div>
      {consultas.carregando ? <Carregando /> : <CarregarMais lista={consultas} />}
    </>
  )
}
