import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { getEnabledModels } from '../data/iphoneModels';
import { SITE_CONFIG } from '../data/siteConfig';
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppUrl,
  calculateCartTotals,
  formatArsPrice,
} from '../services/orderService';
import { CartItem, CustomerOrderInfo } from '../types/store';
import { CaseArtworkPreview } from './CaseArtworkPreview';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onChangeModel: (cartItemId: string, newModelId: string) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

type CheckoutStep = 'cart' | 'form' | 'confirmed';

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onChangeModel,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [customer, setCustomer] = useState<CustomerOrderInfo>({
    fullName: '',
    phone: '',
    zone: '',
    address: '',
    notes: '',
  });
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');

  const enabledModels = useMemo(() => getEnabledModels(), []);
  const totals = useMemo(() => calculateCartTotals(items), [items]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (step === 'confirmed') {
      setStep('cart');
    }
    onClose();
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName.trim() || !customer.phone.trim() || !customer.zone.trim()) {
      return;
    }

    const msg = buildWhatsAppOrderMessage(items, customer, totals);
    setGeneratedMessage(msg);
    setStep('confirmed');

    const waUrl = buildWhatsAppUrl(msg);
    if (waUrl) {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopiedMessage(true);
      window.setTimeout(() => setCopiedMessage(false), 2000);
    } catch {
      // Fallback ignored if clipboard is unavailable
    }
  };

  const waUrl = generatedMessage ? buildWhatsAppUrl(generatedMessage) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compras"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[#1C1A17]/45 backdrop-blur-[2px] transition-opacity"
      />

      {/* Drawer panel */}
      <div className="relative z-10 w-full max-w-lg bg-[#F7F4EE] h-full flex flex-col border-l border-[#E2DBD0] shadow-2xl">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#E2DBD0] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {step === 'form' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                aria-label="Volver al detalle del carrito"
                className="p-1.5 rounded-md text-[#5C574E] hover:text-[#1C1A17] hover:bg-[#EFEAE0] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-xl font-semibold text-[#1C1A17]">
              {step === 'cart'
                ? 'Tu carrito'
                : step === 'form'
                  ? 'Datos de entrega'
                  : 'Pedido listo para confirmar'}
            </h2>
            {step === 'cart' && (
              <span className="tabular-nums text-xs text-[#5C574E]">
                ({totals.totalUnits} {totals.totalUnits === 1 ? 'unidad' : 'unidades'})
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar carrito"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#5C574E] hover:text-[#1C1A17] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
          {step === 'cart' && items.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full bg-[#EFEAE0] flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-[#C6A15B]" aria-hidden="true" />
              </div>
              <p className="font-display text-lg font-medium text-[#1C1A17]">
                Tu carrito está vacío
              </p>
              <p className="mt-1.5 text-sm text-[#5C574E] max-w-xs">
                Elegí un diseño de la colección y seleccioná tu modelo de iPhone para armar tu
                pedido.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-6 px-5 py-2.5 rounded-lg bg-[#1C1A17] text-[#F7F4EE] text-sm font-medium hover:bg-[#332F2A] transition-colors cursor-pointer"
              >
                Explorar diseños
              </button>
            </div>
          )}

          {step === 'cart' && items.length > 0 && (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="rounded-xl border border-[#E2DBD0] bg-[#FBF9F5] p-4 flex gap-4"
                >
                  <div className="w-20 h-24 rounded-lg border border-[#E2DBD0] overflow-hidden shrink-0">
                    <CaseArtworkPreview
                      title={item.productName}
                      imageUrl={item.imageUrl}
                      hasRealPhoto={Boolean(item.imageUrl)}
                      artworkVariant={item.artworkVariant}
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-[#1C1A17] truncate">
                          {item.productName}
                        </p>
                        <p className="text-xs text-[#5C574E]">{item.collection}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartItemId)}
                        aria-label={`Eliminar ${item.productName} (${item.modelName})`}
                        className="p-1 text-[#5C574E] hover:text-[#8B3A2B] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Changeable iPhone model selector */}
                    <div>
                      <label
                        htmlFor={`cart-model-${item.cartItemId}`}
                        className="sr-only"
                      >
                        Modelo de iPhone para {item.productName}
                      </label>
                      <select
                        id={`cart-model-${item.cartItemId}`}
                        value={item.modelId}
                        onChange={(e) => onChangeModel(item.cartItemId, e.target.value)}
                        className="w-full h-8 px-2 rounded-md border border-[#D8D0C0] bg-[#F7F4EE] text-xs text-[#1C1A17] focus:outline-none focus:border-[#C6A15B]"
                      >
                        {enabledModels.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <div className="inline-flex items-center border border-[#D8D0C0] rounded-md bg-[#F7F4EE]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          aria-label="Restar unidad"
                          className="w-7 h-7 flex items-center justify-center text-[#1C1A17] hover:bg-[#EFEAE0] cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="tabular-nums w-7 text-center text-xs font-semibold text-[#1C1A17]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          aria-label="Sumar unidad"
                          className="w-7 h-7 flex items-center justify-center text-[#1C1A17] hover:bg-[#EFEAE0] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="tabular-nums text-sm font-semibold text-[#1C1A17]">
                          {item.unitPrice !== null
                            ? formatArsPrice(item.unitPrice * item.quantity)
                            : 'A definir'}
                        </p>
                        {item.isDemoData && (
                          <p className="text-[10px] text-[#5C574E]">Precio demo</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Multi-buy promo feedback */}
              {totals.qualifiesMultiBuyPromo ? (
                <div className="rounded-xl border border-[#C6A15B]/60 bg-[#EFEAE0] p-3.5 text-xs text-[#1C1A17]">
                  <p className="font-semibold">Beneficio por 2 o más fundas aplicado</p>
                  <p className="mt-1 text-[#5C574E]">
                    {totals.discountAmount > 0
                      ? `Ahorro calculado: -${formatArsPrice(totals.discountAmount)}.`
                      : 'Llevando 2 o más unidades accedés al beneficio especial, que confirmamos al cerrar tu pedido por WhatsApp.'}
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-[#E2DBD0] bg-[#EFEAE0]/50 p-3.5 text-xs text-[#5C574E]">
                  Sumando una funda más accedés al beneficio especial por compra de dos unidades.
                </div>
              )}
            </div>
          )}

          {step === 'form' && (
            <form id="checkout-order-form" onSubmit={handleConfirmOrder} className="space-y-4">
              <p className="text-xs text-[#5C574E] leading-relaxed">
                Completá tus datos para generar el resumen de tu pedido y confirmarlo directamente
                por WhatsApp. El pago se realiza por transferencia bancaria.
              </p>

              <div>
                <label
                  htmlFor="order-fullname"
                  className="block text-xs font-medium text-[#5C574E] mb-1.5"
                >
                  Nombre y apellido *
                </label>
                <input
                  id="order-fullname"
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="Ej: Martín González"
                  className="w-full h-11 px-3.5 rounded-lg border border-[#D8D0C0] bg-[#FBF9F5] text-sm text-[#1C1A17] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label
                  htmlFor="order-phone"
                  className="block text-xs font-medium text-[#5C574E] mb-1.5"
                >
                  Teléfono / WhatsApp *
                </label>
                <input
                  id="order-phone"
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="Ej: 11 1234-5678"
                  className="w-full h-11 px-3.5 rounded-lg border border-[#D8D0C0] bg-[#FBF9F5] text-sm text-[#1C1A17] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label
                  htmlFor="order-zone"
                  className="block text-xs font-medium text-[#5C574E] mb-1.5"
                >
                  Zona / Localidad *
                </label>
                <input
                  id="order-zone"
                  type="text"
                  required
                  value={customer.zone}
                  onChange={(e) => setCustomer({ ...customer, zone: e.target.value })}
                  placeholder="Ej: Ramos Mejía, Zona Oeste / Palermo, CABA"
                  className="w-full h-11 px-3.5 rounded-lg border border-[#D8D0C0] bg-[#FBF9F5] text-sm text-[#1C1A17] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label
                  htmlFor="order-address"
                  className="block text-xs font-medium text-[#5C574E] mb-1.5"
                >
                  Dirección o preferencia de retiro
                </label>
                <input
                  id="order-address"
                  type="text"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="Calle, altura o si preferís coordinar punto de retiro"
                  className="w-full h-11 px-3.5 rounded-lg border border-[#D8D0C0] bg-[#FBF9F5] text-sm text-[#1C1A17] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label
                  htmlFor="order-notes"
                  className="block text-xs font-medium text-[#5C574E] mb-1.5"
                >
                  Notas adicionales (opcional)
                </label>
                <textarea
                  id="order-notes"
                  rows={2}
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="Horarios de entrega o aclaraciones..."
                  className="w-full p-3 rounded-lg border border-[#D8D0C0] bg-[#FBF9F5] text-sm text-[#1C1A17] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="rounded-xl border border-[#E2DBD0] bg-[#EFEAE0]/60 p-3.5 text-xs text-[#5C574E] space-y-1">
                <p className="font-semibold text-[#1C1A17]">Cómo sigue tu compra:</p>
                <p>1. Enviás el detalle del pedido por WhatsApp.</p>
                <p>2. Recibís los datos para transferir el importe correspondiente.</p>
                <p>3. Nos enviás el comprobante por el mismo chat y coordinamos la entrega.</p>
              </div>
            </form>
          )}

          {step === 'confirmed' && (
            <div className="space-y-5">
              <div className="rounded-xl border border-[#8EC9E8] bg-[#8EC9E8]/15 p-4 text-sm text-[#1C1A17]">
                <p className="font-semibold">Detalle generado para WhatsApp</p>
                <p className="mt-1 text-xs text-[#5C574E] leading-relaxed">
                  {waUrl
                    ? 'Si no se abrió WhatsApp automáticamente, podés usar el botón de abajo o copiar el mensaje.'
                    : `El número de WhatsApp oficial aún figura como "${SITE_CONFIG.contact.whatsappDisplay}". Podés copiar el mensaje armado acá abajo para enviarlo apenas esté vinculado.`}
                </p>
              </div>

              <div className="rounded-xl border border-[#E2DBD0] bg-[#FBF9F5] p-4">
                <p className="text-xs font-semibold text-[#1C1A17] mb-2">
                  Resumen listo para enviar:
                </p>
                <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#5C574E]">
                  {generatedMessage}
                </pre>
              </div>

              <div className="space-y-2.5">
                {waUrl && (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-11 rounded-lg bg-[#1C1A17] text-[#F7F4EE] text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-[#332F2A] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#8EC9E8]" aria-hidden="true" />
                    <span>Abrir pedido en WhatsApp</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="w-full h-11 rounded-lg border border-[#D4CBB8] bg-[#FBF9F5] text-[#1C1A17] text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-[#EFEAE0] transition-colors cursor-pointer"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Resumen copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                      <span>Copiar resumen del pedido</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClearCart();
                    setStep('cart');
                    onClose();
                  }}
                  className="w-full h-10 text-xs font-medium text-[#5C574E] hover:text-[#1C1A17] cursor-pointer"
                >
                  Vaciar carrito y volver a la tienda
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer totals & CTA */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="px-5 sm:px-6 py-4 border-t border-[#E2DBD0] bg-[#EFEAE0]/50 space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between text-[#5C574E]">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#1C1A17]">
                  {totals.hasUnpricedItems && totals.pricedSubtotal === 0
                    ? 'A definir'
                    : formatArsPrice(totals.pricedSubtotal)}
                </span>
              </div>

              {totals.qualifiesMultiBuyPromo && (
                <div className="flex items-center justify-between text-xs text-[#5C574E]">
                  <span>Beneficio por 2+ fundas</span>
                  <span className="tabular-nums font-medium text-[#1C1A17]">
                    {totals.discountAmount > 0
                      ? `-${formatArsPrice(totals.discountAmount)}`
                      : 'A confirmar en chat'}
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-[#D8D0C0] flex items-center justify-between text-base font-semibold text-[#1C1A17]">
                <span>Total estimado</span>
                <span className="tabular-nums">
                  {totals.hasUnpricedItems
                    ? totals.pricedSubtotal > 0
                      ? `${formatArsPrice(totals.estimatedTotal)} + art. a definir`
                      : 'A confirmar por WhatsApp'
                    : formatArsPrice(totals.estimatedTotal)}
                </span>
              </div>

              {(totals.hasDemoPrices || totals.hasUnpricedItems) && (
                <p className="text-[11px] text-[#5C574E]">
                  Incluye artículos con precio de demostración o pendiente de confirmación final.
                </p>
              )}
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full h-12 rounded-lg bg-[#1C1A17] text-[#F7F4EE] text-sm sm:text-base font-medium hover:bg-[#332F2A] transition-colors cursor-pointer"
              >
                Continuar con el pedido
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-order-form"
                className="w-full h-12 rounded-lg bg-[#1C1A17] text-[#F7F4EE] text-sm sm:text-base font-medium inline-flex items-center justify-center gap-2 hover:bg-[#332F2A] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#8EC9E8]" aria-hidden="true" />
                <span>Confirmar pedido por WhatsApp</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
