import { SiteConfig } from '../types/store';

/**
 * Configuración centralizada y editable de Pampa Cases.
 * Preparada para conectarse a un panel de administración o base de datos.
 * Los campos marcados "[A definir]" son editables y no contienen datos comerciales inventados.
 */
export const SITE_CONFIG: SiteConfig = {
  brandName: 'Pampa Cases',
  slogan: 'Nuestra identidad, en cada detalle.',
  logoPath: '/assets/aistudio/Wavy_Landscape_Circle_Emblem_e31c7a4a.png',
  regionLabel: 'Zona Oeste GBA & CABA, Argentina',
  contact: {
    // Reemplazar con el número real sin signos ni espacios, ej: "5491112345678"
    whatsappNumber: '',
    whatsappDisplay: 'WhatsApp oficial [Número a definir]',
    instagramHandle: '@pampacases [Usuario a confirmar]',
    instagramUrl: '',
    emailDisplay: 'contacto@pampacases [Email a definir]',
  },
  promo: {
    multiBuyTitle: 'Beneficio por compra múltiple',
    multiBuyHeadline: 'Llevando dos fundas accedés a un beneficio especial en tu pedido',
    multiBuyDescription:
      'Pensado para combinar dos diseños o compartir con alguien más. El descuento por compra de dos unidades se confirma junto con el detalle final de tu pedido.',
    // Definir porcentaje numérico (ej: 0.10 o 0.15) cuando las condiciones comerciales estén confirmadas.
    twoUnitDiscountRate: null,
  },
  shippingInfo:
    'Coordinamos entregas en Zona Oeste del Gran Buenos Aires, Ciudad Autónoma de Buenos Aires y envíos al resto del país. Costos y plazos finales a confirmar por WhatsApp según tu localidad [Condiciones editables].',
  pickupInfo:
    'Puntos de retiro presencial en Zona Oeste GBA y CABA a confirmar según disponibilidad de coordinación [Punto de retiro a definir].',
  paymentInfo:
    'El pago se realiza por transferencia bancaria. Una vez que enviás tu pedido por WhatsApp, te compartimos los datos de la cuenta y nos enviás el comprobante por el mismo chat.',
};
