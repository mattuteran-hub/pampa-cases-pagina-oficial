import { FaqItem } from '../types/store';

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'modelos-disponibles',
    question: '¿Qué modelos de iPhone están disponibles?',
    answer:
      'Incorporamos los modelos en tres etapas. En la primera etapa ya podés pedir desde iPhone 15 base hasta iPhone 17 Pro Max. En la segunda etapa sumaremos desde iPhone 13 base hasta iPhone 14 Pro Max, y en la tercera etapa desde iPhone 7 en adelante. Los modelos de etapas futuras figuran indicados como "Próximamente".',
  },
  {
    id: 'como-comprar',
    question: '¿Cómo puedo realizar una compra?',
    answer:
      'Elegís el diseño que te gusta, seleccionás tu modelo de iPhone y la cantidad, y lo sumás al carrito. Cuando revisás tu pedido, completás tus datos de contacto y entrega y lo confirmás por WhatsApp. Por ese chat te pasamos los datos bancarios para abonar por transferencia y coordinamos la entrega.',
  },
  {
    id: 'medios-de-pago',
    question: '¿Cuáles son los medios de pago?',
    answer:
      'El pago se realiza mediante transferencia bancaria. Una vez confirmado el pedido por WhatsApp, te enviamos el CBU/Alias correspondiente y nos compartís el comprobante por el mismo medio.',
  },
  {
    id: 'envios',
    question: '¿Cómo funcionan los envíos?',
    answer:
      'Realizamos entregas en Zona Oeste del Gran Buenos Aires, Ciudad Autónoma de Buenos Aires y envíos a todo el país. [Texto editable: completar con transportes, zonas de mensajería, plazos estimados y tarifas finales una vez confirmados].',
    isEditablePlaceholder: true,
  },
  {
    id: 'retiro-personal',
    question: '¿Puedo retirar mi pedido personalmente?',
    answer:
      'Sí, tenemos previsto ofrecer puntos de retiro coordinado en Zona Oeste GBA y CABA. [Texto editable: detallar barrios o puntos de encuentro exactos y días/horarios disponibles cuando queden definidos].',
    isEditablePlaceholder: true,
  },
  {
    id: 'descuento-dos-fundas',
    question: '¿Hay descuentos por comprar dos fundas?',
    answer:
      'Sí, contamos con una promoción especial al llevar dos fundas para que puedas combinar diseños o compartir el pedido. [Texto editable: indicar el porcentaje o monto de descuento definitivo cuando sea confirmado].',
    isEditablePlaceholder: true,
  },
  {
    id: 'consultar-disponibilidad',
    question: '¿Cómo puedo consultar la disponibilidad de un diseño?',
    answer:
      'En cada tarjeta del catálogo y en la vista de producto podés ver el estado actual del diseño y los modelos de iPhone habilitados. Si un diseño figura como "Consultar" o querés averiguar por un modelo próximo a ingresar, escribinos directo por WhatsApp o Instagram.',
  },
];
