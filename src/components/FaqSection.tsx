import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faq';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0]?.id ?? '');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="preguntas-frecuentes"
      className="py-16 sm:py-20 bg-[#F7F4EE] border-b border-[#E2DBD0]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-medium text-[#5C574E] mb-2">
            Información útil <span aria-hidden="true">·</span> Dudas habituales
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1A17] text-balance">
            Preguntas frecuentes
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#5C574E]">
            Todo lo que necesitás saber sobre modelos habilitados, envíos, formas de pago y
            pedidos por WhatsApp.
          </p>
        </div>

        <div className="divide-y divide-[#E2DBD0] border-t border-b border-[#E2DBD0]">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="py-1">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  className="w-full py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A15B] rounded-md"
                >
                  <span className="text-base sm:text-lg font-medium text-[#1C1A17]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#5C574E] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#1C1A17]' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-panel-${item.id}`}
                    className="pb-5 pr-8 text-sm sm:text-base leading-relaxed text-[#5C574E]"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
