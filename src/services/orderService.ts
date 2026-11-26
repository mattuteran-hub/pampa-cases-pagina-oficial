import { SITE_CONFIG } from '../data/siteConfig';
import { CartItem, CustomerOrderInfo } from '../types/store';

const CART_STORAGE_KEY = 'pampa_cases_cart_v1';

export function loadCartFromStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage quota errors safely
  }
}

export function formatArsPrice(amount: number | null): string {
  if (amount === null) return 'Precio a definir';
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface CartTotals {
  totalUnits: number;
  pricedSubtotal: number;
  hasUnpricedItems: boolean;
  hasDemoPrices: boolean;
  qualifiesMultiBuyPromo: boolean;
  discountAmount: number;
  estimatedTotal: number;
}

export function calculateCartTotals(items: CartItem[]): CartTotals {
  let totalUnits = 0;
  let pricedSubtotal = 0;
  let hasUnpricedItems = false;
  let hasDemoPrices = false;

  for (const item of items) {
    totalUnits += item.quantity;
    if (item.isDemoData) {
      hasDemoPrices = true;
    }
    if (item.unitPrice === null) {
      hasUnpricedItems = true;
    } else {
      pricedSubtotal += item.unitPrice * item.quantity;
    }
  }

  const qualifiesMultiBuyPromo = totalUnits >= 2;
  const discountRate = SITE_CONFIG.promo.twoUnitDiscountRate;
  const discountAmount =
    qualifiesMultiBuyPromo && discountRate !== null && pricedSubtotal > 0
      ? Math.round(pricedSubtotal * discountRate)
      : 0;

  return {
    totalUnits,
    pricedSubtotal,
    hasUnpricedItems,
    hasDemoPrices,
    qualifiesMultiBuyPromo,
    discountAmount,
    estimatedTotal: Math.max(0, pricedSubtotal - discountAmount),
  };
}

export function buildWhatsAppOrderMessage(
  items: CartItem[],
  customer: CustomerOrderInfo,
  totals: CartTotals
): string {
  const lines: string[] = [
    `Hola Pampa Cases, quiero confirmar este pedido:`,
    '',
    `*Detalle del pedido:*`,
  ];

  items.forEach((item, idx) => {
    const unitText = item.unitPrice !== null ? formatArsPrice(item.unitPrice) : 'Precio a confirmar';
    const demoNote = item.isDemoData ? ' (Ref. demo)' : '';
    lines.push(
      `${idx + 1}. ${item.productName} — ${item.modelName} x ${item.quantity} (${unitText}${demoNote})`
    );
  });

  lines.push('');
  if (totals.hasUnpricedItems) {
    lines.push(`*Importe:* A confirmar por artículos con precio pendiente.`);
  } else {
    lines.push(`*Subtotal:* ${formatArsPrice(totals.pricedSubtotal)}`);
    if (totals.qualifiesMultiBuyPromo) {
      if (totals.discountAmount > 0) {
        lines.push(`*Descuento compra múltiple:* -${formatArsPrice(totals.discountAmount)}`);
      } else {
        lines.push(`*Promoción 2+ fundas:* Aplicable (beneficio a confirmar en chat).`);
      }
    }
    lines.push(`*Total estimado:* ${formatArsPrice(totals.estimatedTotal)}`);
  }

  lines.push('');
  lines.push('*Datos de contacto y entrega:*');
  lines.push(`- Nombre: ${customer.fullName.trim()}`);
  lines.push(`- Teléfono / WhatsApp: ${customer.phone.trim()}`);
  lines.push(`- Zona / Localidad: ${customer.zone.trim()}`);
  if (customer.address.trim()) {
    lines.push(`- Dirección / Referencia: ${customer.address.trim()}`);
  }
  if (customer.notes.trim()) {
    lines.push(`- Comentarios: ${customer.notes.trim()}`);
  }

  lines.push('');
  lines.push('Pago mediante transferencia bancaria (envío comprobante por este chat al recibir los datos).');

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string | null {
  const num = SITE_CONFIG.contact.whatsappNumber.replace(/\D/g, '');
  if (!num) return null;
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
