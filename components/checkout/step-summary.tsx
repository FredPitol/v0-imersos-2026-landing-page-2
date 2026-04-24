'use client'

import { useState } from 'react'
import { FileText, User, ShoppingBag, Tag, Calendar, MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { CheckoutState } from '@/lib/checkout-types'
import { formatCurrency, applyCoupon, EVENT_INFO } from '@/lib/checkout-mock-data'

interface StepSummaryProps {
  state: CheckoutState
  onUpdate: (updates: Partial<CheckoutState>) => void
  onNext: () => void
  onBack: () => void
}

export function StepSummary({ state, onUpdate, onNext, onBack }: StepSummaryProps) {
  const [couponInput, setCouponInput] = useState(state.coupon || '')
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const subtotal = state.cart.reduce((sum, item) => sum + item.precoUnitario * item.quantidade, 0)
  const total = Math.max(0, subtotal - state.discount)
  const isCourtesy = state.discount >= subtotal && state.discount > 0

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return

    setIsApplyingCoupon(true)
    await new Promise(resolve => setTimeout(resolve, 800))

    const result = applyCoupon(couponInput, subtotal)

    if (result.valid) {
      onUpdate({ 
        coupon: couponInput.toUpperCase(),
        discount: result.discount 
      })
      setCouponMessage({ type: 'success', text: result.message })
    } else {
      setCouponMessage({ type: 'error', text: result.message })
    }

    setIsApplyingCoupon(false)
  }

  const removeCoupon = () => {
    onUpdate({ coupon: '', discount: 0 })
    setCouponInput('')
    setCouponMessage(null)
  }

  const getRegistrationTypeLabel = () => {
    switch (state.registrationType) {
      case 'PARTICIPANTE':
        return 'Participante'
      case 'CRIANCA':
        return 'Crianca (Menor de 16)'
      case 'VOLUNTARIO':
        return 'Voluntario'
      case 'PALESTRANTE':
        return 'Palestrante'
      default:
        return 'Participante'
    }
  }

  const canProceed = state.termsAccepted

  return (
    <div className="space-y-6">
      {/* Event Info */}
      <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#dbcec7]">
            <Calendar className="h-5 w-5 text-[#bf6237]" />
            Evento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-[#dbcec7]">{EVENT_INFO.nome}</h3>
            <div className="flex items-center gap-2 text-[#bea79c]">
              <Calendar className="h-4 w-4" />
              <span>{EVENT_INFO.data}</span>
            </div>
            <div className="flex items-center gap-2 text-[#bea79c]">
              <MapPin className="h-4 w-4" />
              <span>{EVENT_INFO.local}</span>
            </div>
            <div className="mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#323714] text-[#dbcec7]">
                {EVENT_INFO.loteAtual}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registration Type & User Info */}
      <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#dbcec7]">
            <User className="h-5 w-5 text-[#bf6237]" />
            Inscricao
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#bea79c]">Tipo de Inscricao</span>
              <span className="font-medium text-[#dbcec7]">{getRegistrationTypeLabel()}</span>
            </div>
            
            <div className="border-t border-[#3a3a2a] pt-4">
              <h4 className="font-medium text-[#dbcec7] mb-2">Dados do Participante</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-[#bea79c]">Nome:</span>
                <span className="text-[#dbcec7]">{state.person.nome || '-'}</span>
                <span className="text-[#bea79c]">CPF:</span>
                <span className="text-[#dbcec7]">{state.cpf}</span>
                <span className="text-[#bea79c]">E-mail:</span>
                <span className="text-[#dbcec7]">{state.person.email || '-'}</span>
                <span className="text-[#bea79c]">Telefone:</span>
                <span className="text-[#dbcec7]">{state.person.telefone || '-'}</span>
              </div>
            </div>

            {state.registrationType === 'CRIANCA' && state.guardian && (
              <div className="border-t border-[#3a3a2a] pt-4">
                <h4 className="font-medium text-[#dbcec7] mb-2">Responsavel</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-[#bea79c]">Nome:</span>
                  <span className="text-[#dbcec7]">{state.guardian.nome}</span>
                  <span className="text-[#bea79c]">E-mail:</span>
                  <span className="text-[#dbcec7]">{state.guardian.email}</span>
                  <span className="text-[#bea79c]">Parentesco:</span>
                  <span className="text-[#dbcec7] capitalize">{state.guardian.parentesco}</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#dbcec7]">
            <ShoppingBag className="h-5 w-5 text-[#bf6237]" />
            Itens Selecionados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {state.cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-[#3a3a2a]/50 last:border-0">
                <div>
                  <p className="font-medium text-[#dbcec7]">{item.nome}</p>
                  <p className="text-sm text-[#bea79c]">
                    {item.quantidade}x {formatCurrency(item.precoUnitario)}
                  </p>
                </div>
                <span className="font-semibold text-[#dbcec7]">
                  {formatCurrency(item.precoUnitario * item.quantidade)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Coupon */}
      <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#dbcec7]">
            <Tag className="h-5 w-5 text-[#bf6237]" />
            Cupom de Desconto
          </CardTitle>
          <CardDescription className="text-[#bea79c]">
            Insira um cupom para aplicar desconto.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.coupon ? (
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#323714]/30 border border-[#5e6533]">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#5e6533]" />
                <span className="font-medium text-[#dbcec7]">{state.coupon}</span>
                <span className="text-sm text-[#bea79c]">
                  (-{formatCurrency(state.discount)})
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={removeCoupon}
                className="text-[#bea79c] hover:text-[#dbcec7] hover:bg-[#3a3a2a]"
              >
                Remover
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite o cupom"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value.toUpperCase())
                    setCouponMessage(null)
                  }}
                  className="bg-[#252512] border-[#3a3a2a] text-[#dbcec7] placeholder:text-[#bea79c]/50 focus:border-[#bf6237]"
                />
                <Button 
                  onClick={handleApplyCoupon}
                  disabled={!couponInput.trim() || isApplyingCoupon}
                  className="bg-[#323714] hover:bg-[#5e6533] text-[#dbcec7]"
                >
                  {isApplyingCoupon ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Aplicar'
                  )}
                </Button>
              </div>
              {couponMessage && (
                <div className={`flex items-center gap-2 text-sm ${
                  couponMessage.type === 'success' ? 'text-[#5e6533]' : 'text-[#bf6237]'
                }`}>
                  {couponMessage.type === 'success' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {couponMessage.text}
                </div>
              )}
              <p className="text-xs text-[#bea79c]">
                Cupons de teste: IMERSOS10, PRIMEIRACOMPRA, CORTESIA100, DESCONTO50
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Total */}
      <Card className={`border-2 ${isCourtesy ? 'border-[#5e6533] bg-[#323714]/30' : 'border-[#3a3a2a] bg-[#1e1e1e]'}`}>
        <CardContent className="p-6">
          <div className="space-y-2">
            <div className="flex justify-between text-[#bea79c]">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {state.discount > 0 && (
              <div className="flex justify-between text-[#5e6533]">
                <span>Desconto</span>
                <span>-{formatCurrency(state.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold text-[#dbcec7] pt-2 border-t border-[#3a3a2a]">
              <span>Total</span>
              <span>{isCourtesy ? 'Cortesia' : formatCurrency(total)}</span>
            </div>
          </div>

          {isCourtesy && (
            <div className="mt-4 p-3 rounded-lg bg-[#323714]/50 text-center">
              <p className="font-medium text-[#dbcec7]">
                Inscricao Cortesia - Pagamento nao necessario
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Terms */}
      <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#dbcec7]">
            <FileText className="h-5 w-5 text-[#bf6237]" />
            Termos e Condicoes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={state.termsAccepted}
              onCheckedChange={(checked) => onUpdate({ termsAccepted: checked as boolean })}
              className="border-[#3a3a2a] data-[state=checked]:bg-[#bf6237] data-[state=checked]:border-[#bf6237]"
            />
            <Label htmlFor="terms" className="text-sm text-[#bea79c] leading-relaxed cursor-pointer">
              Li e concordo com os{' '}
              <a href="#" className="text-[#bf6237] hover:underline">
                Termos e Condicoes
              </a>{' '}
              e a{' '}
              <a href="#" className="text-[#bf6237] hover:underline">
                Politica de Privacidade
              </a>{' '}
              do evento Imersos 2026.
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-[#3a3a2a] bg-transparent text-[#dbcec7] hover:bg-[#323714] hover:text-[#dbcec7]"
        >
          Voltar
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!canProceed}
          size="lg" 
          className="px-8 bg-[#bf6237] hover:bg-[#6f3b23] text-[#161616] font-semibold disabled:bg-[#3a3a2a] disabled:text-[#bea79c]"
        >
          {isCourtesy ? 'Finalizar Inscricao' : 'Ir para Pagamento'}
        </Button>
      </div>
    </div>
  )
}
