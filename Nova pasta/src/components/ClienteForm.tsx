import { useState } from 'react'
import type { Cliente } from '../database/db'

type Props = {
  onSalvar: (cliente: Cliente) => Promise<void>
  onCancelar: () => void
}

export default function ClienteForm({ onSalvar, onCancelar }: Props) {
  const [salvando, setSalvando] = useState(false)
  const [form, setForm] = useState<Omit<Cliente, 'criadoEm'>>({
    nome: '', contrato: '', telefone: '', operadora: 'TIM',
    endereco: '', bairro: '', status: 'aguardando'
  })

  const update = (campo: keyof typeof form, valor: string) =>
    setForm(prev => ({ ...prev, [campo]: valor }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nome || !form.contrato || !form.telefone) {
      alert('Preencha nome, contrato e telefone.')
      return
    }
    setSalvando(true)
    await onSalvar({ ...form, criadoEm: new Date().toISOString() })
    setSalvando(false)
  }

  return (
    <main className="page">
      <header className="page-header">
        <button className="back" onClick={onCancelar}>←</button>
        <div><span className="eyebrow">CADASTRO RÁPIDO</span><h1>Novo cliente</h1></div>
      </header>

      <form className="form-card" onSubmit={submit}>
        <label>Nome<input value={form.nome} onChange={e => update('nome', e.target.value)} /></label>
        <label>Contrato<input value={form.contrato} onChange={e => update('contrato', e.target.value)} /></label>
        <label>Telefone<input inputMode="tel" value={form.telefone} onChange={e => update('telefone', e.target.value)} /></label>
        <label>Operadora<input value={form.operadora} onChange={e => update('operadora', e.target.value)} /></label>
        <label>Endereço<input value={form.endereco} onChange={e => update('endereco', e.target.value)} /></label>
        <label>Bairro<input value={form.bairro} onChange={e => update('bairro', e.target.value)} /></label>
        <button className="primary-action" disabled={salvando}>{salvando ? 'Salvando...' : 'Salvar cliente'}</button>
      </form>
    </main>
  )
}
