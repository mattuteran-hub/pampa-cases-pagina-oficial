import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { buildWhatsAppUrl } from '../services/orderService';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const waUrl = buildWhatsAppUrl('Hola Pampa Cases, quiero hacer una consulta.');

  return (
    <footer className="bg-[#1C1A17] text-[#F7F4EE] border-t border-[#2E2B26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={SITE_CONFIG.logoPath}
                alt={`Logotipo de ${SITE_CONFIG.brandName}`}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-[#F7F4EE]/20"
              />
              <span className="font-display text-xl font-semibold tracking-tight text-[#F7F4EE]">
                {SITE_CONFIG.brandName}
              </span>
            </div>

            <p className="font-display text-lg text-[#C6A15B]">{SITE_CONFIG.slogan}</p>

            <p className="text-xs sm:text-sm text-[#CFC8BA] leading-relaxed max-w-sm">
              Fundas para iPhone diseñadas en Argentina. Zona Oeste del Gran Buenos Aires y Ciudad
              Autónoma de Buenos Aires.
            </p>
          </div>

          {/* Navigation column */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-[#8EC9E8]">Navegación</h3>
            <ul className="space-y-2 text-sm text-[#CFC8BA]">
              {[
                { id: 'inicio', label: 'Inicio' },
                { id: 'coleccion', label: 'Colección' },
                { id: 'sobre-nosotros', label: 'Sobre nosotros' },
                { id: 'preguntas-frecuentes', label: 'Preguntas frecuentes' },
                { id: 'contacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateSection(link.id);
                    }}
                    className="hover:text-[#F7F4EE] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Shopping & Channels column */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-[#8EC9E8]">
              Compras, envíos y canales
            </h3>
            <p className="text-xs sm:text-sm text-[#CFC8BA] leading-relaxed">
              Pedidos coordinados por WhatsApp con pago mediante transferencia bancaria y envío de
              comprobante.
            </p>

            <div className="pt-2 space-y-2 text-xs sm:text-sm text-[#CFC8BA]">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#8EC9E8] shrink-0" aria-hidden="true" />
                {waUrl ? (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F7F4EE] underline underline-offset-4"
                  >
                    WhatsApp Pampa Cases
                  </a>
                ) : (
                  <span>{SITE_CONFIG.contact.whatsappDisplay}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#C6A15B] shrink-0" aria-hidden="true" />
                {SITE_CONFIG.contact.instagramUrl ? (
                  <a
                    href={SITE_CONFIG.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F7F4EE] underline underline-offset-4"
                  >
                    {SITE_CONFIG.contact.instagramHandle}
                  </a>
                ) : (
                  <span>{SITE_CONFIG.contact.instagramHandle}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#2E2B26] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9E9789]">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.brandName}. Todos los derechos reservados.
          </p>
          <p>
            <a
              href="#preguntas-frecuentes"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('preguntas-frecuentes');
              }}
              className="hover:text-[#F7F4EE] transition-colors"
            >
              Información sobre compras y envíos
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
