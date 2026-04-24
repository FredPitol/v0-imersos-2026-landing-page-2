// Checkout Types and Interfaces

export type RegistrationType = 'PARTICIPANTE' | 'CRIANCA' | 'VOLUNTARIO' | 'PALESTRANTE'

export type PaymentMethod = 'PIX' | 'CREDITO' | 'BOLETO'

export type PaymentStatus = 'PENDENTE' | 'APROVADO' | 'REJEITADO'

export interface Person {
  cpf: string
  nome: string
  email: string
  telefone: string
  dataNascimento: string
  endereco?: {
    cep: string
    logradouro: string
    numero: string
    complemento?: string
    bairro: string
    cidade: string
    estado: string
  }
}

export interface Guardian {
  cpf: string
  nome: string
  email: string
  telefone: string
  parentesco: string
}

export interface Speaker extends Person {
  bio: string
  tema: string
  instituicao: string
}

export interface Volunteer extends Person {
  areaAtuacao: string
  experiencia: string
}

export interface Product {
  id: string
  nome: string
  descricao: string
  tipo: 'INGRESSO' | 'CAMISETA' | 'KIT' | 'ALIMENTACAO'
  preco: number
  variantes?: ProductVariant[]
}

export interface ProductVariant {
  id: string
  nome: string
  preco: number
}

export interface CartItem {
  productId: string
  variantId?: string
  nome: string
  quantidade: number
  precoUnitario: number
}

export interface Registration {
  tipo: RegistrationType
  pessoa: Person
  responsavel?: Guardian
  palestrante?: Speaker
  voluntario?: Volunteer
  itens: CartItem[]
  subtotal: number
  desconto: number
  cupom?: string
  total: number
  lote: string
  evento: {
    nome: string
    data: string
    local: string
  }
}

export interface Payment {
  metodo: PaymentMethod
  status: PaymentStatus
  pixQrCode?: string
  pixCopiaECola?: string
  boletoUrl?: string
  cartao?: {
    numero: string
    nome: string
    validade: string
    cvv: string
    parcelas: number
  }
}

export interface CheckoutState {
  currentStep: number
  registrationType: RegistrationType | null
  isChild: boolean
  cpf: string
  dataNascimento: string
  person: Partial<Person>
  guardian: Partial<Guardian> | null
  speaker: Partial<Speaker> | null
  volunteer: Partial<Volunteer> | null
  cart: CartItem[]
  coupon: string
  discount: number
  payment: Partial<Payment>
  termsAccepted: boolean
}

// Step definitions
export const CHECKOUT_STEPS = [
  { id: 1, name: 'Identificacao', label: 'Identificacao' },
  { id: 2, name: 'Dados', label: 'Dados' },
  { id: 3, name: 'Produtos', label: 'Produtos' },
  { id: 4, name: 'Resumo', label: 'Resumo' },
  { id: 5, name: 'Pagamento', label: 'Pagamento' },
] as const
