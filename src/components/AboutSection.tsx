import React from 'react';
import { IPHONE_STAGES } from '../data/iphoneModels';
import { SITE_CONFIG } from '../data/siteConfig';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="sobre-nosotros"
      className="py-16 sm:py-20 bg-[#F7F4EE] border-b border-[#E2DBD0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Editorial visual composition */}
          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-2xl border border-[#E2DBD0] bg-[#EFEAE0] p-7 sm:p-9 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-[#5C574E]">
                  Identidad & Origen
                </span>
                <span className="text-xs font-medium text-[#5C574E]">
                  Buenos Aires, Argentina
                </span>
              </div>

              <div className="my-8 flex flex-col items-center justify-center text-center">
                <div className="relative p-4 rounded-full border border-[#D4CBB8] bg-[#F7F4EE]">
                  <img
                    src={SITE_CONFIG.logoPath}
                    alt={`Emblema de ${SITE_CONFIG.brandName}`}
                    referrerPolicy="no-referrer"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover"
                  />
                </div>
                <p className="mt-5 font-display text-xl font-semibold text-[#1C1A17]">
                  {SITE_CONFIG.slogan}
                </p>
                <p className="mt-1.5 text-xs text-[#5C574E] max-w-xs">
                  Celeste, blanco cálido y dorado: los colores de nuestra identidad aplicados al
                  diseño cotidiano.
                </p>
              </div>

              <div className="pt-5 border-t border-[#D8D0C0] grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-semibold text-[#1C1A17]">Mercado inicial</p>
                  <p className="mt-0.5 text-[#5C574E]">Zona Oeste GBA y CABA</p>
                </div>
                <div>
                  <p className="font-semibold text-[#1C1A17]">Propuesta</p>
                  <p className="mt-0.5 text-[#5C574E]">Calidad cuidada y precio accesible</p>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs font-medium text-[#5C574E] mb-3">
              Sobre nosotros <span aria-hidden="true">·</span> Filosofía Pampa Cases
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1A17] text-balance">
              Un pedacito de Argentina en el día a día
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#5C574E] max-w-2xl">
              <p>
                Pampa Cases nace de una idea simple: llevar un pedacito de Argentina en cada
                detalle. Creamos fundas que combinan diseños originales, calidad y estilo,
                inspiradas en nuestra cultura, nuestros paisajes y esos pequeños elementos que
                forman parte de nuestra identidad.
              </p>
              <p>
                Buscamos que cada diseño represente algo más que una funda: una forma de expresar
                quiénes somos. Desde Buenos Aires hacia todo el país, trabajamos colecciones que
                cruzan arquitectura urbana, rituales cotidianos, postales e historia nacional con
                una mirada actual.
              </p>
            </div>

            {/* Staged iPhone rollout roadmap */}
            <div className="mt-9 pt-7 border-t border-[#E2DBD0]">
              <h3 className="text-sm font-semibold text-[#1C1A17] mb-4">
                Incorporación progresiva de modelos de iPhone
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {IPHONE_STAGES.map((stage) => (
                  <div
                    key={stage.stage}
                    className="rounded-xl border border-[#E2DBD0] bg-[#FBF9F5] p-4"
                  >
                    <p className="text-xs font-medium text-[#5C574E]">
                      {stage.title} <span aria-hidden="true">·</span>{' '}
                      <span
                        className={
                          stage.stage === 1 ? 'text-[#1C1A17] font-semibold' : 'text-[#5C574E]'
                        }
                      >
                        {stage.statusLabel}
                      </span>
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-[#1C1A17]">
                      {stage.rangeLabel}
                    </p>
                    <p className="mt-1 text-xs text-[#5C574E] leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
