import Dexie, { type Table } from 'dexie'

export type StatusCliente = 'aguardando' | 'confirmado' | 'reagendar' | 'concluido'

export interface Cliente {
  id?: number
  nome: string
  contrato: string
  telefone: string
  operadora: string
  endereco: string
  bairro: string
  status: StatusCliente
  criadoEm: string
}

class LustosaDatabase extends Dexie {
  clientes!: Table<Cliente, number>
  constructor() {
    super('LustosaPRO')
    this.version(1).stores({
      clientes: '++id, nome, contrato, telefone, bairro, status, criadoEm'
    })
  }
}
export const db = new LustosaDatabase()
