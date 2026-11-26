import React, { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateSection: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'coleccion', label: 'Colección' },
  { id: 'sobre-nosotros', label: 'Sobre nosotros' },
  { id: 'preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { id: 'contacto', label: 'Contacto' },
];

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#E2DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand mark */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('inicio');
          }}
          className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A15B] rounded-md"
        >
          <img
            src={SITE_CONFIG.logoPath}
            alt={`Logotipo de ${SITE_CONFIG.brandName}`}
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover border border-[#E2DBD0]"
          />
          <span className="font-display text-xl font-semibold tracking-tight text-[#1C1A17]">
            {SITE_CONFIG.brandName}
          </span>
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5C574E]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
              className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:text-[#1C1A17] hover:border-[#C6A15B] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A15B]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary action (Shopping bag) + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Abrir bolsa de compras (${cartCount} unidades)`}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#1C1A17] text-[#F7F4EE] text-sm font-medium hover:bg-[#332F2A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A15B]"
          >
            <ShoppingBag className="w-4 h-4 text-[#8EC9E8]" aria-hidden="true" />
            <span>Carrito</span>
            <span className="tabular-nums text-xs font-semibold px-1.5 py-0.5 rounded bg-[#F7F4EE]/15 text-[#F7F4EE]">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E2DBD0] bg-[#EFEAE0]/60 text-[#1C1A17] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile collapsible navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2DBD0] bg-[#F7F4EE]">
          <nav aria-label="Menú móvil" className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className="px-3 py-3 text-base font-medium text-[#1C1A17] rounded-lg hover:bg-[#EFEAE0] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
