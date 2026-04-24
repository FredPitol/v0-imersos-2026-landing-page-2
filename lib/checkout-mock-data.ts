// Mock Data for Checkout Flow

import type { Person, Product, Speaker, Volunteer, Guardian } from './checkout-types'

// Pre-registered volunteers (mock database)
export const MOCK_VOLUNTEERS: Record<string, Volunteer> = {
  '111.111.111-11': {
    cpf: '111.111.111-11',
    nome: 'Maria Silva Santos',
    email: 'maria.silva@email.com',
    telefone: '(27) 99999-1111',
    dataNascimento: '1995-03-15',
    areaAtuacao: 'Louvor',
    experiencia: '3 anos de voluntariado em eventos cristãos',
    endereco: {
      cep: '29000-000',
      logradouro: 'Rua das Flores',
      numero: '100',
      bairro: 'Centro',
      cidade: 'Vitoria',
      estado: 'ES',
    },
  },
  '222.222.222-22': {
    cpf: '222.222.222-22',
    nome: 'Joao Pedro Oliveira',
    email: 'joao.pedro@email.com',
    telefone: '(27) 99999-2222',
    dataNascimento: '1998-07-20',
    areaAtuacao: 'Recepcao',
    experiencia: '2 anos como voluntario',
    endereco: {
      cep: '29100-000',
      logradouro: 'Av. Principal',
      numero: '200',
      bairro: 'Jardim America',
      cidade: 'Vila Velha',
      estado: 'ES',
    },
  },
}

// Pre-registered speakers (mock database)
export const MOCK_SPEAKERS: Record<string, Speaker> = {
  '333.333.333-33': {
    cpf: '333.333.333-33',
    nome: 'Pastor Lucas Ferreira',
    email: 'pr.lucas@igreja.com',
    telefone: '(27) 99999-3333',
    dataNascimento: '1985-11-10',
    bio: 'Pastor ha 15 anos, dedicado ao ministerio com jovens e adolescentes.',
    tema: 'O Chamado de Uma Geracao',
    instituicao: 'Igreja Batista Central',
    endereco: {
      cep: '29200-000',
      logradouro: 'Rua da Igreja',
      numero: '50',
      bairro: 'Centro',
      cidade: 'Serra',
      estado: 'ES',
    },
  },
  '444.444.444-44': {
    cpf: '444.444.444-44',
    nome: 'Pra. Ana Carolina Mendes',
    email: 'pra.ana@ministerio.com',
    telefone: '(27) 99999-4444',
    dataNascimento: '1990-05-25',
    bio: 'Lider de jovens com 10 anos de experiencia em conferencias.',
    tema: 'Vivendo o Proposito',
    instituicao: 'Comunidade Crista',
    endereco: {
      cep: '29300-000',
      logradouro: 'Av. da Fe',
      numero: '300',
      bairro: 'Nova Cidade',
      cidade: 'Cariacica',
      estado: 'ES',
    },
  },
}

// Mock guardians database (for child registration lookup)
export const MOCK_GUARDIANS: Record<string, Guardian> = {
  '555.555.555-55': {
    cpf: '555.555.555-55',
    nome: 'Roberto Almeida Costa',
    email: 'roberto.costa@email.com',
    telefone: '(27) 99999-5555',
    parentesco: '',
  },
  '666.666.666-66': {
    cpf: '666.666.666-66',
    nome: 'Patricia Souza Lima',
    email: 'patricia.lima@email.com',
    telefone: '(27) 99999-6666',
    parentesco: '',
  },
}

