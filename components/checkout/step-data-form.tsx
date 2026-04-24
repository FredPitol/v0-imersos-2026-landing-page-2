'use client'

import { useState } from 'react'
import { User, Search, Loader2, CheckCircle, MapPin, Mic, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { CheckoutState } from '@/lib/checkout-types'
import { formatCpf, formatPhone, formatCep, findGuardian } from '@/lib/checkout-mock-data'

interface StepDataFormProps {
  state: CheckoutState
  onUpdate: (updates: Partial<CheckoutState>) => void
  onNext: () => void
  onBack: () => void
}

export function StepDataForm({ state, onUpdate, onNext, onBack }: StepDataFormProps) {
  const [guardianCpf, setGuardianCpf] = useState('')
  const [isSearchingGuardian, setIsSearchingGuardian] = useState(false)
  const [guardianFound, setGuardianFound] = useState(false)

  const updatePerson = (field: string, value: string) => {
    onUpdate({
      person: {
        ...state.person,
        [field]: value,
      },
    })
  }

  const updateAddress = (field: string, value: string) => {
    onUpdate({
      person: {
        ...state.person,
        endereco: {
          ...state.person.endereco,
          [field]: value,
        },
      },
    })
  }

  const updateGuardian = (field: string, value: string) => {
    onUpdate({
      guardian: {
        ...state.guardian,
        [field]: value,
      },
    })
  }

  const updateSpeaker = (field: string, value: string) => {
    onUpdate({
      speaker: {
        ...state.speaker,
        [field]: value,
      },
    })
  }

  const handleSearchGuardian = async () => {
    if (guardianCpf.length !== 14) return

    setIsSearchingGuardian(true)
    await new Promise(resolve => setTimeout(resolve, 800))

    const guardian = findGuardian(guardianCpf)
    if (guardian) {
      onUpdate({ guardian })
      setGuardianFound(true)
    } else {
      setGuardianFound(false)
      onUpdate({ 
        guardian: { 
          cpf: guardianCpf,
          nome: '',
          email: '',
          telefone: '',
          parentesco: ''
        } 
      })
    }

    setIsSearchingGuardian(false)
  }

  const isFormValid = () => {
    const hasPerson = state.person.nome && state.person.email && state.person.telefone

    if (state.registrationType === 'CRIANCA') {
      return hasPerson && state.guardian?.nome && state.guardian?.email && state.guardian?.parentesco
    }

    if (state.registrationType === 'VOLUNTARIO' || state.registrationType === 'PALESTRANTE') {
      return true
    }

    return hasPerson
  }

  // Common input styles
  const inputClassName = "bg-[#252512] border-[#3a3a2a] text-[#dbcec7] placeholder:text-[#bea79c]/50 focus:border-[#bf6237] focus:ring-[#bf6237]"

  // Render Child Flow
  if (state.registrationType === 'CRIANCA') {
    return (
      <div className="space-y-6">
        {/* Child Data */}
        <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#dbcec7]">
              <User className="h-5 w-5 text-[#bf6237]" />
              Dados do Menor
            </CardTitle>
            <CardDescription className="text-[#bea79c]">
              Preencha os dados do participante menor de 16 anos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-[#dbcec7]">Nome Completo</Label>
                <Input
                  id="nome"
                  placeholder="Nome do menor"
                  value={state.person.nome || ''}
                  onChange={(e) => updatePerson('nome', e.target.value)}
                  className={inputClassName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#dbcec7]">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={state.person.email || ''}
                  onChange={(e) => updatePerson('email', e.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone" className="text-[#dbcec7]">Telefone</Label>
              <Input
                id="telefone"
                placeholder="(00) 00000-0000"
                value={state.person.telefone || ''}
                onChange={(e) => updatePerson('telefone', formatPhone(e.target.value))}
                maxLength={15}
                className={inputClassName}
              />
            </div>
          </CardContent>
        </Card>

        {/* Guardian Search */}
        <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#dbcec7]">
              <Users className="h-5 w-5 text-[#bf6237]" />
              Responsavel Legal
            </CardTitle>
            <CardDescription className="text-[#bea79c]">
              Busque o responsavel pelo CPF ou preencha os dados manualmente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="CPF do Responsavel"
                  value={guardianCpf}
                  onChange={(e) => {
                    setGuardianCpf(formatCpf(e.target.value))
                    setGuardianFound(false)
                  }}
                  maxLength={14}
                  className={inputClassName}
                />
              </div>
              <Button 
                onClick={handleSearchGuardian}
                disabled={guardianCpf.length !== 14 || isSearchingGuardian}
                className="bg-[#323714] hover:bg-[#5e6533] text-[#dbcec7]"
              >
                {isSearchingGuardian ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>

            {guardianFound && state.guardian?.nome && (
              <div className="p-4 rounded-lg bg-[#323714]/30 border border-[#5e6533]">
                <div className="flex items-center gap-2 text-[#5e6533] mb-2">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium text-[#dbcec7]">Responsavel encontrado!</span>
                </div>
                <p className="text-[#dbcec7] font-medium">{state.guardian.nome}</p>
                <p className="text-sm text-[#bea79c]">{state.guardian.email}</p>
                <p className="text-sm text-[#bea79c]">{state.guardian.telefone}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guardianNome" className="text-[#dbcec7]">Nome do Responsavel</Label>
                <Input
                  id="guardianNome"
                  placeholder="Nome completo"
                  value={state.guardian?.nome || ''}
                  onChange={(e) => updateGuardian('nome', e.target.value)}
                  className={inputClassName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardianEmail" className="text-[#dbcec7]">E-mail do Responsavel</Label>
                <Input
                  id="guardianEmail"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={state.guardian?.email || ''}
                  onChange={(e) => updateGuardian('email', e.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guardianTelefone" className="text-[#dbcec7]">Telefone do Responsavel</Label>
                <Input
                  id="guardianTelefone"
                  placeholder="(00) 00000-0000"
                  value={state.guardian?.telefone || ''}
                  onChange={(e) => updateGuardian('telefone', formatPhone(e.target.value))}
                  maxLength={15}
                  className={inputClassName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentesco" className="text-[#dbcec7]">Parentesco</Label>
                <Select 
                  value={state.guardian?.parentesco || ''} 
                  onValueChange={(value) => updateGuardian('parentesco', value)}
                >
                  <SelectTrigger className={inputClassName}>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e1e1e] border-[#3a3a2a]">
                    <SelectItem value="pai" className="text-[#dbcec7] focus:bg-[#323714] focus:text-[#dbcec7]">Pai</SelectItem>
                    <SelectItem value="mae" className="text-[#dbcec7] focus:bg-[#323714] focus:text-[#dbcec7]">Mae</SelectItem>
                    <SelectItem value="avo" className="text-[#dbcec7] focus:bg-[#323714] focus:text-[#dbcec7]">Avo/Avo</SelectItem>
                    <SelectItem value="tio" className="text-[#dbcec7] focus:bg-[#323714] focus:text-[#dbcec7]">Tio/Tia</SelectItem>
                    <SelectItem value="responsavel_legal" className="text-[#dbcec7] focus:bg-[#323714] focus:text-[#dbcec7]">Responsavel Legal</SelectItem>
                    <SelectItem value="outro" className="text-[#dbcec7] focus:bg-[#323714] focus:text-[#dbcec7]">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            disabled={!isFormValid()} 
            size="lg" 
            className="px-8 bg-[#bf6237] hover:bg-[#6f3b23] text-[#161616] font-semibold disabled:bg-[#3a3a2a] disabled:text-[#bea79c]"
          >
            Continuar
          </Button>
        </div>
      </div>
    )
  }

  // Render Volunteer Flow
  if (state.registrationType === 'VOLUNTARIO' && state.volunteer) {
    return (
      <div className="space-y-6">
        <Card className="border-[#5e6533] bg-[#323714]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#dbcec7]">
              <CheckCircle className="h-5 w-5 text-[#5e6533]" />
              Voluntario Pre-Cadastrado
            </CardTitle>
            <CardDescription className="text-[#bea79c]">
              Confirme seus dados abaixo. Eles foram preenchidos automaticamente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-[#bea79c] text-xs">Nome</Label>
                <p className="font-medium text-[#dbcec7]">{state.volunteer.nome}</p>
              </div>
              <div>
                <Label className="text-[#bea79c] text-xs">CPF</Label>
                <p className="font-medium text-[#dbcec7]">{state.volunteer.cpf}</p>
              </div>
              <div>
                <Label className="text-[#bea79c] text-xs">E-mail</Label>
                <p className="font-medium text-[#dbcec7]">{state.volunteer.email}</p>
              </div>
              <div>
                <Label className="text-[#bea79c] text-xs">Telefone</Label>
                <p className="font-medium text-[#dbcec7]">{state.volunteer.telefone}</p>
              </div>
              <div>
                <Label className="text-[#bea79c] text-xs">Area de Atuacao</Label>
                <p className="font-medium text-[#dbcec7]">{state.volunteer.areaAtuacao}</p>
              </div>
              <div>
                <Label className="text-[#bea79c] text-xs">Experiencia</Label>
                <p className="font-medium text-[#dbcec7]">{state.volunteer.experiencia}</p>
              </div>
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
            size="lg" 
            className="px-8 bg-[#bf6237] hover:bg-[#6f3b23] text-[#161616] font-semibold"
          >
            Confirmar e Continuar
          </Button>
        </div>
      </div>
    )
  }

  // Render Speaker Flow
  if (state.registrationType === 'PALESTRANTE' && state.speaker) {
    return (
      <div className="space-y-6">
        <Card className="border-[#bf6237]/50 bg-[#6f3b23]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#dbcec7]">
              <Mic className="h-5 w-5 text-[#bf6237]" />
              Palestrante Pre-Cadastrado
            </CardTitle>
            <CardDescription className="text-[#bea79c]">
              Confirme seus dados abaixo. Voce pode editar as informacoes da palestra.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-[#bea79c] text-xs">Nome</Label>
                <p className="font-medium text-[#dbcec7]">{state.speaker.nome}</p>
              </div>
              <div>
                <Label className="text-[#bea79c] text-xs">CPF</Label>
                <p className="font-medium text-[#dbcec7]">{state.speaker.cpf}</p>
              </div>
              <div>
                <Label className="text-[#bea79c] text-xs">E-mail</Label>
                <p className="font-medium text-[#dbcec7]">{state.speaker.email}</p>
              </div>
              <div>
                <Label className="text-[#bea79c] text-xs">Telefone</Label>
                <p className="font-medium text-[#dbcec7]">{state.speaker.telefone}</p>
              </div>
              <div className="md:col-span-2">
                <Label className="text-[#bea79c] text-xs">Instituicao</Label>
                <p className="font-medium text-[#dbcec7]">{state.speaker.instituicao}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#3a3a2a]">
              <h4 className="font-semibold text-[#dbcec7] mb-4">Informacoes da Palestra</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tema" className="text-[#dbcec7]">Tema</Label>
                  <Input
                    id="tema"
                    value={state.speaker.tema || ''}
                    onChange={(e) => updateSpeaker('tema', e.target.value)}
                    className={inputClassName}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-[#dbcec7]">Bio</Label>
                  <textarea
                    id="bio"
                    value={state.speaker.bio || ''}
                    onChange={(e) => updateSpeaker('bio', e.target.value)}
                    className="w-full min-h-[100px] rounded-md border border-[#3a3a2a] bg-[#252512] px-3 py-2 text-sm text-[#dbcec7] placeholder:text-[#bea79c]/50 focus:border-[#bf6237] focus:ring-[#bf6237] focus:outline-none"
                    placeholder="Breve biografia..."
                  />
                </div>
              </div>
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
            size="lg" 
            className="px-8 bg-[#bf6237] hover:bg-[#6f3b23] text-[#161616] font-semibold"
          >
            Confirmar e Continuar
          </Button>
        </div>
      </div>
    )
  }

  // Render Standard Participant Flow
  return (
    <div className="space-y-6">
      <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#dbcec7]">
            <User className="h-5 w-5 text-[#bf6237]" />
            Dados Pessoais
          </CardTitle>
          <CardDescription className="text-[#bea79c]">
            Preencha seus dados para a inscricao.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-[#dbcec7]">Nome Completo</Label>
              <Input
                id="nome"
                placeholder="Seu nome completo"
                value={state.person.nome || ''}
                onChange={(e) => updatePerson('nome', e.target.value)}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#dbcec7]">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                value={state.person.email || ''}
                onChange={(e) => updatePerson('email', e.target.value)}
                className={inputClassName}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone" className="text-[#dbcec7]">Telefone</Label>
            <Input
              id="telefone"
              placeholder="(00) 00000-0000"
              value={state.person.telefone || ''}
              onChange={(e) => updatePerson('telefone', formatPhone(e.target.value))}
              maxLength={15}
              className={inputClassName}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#dbcec7]">
            <MapPin className="h-5 w-5 text-[#bf6237]" />
            Endereco
          </CardTitle>
          <CardDescription className="text-[#bea79c]">
            Opcional, mas ajuda na organizacao do evento.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cep" className="text-[#dbcec7]">CEP</Label>
              <Input
                id="cep"
                placeholder="00000-000"
                value={state.person.endereco?.cep || ''}
                onChange={(e) => updateAddress('cep', formatCep(e.target.value))}
                maxLength={9}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="logradouro" className="text-[#dbcec7]">Logradouro</Label>
              <Input
                id="logradouro"
                placeholder="Rua, Avenida..."
                value={state.person.endereco?.logradouro || ''}
                onChange={(e) => updateAddress('logradouro', e.target.value)}
                className={inputClassName}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numero" className="text-[#dbcec7]">Numero</Label>
              <Input
                id="numero"
                placeholder="123"
                value={state.person.endereco?.numero || ''}
                onChange={(e) => updateAddress('numero', e.target.value)}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complemento" className="text-[#dbcec7]">Complemento</Label>
              <Input
                id="complemento"
                placeholder="Apto, Bloco..."
                value={state.person.endereco?.complemento || ''}
                onChange={(e) => updateAddress('complemento', e.target.value)}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bairro" className="text-[#dbcec7]">Bairro</Label>
              <Input
                id="bairro"
                placeholder="Bairro"
                value={state.person.endereco?.bairro || ''}
                onChange={(e) => updateAddress('bairro', e.target.value)}
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cidade" className="text-[#dbcec7]">Cidade</Label>
              <Input
                id="cidade"
                placeholder="Cidade"
                value={state.person.endereco?.cidade || ''}
                onChange={(e) => updateAddress('cidade', e.target.value)}
                className={inputClassName}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estado" className="text-[#dbcec7]">Estado</Label>
              <Select 
                value={state.person.endereco?.estado || ''} 
                onValueChange={(value) => updateAddress('estado', value)}
              >
                <SelectTrigger className={inputClassName}>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e1e1e] border-[#3a3a2a] max-h-[200px]">
                  {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map((uf) => (
                    <SelectItem key={uf} value={uf} className="text-[#dbcec7] focus:bg-[#323714] focus:text-[#dbcec7]">{uf}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
          disabled={!isFormValid()} 
          size="lg" 
          className="px-8 bg-[#bf6237] hover:bg-[#6f3b23] text-[#161616] font-semibold disabled:bg-[#3a3a2a] disabled:text-[#bea79c]"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
