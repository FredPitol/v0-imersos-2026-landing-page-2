'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, User, FileText, ShoppingBag, CreditCard, ClipboardList } from 'lucide-react'
import { StepIdentification } from './step-identification'
import { StepDataForm } from './step-data-form'
import { StepProducts } from './step-products'
import { StepSummary } from './step-summary'
import { StepPayment } from './step-payment'
import type { CheckoutState } from '@/lib/checkout-types'
import { CHECKOUT_STEPS } from '@/lib/checkout-types'

const STEP_ICONS = [User, FileText, ShoppingBag, ClipboardList, CreditCard]

const initialState: CheckoutState = {
  currentStep: 1,
  registrationType: null,
  isChild: false,
  cpf: '',
  dataNascimento: '',
  person: {},
  guardian: null,
  speaker: null,
  volunteer: null,
  cart: [],
  coupon: '',
  discount: 0,
  payment: {},
  termsAccepted: false,
}

export function CheckoutWizard() {
  const router = useRouter()
  const [state, setState] = useState<CheckoutState>(initialState)

  const updateState = (updates: Partial<CheckoutState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    const subtotal = state.cart.reduce((sum, item) => sum + item.precoUnitario * item.quantidade, 0)
    const isCourtesy = state.discount >= subtotal && state.discount > 0
    
    if (state.currentStep === 4 && isCourtesy) {
      setState((prev) => ({ ...prev, currentStep: 5 }))
    } else {
      setState((prev) => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 5) }))
    }
  }

  const prevStep = () => {
    setState((prev) => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 1) }))
  }

  const handleComplete = () => {
    router.push('/')
  }

  const subtotal = state.cart.reduce((sum, item) => sum + item.precoUnitario * item.quantidade, 0)
  const isCourtesy = state.discount >= subtotal && state.discount > 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#161616]/95 backdrop-blur border-b border-[#3a3a2a]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BRASAO-p4HmzUtmUTpqQe0xNy8FIKttyBxocr.png" 
                alt="Imersos Logo" 
                className="h-10 w-auto"
              />
            </a>
            <h1 className="text-lg font-semibold text-[#dbcec7]">Inscricao</h1>
          </div>
        </div>
      </header>

      {/* Progress Stepper */}
      <div className="bg-[#1e1e1e] border-b border-[#3a3a2a]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {CHECKOUT_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index]
              const isActive = state.currentStep === step.id
              const isCompleted = state.currentStep > step.id

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        isActive
                          ? 'border-[#bf6237] bg-[#bf6237] text-[#161616]'
                          : isCompleted
                          ? 'border-[#5e6533] bg-[#323714] text-[#dbcec7]'
                          : 'border-[#3a3a2a] bg-[#252512] text-[#bea79c]'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium hidden sm:block ${
                        isActive ? 'text-[#bf6237]' : isCompleted ? 'text-[#dbcec7]' : 'text-[#bea79c]'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {index < CHECKOUT_STEPS.length - 1 && (
                    <div
                      className={`w-8 sm:w-16 md:w-24 h-0.5 mx-2 ${
                        isCompleted ? 'bg-[#5e6533]' : 'bg-[#3a3a2a]'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {state.currentStep === 1 && (
            <StepIdentification
              state={state}
              onUpdate={updateState}
              onNext={nextStep}
            />
          )}

          {state.currentStep === 2 && (
            <StepDataForm
              state={state}
              onUpdate={updateState}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {state.currentStep === 3 && (
            <StepProducts
              state={state}
              onUpdate={updateState}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {state.currentStep === 4 && (
            <StepSummary
              state={state}
              onUpdate={updateState}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {state.currentStep === 5 && (
            <StepPayment
              state={state}
              onUpdate={updateState}
              onBack={prevStep}
              onComplete={handleComplete}
              isCourtesy={isCourtesy}
            />
          )}
        </div>
      </main>
    </div>
  )
}
