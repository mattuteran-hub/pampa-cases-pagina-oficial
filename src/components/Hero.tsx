import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface HeroProps {
  onDiscoverClick: () => void;
  onOpenFeaturedProduct: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onDiscoverClick,
  onOpenFeaturedProduct,
}) => {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-[#E2DBD0] bg-[#F7F4EE]"
    >
      {/* Subtle geometric horizon lines inspired by Pampa Cases emblem */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 opacity-35"
      >
        <svg
          viewBox="0 0 1440 180"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0 110 C 320 40, 620 160, 960 90 C 1180 45, 1320 75, 1440 60 L 1440 180 L 0 180 Z"
            fill="#8EC9E8"
            fillOpacity="0.22"
          />
          <path
            d="M0 135 C 360 85, 680 175, 1020 115 C 1220 80, 1350 110, 1440 98 L 1440 180 L 0 180 Z"
            fill="#C6A15B"
            fillOpacity="0.16"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left editorial content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#5C574E] mb-4">
              {SITE_CONFIG.regionLabel} <span aria-hidden="true">·</span> Fundas para iPhone
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold leading-[1.06] tracking-tight text-[#1C1A17] text-balance max-w-2xl">
              {SITE_CONFIG.slogan}
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#5C574E] max-w-xl">
              Diseños originales inspirados en la cultura, la arquitectura y los
              paisajes de Argentina. Protección diaria y terminación cuidada para
              llevar un pedacito de lo nuestro en tu iPhone.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onDiscoverClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#1C1A17] text-[#F7F4EE] text-sm sm:text-base font-medium hover:bg-[#332F2A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A15B]"
              >
                <span>Descubrir colección</span>
                <ArrowRight className="w-4 h-4 text-[#8EC9E8]" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onOpenFeaturedProduct}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-[#D4CBB8] bg-[#EFEAE0]/60 text-[#1C1A17] text-sm sm:text-base font-medium hover:bg-[#EFEAE0] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A15B]"
              >
                Ver modelo Sol de Mayo
              </button>
            </div>

            <div className="mt-10 pt-6 border-t border-[#E2DBD0] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[#5C574E]">
              <span>Etapa 1: iPhone 15 a 17 Pro Max</span>
              <span aria-hidden="true">·</span>
              <span>Pago por transferencia bancaria</span>
              <span aria-hidden="true">·</span>
              <span>Confirmación directa por WhatsApp</span>
            </div>
          </div>

          {/* Right featured product showcase using the real uploaded photo */}
          <div className="lg:col-span-5 flex">
            <div className="relative w-full rounded-2xl border border-[#E2DBD0] bg-[#EFEAE0] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
              {/* Subtle top-right emblem watermark accent */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-medium text-[#5C574E]">
                  Edición Emblema Nacional
                </span>
                <img
                  src={SITE_CONFIG.logoPath}
                  alt=""
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover opacity-90"
                />
              </div>

              <button
                type="button"
                onClick={onOpenFeaturedProduct}
                className="group relative flex-1 flex items-center justify-center rounded-xl bg-[#FBF9F5] border border-[#E2DBD0]/80 p-5 sm:p-7 overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A15B]"
                aria-label="Ver detalles de la funda Sol de Mayo"
              >
                {/* Soft celeste & gold editorial halo behind the phone case */}
                <div
                  aria-hidden="true"
                  className="absolute w-56 h-56 rounded-full bg-[#8EC9E8]/20 blur-2xl -top-8 -right-8 transition-transform duration-300 group-hover:scale-110"
                />
                <div
                  aria-hidden="true"
                  className="absolute w-48 h-48 rounded-full bg-[#C6A15B]/15 blur-2xl -bottom-10 -left-8 transition-transform duration-300 group-hover:scale-110"
                />

                <img
                  src="/assets/aistudio/Gemini_Generated_Image_x4wa2vx4wa2vx4wa_e6791fb7.jpg"
                  alt="Funda Pampa Cases modelo Sol de Mayo para iPhone con diseño de la bandera argentina"
                  referrerPolicy="no-referrer"
                  className="relative z-10 max-h-[380px] w-auto object-contain rounded-lg transition-transform duration-300 group-hover:-translate-y-1"
                />
              </button>

              <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                <div>
                  <p className="font-semibold text-[#1C1A17]">Modelo Sol de Mayo</p>
                  <p className="text-xs text-[#5C574E]">
                    Acabado texturado · Disponible Etapa 1
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenFeaturedProduct}
                  className="text-xs font-semibold text-[#1C1A17] underline underline-offset-4 decoration-[#C6A15B] hover:decoration-[#1C1A17] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Explorar diseño
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
