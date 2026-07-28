import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'
import Clientes from './pages/Clientes'
import ClienteForm from './components/ClienteForm'
import { db, type Cliente, type StatusCliente } from './database/db'

type Tela = 'dashboard' | 'clientes' | 'novo-cliente'
const ordemStatus: StatusCliente[] = ['aguardando', 'confirmado', 'reagendar', 'concluido']

export default function App() {
  const [tela, setTela] = useState<Tela>('dashboard')
  const [clientes, setClientes] = useState<Cliente[]>([])

  async function carregarClientes() {
    setClientes(await db.clientes.orderBy('criadoEm').reverse().toArray())
  }

  useEffect(() => { carregarClientes() }, [])

  async function salvarCliente(cliente: Cliente) {
    await db.clientes.add(cliente)
    await carregarClientes()
    setTela('clientes')
  }

  async function alterarStatus(cliente: Cliente) {
    if (!cliente.id) return
    const atual = ordemStatus.indexOf(cliente.status)
    const proximo = ordemStatus[(atual + 1) % ordemStatus.length]
    await db.clientes.update(cliente.id, { status: proximo })
    await carregarClientes()
  }

  if (tela === 'novo-cliente') {
    return <ClienteForm onSalvar={salvarCliente} onCancelar={() => setTela('clientes')} />
  }

  if (tela === 'clientes') {
    return <Clientes clientes={clientes} onVoltar={() => setTela('dashboard')}
      onNovoCliente={() => setTela('novo-cliente')} onAlterarStatus={alterarStatus} />
  }

  return <Dashboard clientes={clientes} onNovoCliente={() => setTela('novo-cliente')}
    onAbrirClientes={() => setTela('clientes')} />
}
