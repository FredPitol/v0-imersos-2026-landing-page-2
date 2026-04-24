'use client'

import { useState } from 'react'
import { 
  CreditCard, 
  QrCode, 
  FileText, 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Clock,
  Copy,
  Check,
  ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { CheckoutState, PaymentMethod, PaymentStatus } from '@/lib/checkout-types'
import { formatCurrency } from '@/lib/checkout-mock-data'

interface StepPaymentProps {
  state: CheckoutState
  onUpdate: (updates: Partial<CheckoutState>) => void
  onBack: () => void
  onComplete: () => void
  isCourtesy: boolean
}

const MOCK_PIX_CODE = '00020126580014br.gov.bcb.pix0136a629532e-7693-4846-b028-f5b54b1b3a8a5204000053039865802BR5925CONFERENCIA IMERSOS 20266009SAO PAULO62070503***6304E2CA'

export function StepPayment({ state, onUpdate, onBack, onComplete, isCourtesy }: StepPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PIX')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null)
  const [copied, setCopied] = useState(false)
  
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [installments, setInstallments] = useState('1')

  const subtotal = state.cart.reduce((sum, item) => sum + item.precoUnitario * item.quantidade, 0)
  const total = Math.max(0, subtotal - state.discount)

  const inputClassName = "bg-[#252512] border-[#3a3a2a] text-[#dbcec7] placeholder:text-[#bea79c]/50 focus:border-[#bf6237] focus:ring-[#bf6237]"

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19)
  }

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`
    }
    return numbers
  }

  const handleCopyPix = async () => {
    await navigator.clipboard.writeText(MOCK_PIX_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleProcessPayment = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setPaymentStatus('PENDENTE')
    setIsProcessing(false)
  }

  const handleMockStatus = (status: PaymentStatus) => {
    setPaymentStatus(status)
  }

  // Show courtesy completion screen
  if (isCourtesy) {
    return (
      <div className="space-y-6">
        <Card className="border-[#5e6533] bg-[#323714]/30">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#323714] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-[#5e6533]" />
            </div>
            <h2 className="text-2xl font-bold text-[#dbcec7] mb-2">Inscricao Confirmada!</h2>
            <p className="text-[#bea79c] mb-4">
              Sua inscricao cortesia foi realizada com sucesso.
            </p>
            <p className="text-sm text-[#bea79c]">
              Voce recebera um e-mail de confirmacao em breve.
            </p>
          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          <Button 
            onClick={onComplete} 
            size="lg" 
            className="px-8 bg-[#bf6237] hover:bg-[#6f3b23] text-[#161616] font-semibold"
          >
            Voltar ao Inicio
          </Button>
        </div>
      </div>
    )
  }

  // Show payment status screen
  if (paymentStatus) {
    return (
      <div className="space-y-6">
        <Card className={`border-2 ${
          paymentStatus === 'APROVADO' 
            ? 'border-[#5e6533] bg-[#323714]/30' 
            : paymentStatus === 'REJEITADO'
            ? 'border-[#6f3b23] bg-[#6f3b23]/20'
            : 'border-[#bf6237]/50 bg-[#6f3b23]/10'
        }`}>
          <CardContent className="p-8 text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              paymentStatus === 'APROVADO'
                ? 'bg-[#323714]'
                : paymentStatus === 'REJEITADO'
                ? 'bg-[#6f3b23]'
                : 'bg-[#6f3b23]/50'
            }`}>
              {paymentStatus === 'APROVADO' && <CheckCircle className="h-8 w-8 text-[#5e6533]" />}
              {paymentStatus === 'REJEITADO' && <XCircle className="h-8 w-8 text-[#bf6237]" />}
              {paymentStatus === 'PENDENTE' && <Clock className="h-8 w-8 text-[#bf6237]" />}
            </div>
            
            <h2 className="text-2xl font-bold text-[#dbcec7] mb-2">
              {paymentStatus === 'APROVADO' && 'Pagamento Aprovado!'}
              {paymentStatus === 'REJEITADO' && 'Pagamento Rejeitado'}
              {paymentStatus === 'PENDENTE' && 'Pagamento Pendente'}
            </h2>
            
            <p className="text-[#bea79c] mb-4">
              {paymentStatus === 'APROVADO' && 'Sua inscricao foi confirmada com sucesso. Voce recebera um e-mail de confirmacao.'}
              {paymentStatus === 'REJEITADO' && 'Houve um problema com seu pagamento. Por favor, tente novamente ou escolha outro metodo.'}
              {paymentStatus === 'PENDENTE' && 'Estamos aguardando a confirmacao do seu pagamento. Isso pode levar alguns minutos.'}
            </p>

            {paymentStatus === 'PENDENTE' && paymentMethod === 'PIX' && (
              <div className="mt-6 p-4 rounded-lg bg-[#252512]">
                <p className="text-sm text-[#bea79c] mb-2">Codigo PIX Copia e Cola:</p>
                <div className="flex items-center gap-2">
                  <Input 
                    value={MOCK_PIX_CODE.slice(0, 50) + '...'} 
                    readOnly 
                    className={`${inputClassName} text-xs`}
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleCopyPix}
                    className="border-[#3a3a2a] bg-transparent text-[#dbcec7] hover:bg-[#323714]"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}

            {paymentStatus === 'PENDENTE' && paymentMethod === 'BOLETO' && (
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="w-full border-[#3a3a2a] bg-transparent text-[#dbcec7] hover:bg-[#323714]"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Baixar Boleto
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mock status buttons for testing */}
        <Card className="border-dashed border-[#3a3a2a] bg-[#252512]/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#bea79c]">
              Simular Status (Para Testes)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleMockStatus('APROVADO')}
                className="flex-1 border-[#3a3a2a] bg-transparent text-[#dbcec7] hover:bg-[#323714] hover:text-[#dbcec7]"
              >
                Aprovado
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleMockStatus('PENDENTE')}
                className="flex-1 border-[#3a3a2a] bg-transparent text-[#dbcec7] hover:bg-[#323714] hover:text-[#dbcec7]"
              >
                Pendente
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleMockStatus('REJEITADO')}
                className="flex-1 border-[#3a3a2a] bg-transparent text-[#dbcec7] hover:bg-[#323714] hover:text-[#dbcec7]"
              >
                Rejeitado
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          {paymentStatus === 'REJEITADO' ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => setPaymentStatus(null)}
                className="border-[#3a3a2a] bg-transparent text-[#dbcec7] hover:bg-[#323714]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tentar Novamente
              </Button>
              <Button 
                onClick={onComplete}
                className="bg-[#bf6237] hover:bg-[#6f3b23] text-[#161616] font-semibold"
              >
                Voltar ao Inicio
              </Button>
            </>
          ) : (
            <Button 
              onClick={onComplete} 
              className="ml-auto bg-[#bf6237] hover:bg-[#6f3b23] text-[#161616] font-semibold" 
              size="lg"
            >
              {paymentStatus === 'APROVADO' ? 'Concluir' : 'Voltar ao Inicio'}
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#dbcec7]">
            <CreditCard className="h-5 w-5 text-[#bf6237]" />
            Forma de Pagamento
          </CardTitle>
          <CardDescription className="text-[#bea79c]">
            Escolha como deseja pagar sua inscricao.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
            className="space-y-3"
          >
            <div className={`flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer ${
              paymentMethod === 'PIX' ? 'border-[#bf6237] bg-[#6f3b23]/20' : 'border-[#3a3a2a] hover:border-[#5e6533]'
            }`}>
              <RadioGroupItem 
                value="PIX" 
                id="pix" 
                className="border-[#3a3a2a] text-[#bf6237] data-[state=checked]:border-[#bf6237]"
              />
              <Label htmlFor="pix" className="flex items-center gap-3 flex-1 cursor-pointer">
                <div className="p-2 rounded-lg bg-[#323714]">
                  <QrCode className="h-5 w-5 text-[#dbcec7]" />
                </div>
                <div>
                  <p className="font-medium text-[#dbcec7]">PIX</p>
                  <p className="text-sm text-[#bea79c]">Pagamento instantaneo</p>
                </div>
              </Label>
            </div>

            <div className={`flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer ${
              paymentMethod === 'CREDITO' ? 'border-[#bf6237] bg-[#6f3b23]/20' : 'border-[#3a3a2a] hover:border-[#5e6533]'
            }`}>
              <RadioGroupItem 
                value="CREDITO" 
                id="credito" 
                className="border-[#3a3a2a] text-[#bf6237] data-[state=checked]:border-[#bf6237]"
              />
              <Label htmlFor="credito" className="flex items-center gap-3 flex-1 cursor-pointer">
                <div className="p-2 rounded-lg bg-[#323714]">
                  <CreditCard className="h-5 w-5 text-[#dbcec7]" />
                </div>
                <div>
                  <p className="font-medium text-[#dbcec7]">Cartao de Credito</p>
                  <p className="text-sm text-[#bea79c]">Parcele em ate 12x</p>
                </div>
              </Label>
            </div>

            <div className={`flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer ${
              paymentMethod === 'BOLETO' ? 'border-[#bf6237] bg-[#6f3b23]/20' : 'border-[#3a3a2a] hover:border-[#5e6533]'
            }`}>
              <RadioGroupItem 
                value="BOLETO" 
                id="boleto" 
                className="border-[#3a3a2a] text-[#bf6237] data-[state=checked]:border-[#bf6237]"
              />
              <Label htmlFor="boleto" className="flex items-center gap-3 flex-1 cursor-pointer">
                <div className="p-2 rounded-lg bg-[#323714]">
                  <FileText className="h-5 w-5 text-[#dbcec7]" />
                </div>
                <div>
                  <p className="font-medium text-[#dbcec7]">Boleto Bancario</p>
                  <p className="text-sm text-[#bea79c]">Vencimento em 3 dias uteis</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* PIX Payment */}
      {paymentMethod === 'PIX' && (
        <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
          <CardHeader>
            <CardTitle className="text-[#dbcec7]">Pagamento via PIX</CardTitle>
            <CardDescription className="text-[#bea79c]">
              Escaneie o QR Code ou copie o codigo para pagar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-[#dbcec7] rounded-lg">
                <div className="w-48 h-48 bg-[#161616] rounded-lg flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-[#dbcec7]" />
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-[#bf6237]">{formatCurrency(total)}</p>
              <p className="text-sm text-[#bea79c]">Valor a pagar</p>
            </div>

            <div className="space-y-2">
              <Label className="text-[#dbcec7]">PIX Copia e Cola</Label>
              <div className="flex gap-2">
                <Input 
                  value={MOCK_PIX_CODE.slice(0, 40) + '...'} 
                  readOnly 
                  className={`${inputClassName} text-xs`}
                />
                <Button 
                  variant="outline" 
                  onClick={handleCopyPix}
                  className="border-[#3a3a2a] bg-transparent text-[#dbcec7] hover:bg-[#323714]"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Credit Card Form */}
      {paymentMethod === 'CREDITO' && (
        <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
          <CardHeader>
            <CardTitle className="text-[#dbcec7]">Dados do Cartao</CardTitle>
            <CardDescription className="text-[#bea79c]">
              Preencha os dados do seu cartao de credito.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-[#dbcec7]">Numero do Cartao</Label>
              <Input
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName" className="text-[#dbcec7]">Nome no Cartao</Label>
              <Input
                id="cardName"
                placeholder="NOME COMO ESTA NO CARTAO"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                className={inputClassName}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardExpiry" className="text-[#dbcec7]">Validade</Label>
                <Input
                  id="cardExpiry"
                  placeholder="MM/AA"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  className={inputClassName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardCvv" className="text-[#dbcec7]">CVV</Label>
                <Input
                  id="cardCvv"
                  placeholder="000"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#dbcec7]">Parcelas</Label>
              <Select value={installments} onValueChange={setInstallments}>
                <SelectTrigger className={inputClassName}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1e1e1e] border-[#3a3a2a]">
                  <SelectItem value="1" className="text-[#dbcec7] focus:bg-[#323714] focus:text-[#dbcec7]">1x de {formatCurrency(total)} (sem juros)</SelectItem>
                  <SelectItem value="2" className="text-[#dbcec7] focus:bg-[#323714] focus:text-[#dbcec7]">2x de {formatCurrency(total / 2)} (sem juros)</SelectItem>
                  <SelectItem value="3" className="text-[#dbcec7] focus:bg-[#323714] focus:text-[#dbcec7]">3x de {formatCurrency(total / 3)} (sem juros)</SelectItem>
                  <SelectItem value="6" className="text-[#dbcec7] focus:bg-[#323714] focus:text-[#dbcec7]">6x de {formatCurrency(total / 6)} (sem juros)</SelectItem>
                  <SelectItem value="12" className="text-[#dbcec7] focus:bg-[#323714] focus:text-[#dbcec7]">12x de {formatCurrency(total / 12)} (sem juros)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Boleto Info */}
      {paymentMethod === 'BOLETO' && (
        <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
          <CardHeader>
            <CardTitle className="text-[#dbcec7]">Boleto Bancario</CardTitle>
            <CardDescription className="text-[#bea79c]">
              O boleto sera gerado apos a confirmacao.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-[#252512] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#bea79c]">Valor:</span>
                <span className="font-semibold text-[#dbcec7]">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#bea79c]">Vencimento:</span>
                <span className="font-semibold text-[#dbcec7]">3 dias uteis</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-[#bea79c]">
              Apos a confirmacao, voce podera baixar o boleto ou recebe-lo por e-mail.
              A inscricao sera confirmada apos a compensacao do pagamento (ate 3 dias uteis).
            </p>
          </CardContent>
        </Card>
      )}

      {/* Total */}
      <Card className="border-[#bf6237]/50 bg-[#6f3b23]/20">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-[#bea79c]">Total a pagar:</span>
            <span className="text-2xl font-bold text-[#bf6237]">{formatCurrency(total)}</span>
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
          onClick={handleProcessPayment} 
          disabled={isProcessing}
          size="lg" 
          className="px-8 bg-[#bf6237] hover:bg-[#6f3b23] text-[#161616] font-semibold disabled:bg-[#3a3a2a] disabled:text-[#bea79c]"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            `Pagar ${formatCurrency(total)}`
          )}
        </Button>
      </div>
    </div>
  )
}
