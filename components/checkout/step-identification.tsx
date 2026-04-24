'use client'

import { useState } from 'react'
import { User, Calendar, Loader2, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { CheckoutState, RegistrationType } from '@/lib/checkout-types'
import { formatCpf, checkCpfRegistration, isUnder16 } from '@/lib/checkout-mock-data'

interface StepIdentificationProps {
  state: CheckoutState
  onUpdate: (updates: Partial<CheckoutState>) => void
  onNext: () => void
}

export function StepIdentification({ state, onUpdate, onNext }: StepIdentificationProps) {
  const [isChecking, setIsChecking] = useState(false)
  const [checkResult, setCheckResult] = useState<{
    type: RegistrationType | null
    message: string
  } | null>(null)

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCpf(e.target.value)
    onUpdate({ cpf: formatted })
    setCheckResult(null)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ dataNascimento: e.target.value })
    setCheckResult(null)
  }

  const handleVerify = async () => {
    if (!state.cpf || !state.dataNascimento) return

    setIsChecking(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))

    const { type, data } = checkCpfRegistration(state.cpf)
    const isChildAge = isUnder16(state.dataNascimento)

    let registrationType: RegistrationType
    let message: string

    if (type === 'VOLUNTARIO') {
      registrationType = 'VOLUNTARIO'
      message = `Voluntario pre-cadastrado encontrado: ${data?.nome}`
      onUpdate({ 
        registrationType: 'VOLUNTARIO',
        isChild: false,
        volunteer: data as CheckoutState['volunteer'],
        person: data as Partial<CheckoutState['person']>
      })
    } else if (type === 'PALESTRANTE') {
      registrationType = 'PALESTRANTE'
      message = `Palestrante pre-cadastrado encontrado: ${data?.nome}`
      onUpdate({ 
        registrationType: 'PALESTRANTE',
        isChild: false,
        speaker: data as CheckoutState['speaker'],
        person: data as Partial<CheckoutState['person']>
      })
    } else if (isChildAge) {
      registrationType = 'CRIANCA'
      message = 'Participante menor de 16 anos. Sera necessario informar um responsavel.'
      onUpdate({ 
        registrationType: 'CRIANCA',
        isChild: true
      })
    } else {
      registrationType = 'PARTICIPANTE'
      message = 'Participante padrao identificado.'
      onUpdate({ 
        registrationType: 'PARTICIPANTE',
        isChild: false
      })
    }

    setCheckResult({ type: registrationType, message })
    setIsChecking(false)
  }

  const canProceed = state.cpf.length === 14 && state.dataNascimento && checkResult

  const handleMockState = (type: RegistrationType) => {
    const mockData = {
      'PARTICIPANTE': {
        cpf: '999.999.999-99',
        dataNascimento: '2000-01-01',
        registrationType: 'PARTICIPANTE' as RegistrationType,
        isChild: false,
      },
      'CRIANCA': {
        cpf: '888.888.888-88',
        dataNascimento: '2015-06-15',
        registrationType: 'CRIANCA' as RegistrationType,
        isChild: true,
      },
      'VOLUNTARIO': {
        cpf: '111.111.111-11',
        dataNascimento: '1995-03-15',
        registrationType: 'VOLUNTARIO' as RegistrationType,
        isChild: false,
      },
      'PALESTRANTE': {
        cpf: '333.333.333-33',
        dataNascimento: '1985-11-10',
        registrationType: 'PALESTRANTE' as RegistrationType,
        isChild: false,
      },
    }

    const data = mockData[type]
    onUpdate({
      cpf: data.cpf,
      dataNascimento: data.dataNascimento,
      registrationType: data.registrationType,
      isChild: data.isChild,
    })

    if (type === 'VOLUNTARIO') {
      handleVerifyMock('VOLUNTARIO')
    } else if (type === 'PALESTRANTE') {
      handleVerifyMock('PALESTRANTE')
    } else {
      setCheckResult({ 
        type: data.registrationType, 
        message: type === 'CRIANCA' 
          ? 'Participante menor de 16 anos. Sera necessario informar um responsavel.'
          : 'Participante padrao identificado.'
      })
    }
  }

  const handleVerifyMock = async (type: 'VOLUNTARIO' | 'PALESTRANTE') => {
    setIsChecking(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (type === 'VOLUNTARIO') {
      const { data } = checkCpfRegistration('111.111.111-11')
      onUpdate({ 
        volunteer: data as CheckoutState['volunteer'],
        person: data as Partial<CheckoutState['person']>
      })
      setCheckResult({ type: 'VOLUNTARIO', message: `Voluntario pre-cadastrado encontrado: ${data?.nome}` })
    } else {
      const { data } = checkCpfRegistration('333.333.333-33')
      onUpdate({ 
        speaker: data as CheckoutState['speaker'],
        person: data as Partial<CheckoutState['person']>
      })
      setCheckResult({ type: 'PALESTRANTE', message: `Palestrante pre-cadastrado encontrado: ${data?.nome}` })
    }
    
    setIsChecking(false)
  }

  return (
    <div className="space-y-6">
      <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#dbcec7]">
            <User className="h-5 w-5 text-[#bf6237]" />
            Identificacao
          </CardTitle>
          <CardDescription className="text-[#bea79c]">
            Informe seu CPF e data de nascimento para identificarmos o tipo de inscricao.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cpf" className="text-[#dbcec7]">CPF</Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              value={state.cpf}
              onChange={handleCpfChange}
              maxLength={14}
              className="bg-[#252512] border-[#3a3a2a] text-[#dbcec7] placeholder:text-[#bea79c]/50 focus:border-[#bf6237] focus:ring-[#bf6237]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataNascimento" className="text-[#dbcec7]">Data de Nascimento</Label>
            <div className="relative">
              <Input
                id="dataNascimento"
                type="date"
                value={state.dataNascimento}
                onChange={handleDateChange}
                className="bg-[#252512] border-[#3a3a2a] text-[#dbcec7] focus:border-[#bf6237] focus:ring-[#bf6237]"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#bea79c] pointer-events-none" />
            </div>
          </div>

          <Button 
            onClick={handleVerify} 
            disabled={state.cpf.length !== 14 || !state.dataNascimento || isChecking}
            className="w-full bg-[#bf6237] hover:bg-[#6f3b23] text-[#161616] font-semibold"
          >
            {isChecking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verificando...
              </>
            ) : (
              'Verificar'
            )}
          </Button>

          {checkResult && (
            <div className={`p-4 rounded-lg border ${
              checkResult.type === 'VOLUNTARIO' || checkResult.type === 'PALESTRANTE'
                ? 'bg-[#323714]/30 border-[#5e6533]'
                : checkResult.type === 'CRIANCA'
                ? 'bg-[#6f3b23]/20 border-[#bf6237]/50'
                : 'bg-[#252512] border-[#3a3a2a]'
            }`}>
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 mt-0.5 text-[#bf6237]" />
                <div>
                  <p className="font-medium text-[#dbcec7]">
                    {checkResult.type === 'VOLUNTARIO' && 'Voluntario'}
                    {checkResult.type === 'PALESTRANTE' && 'Palestrante'}
                    {checkResult.type === 'CRIANCA' && 'Crianca (Menor de 16 anos)'}
                    {checkResult.type === 'PARTICIPANTE' && 'Participante'}
                  </p>
                  <p className="text-sm text-[#bea79c]">{checkResult.message}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mock state buttons for testing */}
      <Card className="border-dashed border-[#3a3a2a] bg-[#252512]/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-[#bea79c]">
            Simulacao (Para Testes)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleMockState('PARTICIPANTE')}
              className="text-xs border-[#3a3a2a] bg-transparent text-[#dbcec7] hover:bg-[#323714] hover:text-[#dbcec7] hover:border-[#5e6533]"
            >
              Adulto Padrao
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleMockState('CRIANCA')}
              className="text-xs border-[#3a3a2a] bg-transparent text-[#dbcec7] hover:bg-[#323714] hover:text-[#dbcec7] hover:border-[#5e6533]"
            >
              Crianca (&lt;16)
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleMockState('VOLUNTARIO')}
              className="text-xs border-[#3a3a2a] bg-transparent text-[#dbcec7] hover:bg-[#323714] hover:text-[#dbcec7] hover:border-[#5e6533]"
            >
              Voluntario
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleMockState('PALESTRANTE')}
              className="text-xs border-[#3a3a2a] bg-transparent text-[#dbcec7] hover:bg-[#323714] hover:text-[#dbcec7] hover:border-[#5e6533]"
            >
              Palestrante
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={onNext} 
          disabled={!canProceed}
          size="lg"
          className="px-8 bg-[#bf6237] hover:bg-[#6f3b23] text-[#161616] font-semibold disabled:bg-[#3a3a2a] disabled:text-[#bea79c]"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
