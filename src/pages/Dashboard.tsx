import type { Cliente } from '../database/db'

type Props = {
  clientes: Cliente[]
  onNovoCliente: () => void
  onAbrirClientes: () => void
}

export default function Dashboard({ clientes, onNovoCliente, onAbrirClientes }: Props) {
  const confirmados = clientes.filter(c => c.status === 'confirmado').length
  const aguardando = clientes.filter(c => c.status === 'aguardando').length
  const reagendar = clientes.filter(c => c.status === 'reagendar').length

  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">LUSTOSA PRO</span>
        <h1>Bom dia, Rafael 👋</h1>
        <p>Sua operação. Sob controle.</p>
      </section>

      <section className="summary-grid">
        <article className="summary-card"><span>Coletas</span><strong>{clientes.length}</strong></article>
        <article className="summary-card success"><span>Confirmadas</span><strong>{confirmados}</strong></article>
        <article className="summary-card warning"><span>Aguardando</span><strong>{aguardando}</strong></article>
        <article className="summary-card danger"><span>Reagendar</span><strong>{reagendar}</strong></article>
      </section>

      <button className="primary-action" onClick={onAbrirClientes}>▶ Continuar operação</button>

      <section className="quick-actions">
        <button onClick={onNovoCliente}>＋ Novo cliente</button>
        <button onClick={onAbrirClientes}>👥 Clientes</button>
      </section>
    </main>
  )
}