// Products available for purchase
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'ingresso-padrao',
    nome: 'Ingresso Imersos 2026',
    descricao: 'Acesso completo a todos os dias da conferencia',
    tipo: 'INGRESSO',
    preco: 150.00,
  },
  {
    id: 'camiseta',
    nome: 'Camiseta Oficial Imersos 2026',
    descricao: 'Camiseta exclusiva da conferencia',
    tipo: 'CAMISETA',
    preco: 60.00,
    variantes: [
      { id: 'camiseta-p', nome: 'Tamanho P', preco: 60.00 },
      { id: 'camiseta-m', nome: 'Tamanho M', preco: 60.00 },
      { id: 'camiseta-g', nome: 'Tamanho G', preco: 60.00 },
      { id: 'camiseta-gg', nome: 'Tamanho GG', preco: 65.00 },
    ],
  },
  {
    id: 'kit-completo',
    nome: 'Kit Imersos Completo',
    descricao: 'Ingresso + Camiseta + Caneca + Caderno de Anotacoes',
    tipo: 'KIT',
    preco: 220.00,
    variantes: [
      { id: 'kit-p', nome: 'Camiseta P', preco: 220.00 },
      { id: 'kit-m', nome: 'Camiseta M', preco: 220.00 },
      { id: 'kit-g', nome: 'Camiseta G', preco: 220.00 },
      { id: 'kit-gg', nome: 'Camiseta GG', preco: 225.00 },
    ],
  },
  {
    id: 'alimentacao',
    nome: 'Pacote Alimentacao',
    descricao: 'Almoco e lanche para todos os dias do evento',
    tipo: 'ALIMENTACAO',
    preco: 80.00,
  },
]

// Coupon codes
export const MOCK_COUPONS: Record<string, { desconto: number; tipo: 'percentual' | 'fixo' }> = {
  'IMERSOS10': { desconto: 10, tipo: 'percentual' },
  'PRIMEIRACOMPRA': { desconto: 15, tipo: 'percentual' },
  'CORTESIA100': { desconto: 100, tipo: 'percentual' }, // 100% discount - courtesy
  'DESCONTO50': { desconto: 50, tipo: 'fixo' },
}

// Event details
export const EVENT_INFO = {
  nome: 'Imersos 2026 - A Missao: O Despertar de Uma Geracao',
  data: 'Novembro de 2026',
  local: 'Vitoria - ES',
  loteAtual: '1º Lote',
}

// Helper function to check if CPF is pre-registered
export function checkCpfRegistration(cpf: string): { type: 'VOLUNTARIO' | 'PALESTRANTE' | null; data: Volunteer | Speaker | null } {
  const cleanCpf = cpf.replace(/\D/g, '')
  
  // Check volunteers
  for (const [key, volunteer] of Object.entries(MOCK_VOLUNTEERS)) {
    if (key.replace(/\D/g, '') === cleanCpf) {
      return { type: 'VOLUNTARIO', data: volunteer }
    }
  }
  
  // Check speakers
  for (const [key, speaker] of Object.entries(MOCK_SPEAKERS)) {
    if (key.replace(/\D/g, '') === cleanCpf) {
      return { type: 'PALESTRANTE', data: speaker }
    }
  }
  
  return { type: null, data: null }
}

// Helper function to check if someone is under 16
export function isUnder16(birthDate: string): boolean {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age < 16
}

// Helper function to find guardian by CPF
export function findGuardian(cpf: string): Guardian | null {
  const cleanCpf = cpf.replace(/\D/g, '')
  
  for (const [key, guardian] of Object.entries(MOCK_GUARDIANS)) {
    if (key.replace(/\D/g, '') === cleanCpf) {
      return guardian
    }
  }
  
  return null
}

// Helper function to apply coupon
export function applyCoupon(code: string, subtotal: number): { valid: boolean; discount: number; message: string } {
  const coupon = MOCK_COUPONS[code.toUpperCase()]
  
  if (!coupon) {
    return { valid: false, discount: 0, message: 'Cupom invalido' }
  }
  
  let discount = 0
  if (coupon.tipo === 'percentual') {
    discount = (subtotal * coupon.desconto) / 100
  } else {
    discount = Math.min(coupon.desconto, subtotal)
  }
  
  const isCourtesy = coupon.desconto === 100 && coupon.tipo === 'percentual'
  
  return { 
    valid: true, 
    discount, 
    message: isCourtesy ? 'Cortesia aplicada!' : `Desconto de R$ ${discount.toFixed(2)} aplicado!` 
  }
}

// Format CPF helper
export function formatCpf(value: string): string {
  const numbers = value.replace(/\D/g, '')
  return numbers
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14)
}

// Format phone helper
export function formatPhone(value: string): string {
  const numbers = value.replace(/\D/g, '')
  return numbers
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15)
}

// Format CEP helper
export function formatCep(value: string): string {
  const numbers = value.replace(/\D/g, '')
  return numbers.replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9)
}

// Format currency
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
