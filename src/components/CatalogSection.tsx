import React, { useMemo, useState } from 'react';
import { Check, Search, SlidersHorizontal, X } from 'lucide-react';
import { CATALOG_PRODUCTS, PRODUCT_CATEGORIES } from '../data/catalog';
import { IPHONE_MODELS, getEnabledModels } from '../data/iphoneModels';
import { formatArsPrice } from '../services/orderService';
import { Product, ProductAvailability, ProductCategory } from '../types/store';
import { CaseArtworkPreview } from './CaseArtworkPreview';

interface CatalogSectionProps {
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product, modelId: string) => void;
}

const AVAILABILITY_LABELS: Record<ProductAvailability, string> = {
  disponible: 'Disponible',
  consultar: 'Consultar stock',
  proximamente: 'Próximamente',
};

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onSelectProduct,
  onQuickAddToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'todas'>('todas');
  const [selectedCollection, setSelectedCollection] = useState<string>('todas');
  const [selectedModelId, setSelectedModelId] = useState<string>('todos');
  const [selectedAvailability, setSelectedAvailability] = useState<ProductAvailability | 'todas'>('todas');

  // Inline quick-add state per card when user clicks "Agregar" without a preselected model
  const [quickPickerProductId, setQuickPickerProductId] = useState<string | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const enabledModels = useMemo(() => getEnabledModels(), []);

  const collections = useMemo(() => {
    return Array.from(new Set(CATALOG_PRODUCTS.map((p) => p.collection)));
  }, []);

  const selectedModelObject = useMemo(
    () => IPHONE_MODELS.find((m) => m.id === selectedModelId),
    [selectedModelId]
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return CATALOG_PRODUCTS.filter((product) => {
      if (selectedCategory !== 'todas' && product.category !== selectedCategory) {
        return false;
      }
      if (selectedCollection !== 'todas' && product.collection !== selectedCollection) {
        return false;
      }
      if (selectedAvailability !== 'todas' && product.availability !== selectedAvailability) {
        return false;
      }
      if (selectedModelId !== 'todos') {
        const modelObj = IPHONE_MODELS.find((m) => m.id === selectedModelId);
        // Si el modelo aún no está habilitado (Etapa 2/3), ningún diseño está disponible todavía para ese modelo
        if (!modelObj || !modelObj.enabled) {
          return false;
        }
        if (
          product.compatibleModelIds &&
          product.compatibleModelIds.length > 0 &&
          !product.compatibleModelIds.includes(selectedModelId)
        ) {
          return false;
        }
      }
      if (q) {
        const haystack = `${product.name} ${product.collection} ${product.category} ${product.description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedCollection,
    selectedModelId,
    selectedAvailability,
  ]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'todas' ||
    selectedCollection !== 'todas' ||
    selectedModelId !== 'todos' ||
    selectedAvailability !== 'todas';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('todas');
    setSelectedCollection('todas');
    setSelectedModelId('todos');
    setSelectedAvailability('todas');
  };

  const handleQuickAddClick = (product: Product) => {
    if (product.availability === 'proximamente') {
      onSelectProduct(product);
      return;
    }

    // If user already filtered by a specific enabled iPhone model, add immediately
    if (selectedModelId !== 'todos' && selectedModelObject?.enabled) {
      onQuickAddToCart(product, selectedModelId);
      setRecentlyAddedId(product.id);
      window.setTimeout(() => setRecentlyAddedId(null), 1600);
      return;
    }

    // Otherwise toggle inline model selector on the card (mandatory model rule)
    setQuickPickerProductId((prev) => (prev === product.id ? null : product.id));
  };

  const handlePickInlineModel = (product: Product, modelId: string) => {
    onQuickAddToCart(product, modelId);
    setQuickPickerProductId(null);
    setRecentlyAddedId(product.id);
    window.setTimeout(() => setRecentlyAddedId(null), 1600);
  };

  return (
    <section id="coleccion" className="py-16 sm:py-20 bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-[#5C574E] mb-2">
              Colección Pampa Cases <span aria-hidden="true">·</span> Diseños inspirados en Argentina
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1A17] text-balance">
              Nuestros diseños para tu iPhone
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#5C574E] max-w-md leading-relaxed">
            El modelo <span className="font-medium text-[#1C1A17]">Sol de Mayo</span> cuenta con
            fotografía real del producto. Los restantes artículos son vistas de demostración
            editables hasta cargar el catálogo definitivo.
          </p>
        </div>

        {/* Filter & search controls */}
        <div className="rounded-2xl border border-[#E2DBD0] bg-[#EFEAE0]/55 p-4 sm:p-5 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
            {/* Search */}
            <div className="lg:col-span-4">
              <label
                htmlFor="catalog-search"
                className="block text-xs font-medium text-[#5C574E] mb-1.5"
              >
                Buscar diseño
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-[#5C574E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="catalog-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ej: Sol de Mayo, Obelisco, mate..."
                  className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-[#D8D0C0] bg-[#FBF9F5] text-sm text-[#1C1A17] placeholder:text-[#8A8377] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>
            </div>

            {/* Category filter */}
            <div className="lg:col-span-2">
              <label
                htmlFor="filter-category"
                className="block text-xs font-medium text-[#5C574E] mb-1.5"
              >
                Categoría
              </label>
              <select
                id="filter-category"
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as ProductCategory | 'todas')
                }
                className="w-full h-11 px-3 rounded-lg border border-[#D8D0C0] bg-[#FBF9F5] text-sm text-[#1C1A17] focus:outline-none focus:border-[#C6A15B]"
              >
                <option value="todas">Todas</option>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Design / Collection filter */}
            <div className="lg:col-span-2">
              <label
                htmlFor="filter-collection"
                className="block text-xs font-medium text-[#5C574E] mb-1.5"
              >
                Colección / Diseño
              </label>
              <select
                id="filter-collection"
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#D8D0C0] bg-[#FBF9F5] text-sm text-[#1C1A17] focus:outline-none focus:border-[#C6A15B]"
              >
                <option value="todas">Todos</option>
                {collections.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>

            {/* iPhone Model filter */}
            <div className="lg:col-span-2">
              <label
                htmlFor="filter-model"
                className="block text-xs font-medium text-[#5C574E] mb-1.5"
              >
                Modelo de iPhone
              </label>
              <select
                id="filter-model"
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#D8D0C0] bg-[#FBF9F5] text-sm text-[#1C1A17] focus:outline-none focus:border-[#C6A15B]"
              >
                <option value="todos">Todos los habilitados</option>
                <optgroup label="Etapa 1 · Disponibles">
                  {IPHONE_MODELS.filter((m) => m.enabled).map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Etapas 2 y 3 · Próximamente">
                  {IPHONE_MODELS.filter((m) => !m.enabled).map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} (Próximamente)
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Availability filter */}
            <div className="lg:col-span-2">
              <label
                htmlFor="filter-availability"
                className="block text-xs font-medium text-[#5C574E] mb-1.5"
              >
                Disponibilidad
              </label>
              <select
                id="filter-availability"
                value={selectedAvailability}
                onChange={(e) =>
                  setSelectedAvailability(e.target.value as ProductAvailability | 'todas')
                }
                className="w-full h-11 px-3 rounded-lg border border-[#D8D0C0] bg-[#FBF9F5] text-sm text-[#1C1A17] focus:outline-none focus:border-[#C6A15B]"
              >
                <option value="todas">Todas</option>
                <option value="disponible">Disponible</option>
                <option value="consultar">Consultar</option>
                <option value="proximamente">Próximamente</option>
              </select>
            </div>
          </div>

          {/* Active filter summary */}
          <div className="mt-3.5 pt-3 border-t border-[#E2DBD0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5C574E]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C6A15B]" aria-hidden="true" />
              <span className="tabular-nums">
                Mostrando {filteredProducts.length} de {CATALOG_PRODUCTS.length} diseños
              </span>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 font-medium text-[#1C1A17] hover:text-[#5C574E] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Limpiar filtros</span>
              </button>
            )}
          </div>
        </div>

        {/* Special notice if user selected a Stage 2 or Stage 3 model */}
        {selectedModelObject && !selectedModelObject.enabled && (
          <div className="mb-8 rounded-xl border border-[#C6A15B]/50 bg-[#EFEAE0] p-5 text-sm text-[#1C1A17]">
            <p className="font-semibold">
              {selectedModelObject.name} — Próximamente (Etapa {selectedModelObject.stage})
            </p>
            <p className="mt-1 text-[#5C574E]">
              Actualmente estamos trabajando con modelos de la primera etapa (iPhone 15 a iPhone 17
              Pro Max). Podés limpiar el filtro de modelo para ver todos los diseños disponibles o
              consultarnos por WhatsApp para avisarte cuando ingrese tu modelo.
            </p>
          </div>
        )}

        {/* Empty state */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-[#E2DBD0] bg-[#EFEAE0]/40 p-10 text-center">
            <p className="font-display text-xl font-medium text-[#1C1A17]">
              No encontramos diseños con esos filtros
            </p>
            <p className="mt-2 text-sm text-[#5C574E]">
              Probá limpiando alguno de los filtros o buscando otra temática de la colección.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 px-5 py-2.5 rounded-lg bg-[#1C1A17] text-[#F7F4EE] text-sm font-medium hover:bg-[#332F2A] transition-colors cursor-pointer"
            >
              Ver toda la colección
            </button>
          </div>
        ) : (
          /* Uniform 3-column product grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProducts.map((product) => {
              const isQuickPickerOpen = quickPickerProductId === product.id;
              const wasJustAdded = recentlyAddedId === product.id;
              const isUpcoming = product.availability === 'proximamente';

              return (
                <article
                  key={product.id}
                  className="group flex flex-col rounded-2xl border border-[#E2DBD0] bg-[#FBF9F5] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(28,26,23,0.06)]"
                >
                  {/* Visual product preview */}
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-[4/4.2] w-full border-b border-[#E2DBD0] overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#C6A15B]"
                    aria-label={`Ver detalles de ${product.name}`}
                  >
                    <CaseArtworkPreview
                      title={product.name}
                      imageUrl={product.imageUrl}
                      hasRealPhoto={product.hasRealPhoto}
                      artworkVariant={product.artworkVariant}
                    />
                  </button>

                  {/* Card body */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      {/* Clean unboxed metadata */}
                      <p className="text-xs text-[#5C574E] mb-1.5">
                        <span>{product.collection}</span>
                        <span aria-hidden="true"> · </span>
                        <span
                          className={
                            product.availability === 'disponible'
                              ? 'text-[#1C1A17] font-medium'
                              : 'text-[#5C574E]'
                          }
                        >
                          {AVAILABILITY_LABELS[product.availability]}
                        </span>
                        {product.isDemoData && (
                          <>
                            <span aria-hidden="true"> · </span>
                            <span>Demo editable</span>
                          </>
                        )}
                      </p>

                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-lg font-semibold text-[#1C1A17] leading-snug">
                          <button
                            type="button"
                            onClick={() => onSelectProduct(product)}
                            className="text-left hover:underline decoration-[#C6A15B] underline-offset-4 cursor-pointer"
                          >
                            {product.name}
                          </button>
                        </h3>

                        <span className="tabular-nums text-[15px] font-semibold text-[#1C1A17] whitespace-nowrap shrink-0">
                          {product.price !== null
                            ? formatArsPrice(product.price)
                            : 'Precio a definir'}
                        </span>
                      </div>

                      {product.isDemoData && (
                        <p className="mt-1 text-[11px] text-[#5C574E]">
                          Precio e imagen ilustrativos de demostración
                        </p>
                      )}
                    </div>

                    {/* Inline mandatory model quick-picker */}
                    {isQuickPickerOpen && (
                      <div className="rounded-xl border border-[#D8D0C0] bg-[#EFEAE0]/70 p-3">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-medium text-[#1C1A17]">
                            Elegí tu modelo de iPhone (Etapa 1):
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuickPickerProductId(null)}
                            aria-label="Cerrar selector rápido"
                            className="text-[#5C574E] hover:text-[#1C1A17] cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
                          {enabledModels.map((model) => (
                            <button
                              key={model.id}
                              type="button"
                              onClick={() => handlePickInlineModel(product, model.id)}
                              className="px-2.5 py-1.5 text-left text-xs font-medium rounded-md border border-[#D8D0C0] bg-[#FBF9F5] text-[#1C1A17] hover:border-[#C6A15B] hover:bg-[#8EC9E8]/20 transition-colors truncate cursor-pointer"
                            >
                              {model.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Card actions */}
                    <div className="pt-2 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="flex-1 h-10 px-3.5 rounded-lg border border-[#D4CBB8] bg-transparent text-xs sm:text-sm font-medium text-[#1C1A17] hover:bg-[#EFEAE0] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Ver detalles
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickAddClick(product)}
                        disabled={isUpcoming}
                        className={`flex-1 h-10 px-3.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap inline-flex items-center justify-center gap-1.5 ${
                          isUpcoming
                            ? 'bg-[#E2DBD0] text-[#5C574E] cursor-not-allowed'
                            : wasJustAdded
                              ? 'bg-[#5AA9D4] text-[#1C1A17] cursor-pointer'
                              : 'bg-[#1C1A17] text-[#F7F4EE] hover:bg-[#332F2A] cursor-pointer'
                        }`}
                      >
                        {wasJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Agregado</span>
                          </>
                        ) : isUpcoming ? (
                          <span>Próximamente</span>
                        ) : (
                          <span>Agregar al carrito</span>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
