import type { Cliente } from '../database/db'

type Props = {
  clientes: Cliente[]
  onVoltar: () => void
  onNovoCliente: () => void
  onAlterarStatus: (cliente: Cliente) => void
}

export default function Clientes({ clientes, onVoltar, onNovoCliente, onAlterarStatus }: Props) {
  return (
    <main className="page">
      <header className="page-header">
        <button className="back" onClick={onVoltar}>←</button>
        <div><span className="eyebrow">OPERAÇÃO</span><h1>Clientes</h1></div>
        <button className="add" onClick={onNovoCliente}>＋</button>
      </header>

      <section className="client-list">
        {clientes.length === 0 && (
          <div className="empty-state">
            <strong>Nenhum cliente cadastrado.</strong>
            <p>Cadastre o primeiro cliente para iniciar o teste.</p>
          </div>
        )}

        {clientes.map(cliente => (
          <article className="client-card" key={cliente.id}>
            <div>
              <span className={`status ${cliente.status}`}>{cliente.status}</span>
              <h2>{cliente.nome}</h2>
              <p>{cliente.bairro || 'Bairro não informado'} · Contrato {cliente.contrato}</p>
            </div>
            <div className="client-actions">
              <a href={`https://wa.me/55${cliente.telefone.replace(/\D/g, '')}`} target="_blank">WhatsApp</a>
              <button onClick={() => onAlterarStatus(cliente)}>Alterar status</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
