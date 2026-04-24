'use client'

import { ShoppingBag, Plus, Minus, Ticket, Shirt, Package, Utensils } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { CheckoutState, CartItem } from '@/lib/checkout-types'
import { MOCK_PRODUCTS, formatCurrency } from '@/lib/checkout-mock-data'

interface StepProductsProps {
  state: CheckoutState
  onUpdate: (updates: Partial<CheckoutState>) => void
  onNext: () => void
  onBack: () => void
}

const getProductIcon = (tipo: string) => {
  switch (tipo) {
    case 'INGRESSO':
      return Ticket
    case 'CAMISETA':
      return Shirt
    case 'KIT':
      return Package
    case 'ALIMENTACAO':
      return Utensils
    default:
      return ShoppingBag
  }
}

export function StepProducts({ state, onUpdate, onNext, onBack }: StepProductsProps) {
  const updateCart = (productId: string, variantId: string | undefined, quantidade: number, nome: string, preco: number) => {
    const existingIndex = state.cart.findIndex(
      item => item.productId === productId && item.variantId === variantId
    )

    let newCart: CartItem[]

    if (quantidade === 0) {
      newCart = state.cart.filter((_, index) => index !== existingIndex)
    } else if (existingIndex >= 0) {
      newCart = state.cart.map((item, index) =>
        index === existingIndex ? { ...item, quantidade } : item
      )
    } else {
      newCart = [
        ...state.cart,
        {
          productId,
          variantId,
          nome,
          quantidade,
          precoUnitario: preco,
        },
      ]
    }

    onUpdate({ cart: newCart })
  }

  const getItemQuantity = (productId: string, variantId?: string): number => {
    const item = state.cart.find(
      i => i.productId === productId && i.variantId === variantId
    )
    return item?.quantidade || 0
  }

  const getSelectedVariant = (productId: string): string | undefined => {
    const item = state.cart.find(i => i.productId === productId)
    return item?.variantId
  }

  const calculateSubtotal = (): number => {
    return state.cart.reduce((sum, item) => sum + item.precoUnitario * item.quantidade, 0)
  }

  const subtotal = calculateSubtotal()
  const hasItems = state.cart.length > 0

  return (
    <div className="space-y-6">
      <Card className="border-[#3a3a2a] bg-[#1e1e1e]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#dbcec7]">
            <ShoppingBag className="h-5 w-5 text-[#bf6237]" />
            Produtos e Ingressos
          </CardTitle>
          <CardDescription className="text-[#bea79c]">
            Selecione os itens que deseja adicionar a sua inscricao.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {MOCK_PRODUCTS.map((product) => {
            const Icon = getProductIcon(product.tipo)
            const hasVariants = product.variantes && product.variantes.length > 0
            const quantity = getItemQuantity(product.id, getSelectedVariant(product.id))
            const selectedVariantId = getSelectedVariant(product.id)
            const selectedVariant = product.variantes?.find(v => v.id === selectedVariantId)
            const currentPrice = selectedVariant?.preco || product.preco

            return (
              <div
                key={product.id}
                className={`p-4 rounded-lg border transition-all ${
                  quantity > 0
                    ? 'border-[#bf6237]/50 bg-[#6f3b23]/20'
                    : 'border-[#3a3a2a] hover:border-[#5e6533]'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Product Info */}
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-[#323714]">
                      <Icon className="h-5 w-5 text-[#dbcec7]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#dbcec7]">{product.nome}</h4>
                      <p className="text-sm text-[#bea79c]">{product.descricao}</p>
                      <p className="text-lg font-bold text-[#bf6237] mt-1">
                        {formatCurrency(currentPrice)}
                      </p>
                    </div>
                  </div>

                  {/* Variant Selection & Quantity */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    {hasVariants && (
                      <Select
                        value={selectedVariantId || ''}
                        onValueChange={(variantId) => {
                          const variant = product.variantes?.find(v => v.id === variantId)
                          if (variant) {
                            const oldItem = state.cart.find(i => i.productId === product.id)
                            if (oldItem) {
                              updateCart(product.id, variantId, oldItem.quantidade, `${product.nome} - ${variant.nome}`, variant.preco)
                              if (oldItem.variantId !== variantId) {
                                const newCart = state.cart.filter(i => !(i.productId === product.id && i.variantId === oldItem.variantId))
                                onUpdate({ cart: newCart })
                              }
                            }
                          }
                        }}
                      >
                        <SelectTrigger className="w-[140px] bg-[#252512] border-[#3a3a2a] text-[#dbcec7]">
                          <SelectValue placeholder="Tamanho" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e1e1e] border-[#3a3a2a]">
                          {product.variantes?.map((variant) => (
                            <SelectItem 
                              key={variant.id} 
                              value={variant.id}
                              className="text-[#dbcec7] focus:bg-[#323714] focus:text-[#dbcec7]"
                            >
                              {variant.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-[#3a3a2a] bg-transparent text-[#dbcec7] hover:bg-[#323714] hover:text-[#dbcec7]"
                        onClick={() => {
                          const variantId = hasVariants ? selectedVariantId : undefined
                          const variant = product.variantes?.find(v => v.id === variantId)
                          const price = variant?.preco || product.preco
                          const name = variant ? `${product.nome} - ${variant.nome}` : product.nome
                          
                          if (quantity > 0) {
                            updateCart(product.id, variantId, quantity - 1, name, price)
                          }
                        }}
                        disabled={quantity === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="w-8 text-center font-semibold text-[#dbcec7]">
                        {quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-[#3a3a2a] bg-transparent text-[#dbcec7] hover:bg-[#323714] hover:text-[#dbcec7]"
                        onClick={() => {
                          if (hasVariants && !selectedVariantId) {
                            const firstVariant = product.variantes![0]
                            updateCart(
                              product.id,
                              firstVariant.id,
                              1,
                              `${product.nome} - ${firstVariant.nome}`,
                              firstVariant.preco
                            )
                          } else {
                            const variantId = hasVariants ? selectedVariantId : undefined
                            const variant = product.variantes?.find(v => v.id === variantId)
                            const price = variant?.preco || product.preco
                            const name = variant ? `${product.nome} - ${variant.nome}` : product.nome
                            updateCart(product.id, variantId, quantity + 1, name, price)
                          }
                        }}
                        disabled={quantity >= 10}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {quantity > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#3a3a2a]/50 flex justify-between items-center">
                    <span className="text-sm text-[#bea79c]">
                      {quantity}x {formatCurrency(currentPrice)}
                    </span>
                    <span className="font-semibold text-[#dbcec7]">
                      {formatCurrency(currentPrice * quantity)}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Cart Summary */}
      {hasItems && (
        <Card className="border-[#bf6237]/50 bg-[#6f3b23]/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#bea79c]">
                  {state.cart.reduce((sum, item) => sum + item.quantidade, 0)} item(ns) selecionado(s)
                </p>
                <p className="text-xl font-bold text-[#dbcec7]">
                  Subtotal: {formatCurrency(subtotal)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
          disabled={!hasItems} 
          size="lg" 
          className="px-8 bg-[#bf6237] hover:bg-[#6f3b23] text-[#161616] font-semibold disabled:bg-[#3a3a2a] disabled:text-[#bea79c]"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
