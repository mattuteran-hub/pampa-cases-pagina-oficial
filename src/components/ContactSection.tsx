import React, { useState } from 'react';
import { Check, Instagram, MessageCircle, Send } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { buildWhatsAppUrl } from '../services/orderService';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [iphoneModel, setIphoneModel] = useState('');
  const [message, setMessage] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState('');

  const { contact } = SITE_CONFIG;
  const directWhatsappUrl = buildWhatsAppUrl(
    'Hola Pampa Cases, te escribo desde la web para hacer una consulta.'
  );
  const hasInstagram = Boolean(contact.instagramUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const composedText = `Hola Pampa Cases, soy ${name.trim()}${
      iphoneModel.trim() ? ` (iPhone ${iphoneModel.trim()})` : ''
    }. Consulta: ${message.trim()}`;

    const waUrl = buildWhatsAppUrl(composedText);
    if (waUrl) {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setSubmittedNotice('Abrimos WhatsApp con tu consulta lista para enviar.');
    } else {
      setSubmittedNotice(
        'Tu consulta quedó redactada. Cuando configures el número definitivo de WhatsApp en siteConfig.ts, este botón abrirá el chat directamente.'
      );
    }
  };

  return (
    <section id="contacto" className="py-16 sm:py-20 bg-[#EFEAE0]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Direct channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-medium text-[#5C574E] mb-2">
                Contacto directo <span aria-hidden="true">·</span> Atención personalizada
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1A17] text-balance">
                Escribinos por cualquier consulta
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#5C574E] leading-relaxed">
                Respondemos dudas sobre diseños, stock, modelos próximos a ingresar y coordinación
                de envíos o retiros en Zona Oeste GBA y CABA.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {directWhatsappUrl ? (
                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg bg-[#1C1A17] text-[#F7F4EE] text-sm font-medium hover:bg-[#332F2A] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#8EC9E8]" aria-hidden="true" />
                  <span>Escribir por WhatsApp</span>
                </a>
              ) : (
                <div className="rounded-xl border border-[#D4CBB8] bg-[#FBF9F5] p-4">
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-[#1C1A17]">
                    <MessageCircle className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </div>
                  <p className="mt-1 text-xs text-[#5C574E]">
                    {contact.whatsappDisplay} — Campo editable listo para vincular el enlace
                    directo `wa.me` definitivo.
                  </p>
                </div>
              )}

              {hasInstagram ? (
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg border border-[#D4CBB8] bg-[#FBF9F5] text-[#1C1A17] text-sm font-medium hover:bg-[#EFEAE0] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                  <span>Seguir en Instagram ({contact.instagramHandle})</span>
                </a>
              ) : (
                <div className="rounded-xl border border-[#D4CBB8] bg-[#FBF9F5] p-4">
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-[#1C1A17]">
                    <Instagram className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
                    <span>Instagram</span>
                  </div>
                  <p className="mt-1 text-xs text-[#5C574E]">
                    {contact.instagramHandle} — Campo editable para enlazar el perfil oficial de la
                    marca.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Optional contact form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[#E2DBD0] bg-[#FBF9F5] p-6 sm:p-8 space-y-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-[#1C1A17]">
                  Formulario de consulta rápido
                </h3>
                <p className="text-xs text-[#5C574E] mt-1">
                  Dejanos tu mensaje o preparalo para enviarlo directo por WhatsApp.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[#5C574E] mb-1.5"
                  >
                    Tu nombre *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Sofía"
                    className="w-full h-11 px-3.5 rounded-lg border border-[#D8D0C0] bg-[#F7F4EE] text-sm text-[#1C1A17] placeholder:text-[#8A8377] focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-model"
                    className="block text-xs font-medium text-[#5C574E] mb-1.5"
                  >
                    Modelo de iPhone (opcional)
                  </label>
                  <input
                    id="contact-model"
                    type="text"
                    value={iphoneModel}
                    onChange={(e) => setIphoneModel(e.target.value)}
                    placeholder="Ej: 15 Pro"
                    className="w-full h-11 px-3.5 rounded-lg border border-[#D8D0C0] bg-[#F7F4EE] text-sm text-[#1C1A17] placeholder:text-[#8A8377] focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[#5C574E] mb-1.5"
                >
                  Mensaje *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Contanos qué diseño buscás o si querés consultar por envíos en tu zona..."
                  className="w-full p-3.5 rounded-lg border border-[#D8D0C0] bg-[#F7F4EE] text-sm text-[#1C1A17] placeholder:text-[#8A8377] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              {submittedNotice && (
                <p
                  role="status"
                  className="flex items-start gap-2 text-xs text-[#1C1A17] bg-[#8EC9E8]/20 border border-[#8EC9E8]/60 rounded-lg px-3.5 py-2.5"
                >
                  <Check className="w-4 h-4 text-[#1C1A17] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{submittedNotice}</span>
                </p>
              )}

              <div className="pt-1 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1C1A17] text-[#F7F4EE] text-sm font-medium hover:bg-[#332F2A] transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#8EC9E8]" aria-hidden="true" />
                  <span>Enviar consulta</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
