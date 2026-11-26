import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface MultiBuyPromoBannerProps {
  onExploreCollection: () => void;
}

export const MultiBuyPromoBanner: React.FC<MultiBuyPromoBannerProps> = ({
  onExploreCollection,
}) => {
  const { promo } = SITE_CONFIG;

  return (
    <section className="py-12 sm:py-16 bg-[#EFEAE0] border-t border-b border-[#E2DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#D4CBB8] bg-[#F7F4EE] p-7 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <p className="text-xs font-medium text-[#5C574E]">
              {promo.multiBuyTitle} <span aria-hidden="true">·</span> Pampa Cases
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1A17] text-balance">
              {promo.multiBuyHeadline}
            </h2>
            <p className="text-sm sm:text-base text-[#5C574E] leading-relaxed max-w-2xl">
              {promo.multiBuyDescription}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
            <div className="rounded-xl border border-[#E2DBD0] bg-[#EFEAE0]/70 px-4 py-3 text-xs text-[#5C574E] lg:text-right">
              <span className="block font-semibold text-[#1C1A17]">
                Compra de 2 o más unidades
              </span>
              <span>
                {promo.twoUnitDiscountRate !== null
                  ? `Beneficio activo: ${Math.round(promo.twoUnitDiscountRate * 100)}% de descuento`
                  : 'Porcentaje de descuento a definir al confirmar condiciones'}
              </span>
            </div>

            <button
              type="button"
              onClick={onExploreCollection}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1C1A17] text-[#F7F4EE] text-sm font-medium hover:bg-[#332F2A] transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Combinar diseños</span>
              <ArrowRight className="w-4 h-4 text-[#C6A15B]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
