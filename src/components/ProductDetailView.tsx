import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CreditCard,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { IPHONE_MODELS, IPHONE_STAGES } from '../data/iphoneModels';
import { SITE_CONFIG } from '../data/siteConfig';
import { formatArsPrice } from '../services/orderService';
import { Product } from '../types/store';
import { CaseArtworkPreview } from './CaseArtworkPreview';

interface ProductDetailViewProps {
  product: Product;
  onBackToCatalog: () => void;
  onAddToCart: (product: Product, modelId: string, quantity: number) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBackToCatalog,
  onAddToCart,
}) => {
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [modelError, setModelError] = useState<string>('');
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);

  useEffect(() => {
    setSelectedModelId('');
    setQuantity(1);
    setModelError('');
    setAddedFeedback(false);
    setActiveGalleryIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const gallerySlides =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [
          {
            id: 'principal',
            label: 'Vista principal',
            imageUrl: product.imageUrl,
            cropPosition: 'center center',
            scale: 1,
          },
        ];

  const activeSlide = gallerySlides[activeGalleryIdx] || gallerySlides[0];
  const isUpcomingProduct = product.availability === 'proximamente';

  const handleAdd = () => {
    if (isUpcomingProduct) return;

    if (!selectedModelId) {
      setModelError('Seleccioná tu modelo de iPhone antes de agregar al carrito.');
      return;
    }

    const model = IPHONE_MODELS.find((m) => m.id === selectedModelId);
    if (!model || !model.enabled) {
      setModelError('Ese modelo estará disponible próximamente.');
      return;
    }

    setModelError('');
    onAddToCart(product, selectedModelId, quantity);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1800);
  };

  return (
    <section
      aria-label={`Detalle del producto ${product.name}`}
      className="py-10 sm:py-14 bg-[#F7F4EE] border-b border-[#E2DBD0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / back button */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToCatalog}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5C574E] hover:text-[#1C1A17] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Volver a la colección</span>
          </button>

          <span className="text-xs text-[#5C574E]">
            {product.category} <span aria-hidden="true">/</span> {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Sticky photo gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <div className="aspect-[4/4.5] rounded-2xl border border-[#E2DBD0] bg-[#FBF9F5] overflow-hidden">
              <CaseArtworkPreview
                title={product.name}
                imageUrl={activeSlide.imageUrl || product.imageUrl}
                hasRealPhoto={product.hasRealPhoto}
                artworkVariant={product.artworkVariant}
                cropPosition={activeSlide.cropPosition}
                scale={activeSlide.scale}
              />
            </div>

            {gallerySlides.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {gallerySlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveGalleryIdx(idx)}
                    className={`rounded-xl border p-2 text-left transition-colors cursor-pointer ${
                      idx === activeGalleryIdx
                        ? 'border-[#1C1A17] bg-[#EFEAE0]'
                        : 'border-[#E2DBD0] bg-[#FBF9F5] hover:border-[#C6A15B]'
                    }`}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden mb-1.5 bg-[#FBF9F5]">
                      <CaseArtworkPreview
                        title={`${product.name} - ${slide.label}`}
                        imageUrl={slide.imageUrl}
                        hasRealPhoto={product.hasRealPhoto}
                        artworkVariant={product.artworkVariant}
                        cropPosition={slide.cropPosition}
                        scale={slide.scale}
                      />
                    </div>
                    <p className="text-[11px] font-medium text-[#1C1A17] truncate">
                      {slide.label}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Contiguous purchase module */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-medium text-[#5C574E] mb-2">
                {product.collection} <span aria-hidden="true">·</span> {product.category}
                {product.isDemoData && (
                  <>
                    <span aria-hidden="true"> · </span>
                    <span>Artículo de demostración editable</span>
                  </>
                )}
              </p>

              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1A17] tracking-tight">
                {product.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-baseline gap-4">
                <p className="tabular-nums text-2xl font-semibold text-[#1C1A17]">
                  {product.price !== null
                    ? formatArsPrice(product.price)
                    : 'Precio a definir'}
                </p>

                <span className="text-xs sm:text-sm text-[#5C574E]">
                  Estado:{' '}
                  <strong className="font-medium text-[#1C1A17]">
                    {product.availability === 'disponible'
                      ? 'Disponible'
                      : product.availability === 'consultar'
                        ? 'Consultar stock'
                        : 'Próximamente'}
                  </strong>
                </span>
              </div>

              {product.isDemoData && (
                <p className="mt-1.5 text-xs text-[#5C574E]">
                  Valor de ejemplo para probar el carrito. Se actualizará con el precio oficial de
                  lanzamiento.
                </p>
              )}
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-[#5C574E]">
              {product.description}
            </p>

            <p className="text-xs text-[#5C574E] border-t border-b border-[#E2DBD0] py-3">
              {product.materialNote}
            </p>

            {/* Mandatory iPhone Model Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="pdp-model-select"
                  className="text-sm font-semibold text-[#1C1A17]"
                >
                  Modelo de iPhone <span className="text-[#C6A15B]">*</span>
                </label>
                <span className="text-xs text-[#5C574E]">Selección obligatoria</span>
              </div>

              {/* Stage 1 quick buttons */}
              <div className="space-y-4">
                {IPHONE_STAGES.map((stageMeta) => {
                  const stageModels = IPHONE_MODELS.filter((m) => m.stage === stageMeta.stage);
                  const hasEnabled = stageModels.some((m) => m.enabled);

                  return (
                    <div
                      key={stageMeta.stage}
                      className="rounded-xl border border-[#E2DBD0] bg-[#EFEAE0]/45 p-3.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <span className="text-xs font-semibold text-[#1C1A17]">
                          {stageMeta.title}: {stageMeta.rangeLabel}
                        </span>
                        <span
                          className={`text-[11px] font-medium ${
                            hasEnabled ? 'text-[#1C1A17]' : 'text-[#5C574E]'
                          }`}
                        >
                          {stageMeta.statusLabel}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {stageModels.map((model) => {
                          const isSelected = selectedModelId === model.id;
                          return (
                            <button
                              key={model.id}
                              type="button"
                              disabled={!model.enabled || isUpcomingProduct}
                              onClick={() => {
                                setSelectedModelId(model.id);
                                setModelError('');
                              }}
                              className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors border ${
                                !model.enabled || isUpcomingProduct
                                  ? 'border-[#E2DBD0] bg-[#F7F4EE]/50 text-[#8A8377] cursor-not-allowed'
                                  : isSelected
                                    ? 'border-[#1C1A17] bg-[#1C1A17] text-[#F7F4EE] cursor-pointer'
                                    : 'border-[#D4CBB8] bg-[#FBF9F5] text-[#1C1A17] hover:border-[#C6A15B] cursor-pointer'
                              }`}
                            >
                              <span className="block truncate">{model.name}</span>
                              {!model.enabled && (
                                <span className="block text-[10px] text-[#8A8377]">
                                  Próximamente
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {modelError && (
                <p
                  role="alert"
                  className="flex items-center gap-2 text-xs font-medium text-[#8B3A2B] bg-[#FDECE8] border border-[#E6B8AE] rounded-lg px-3 py-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{modelError}</span>
                </p>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <div className="inline-flex items-center justify-between border border-[#D4CBB8] rounded-lg bg-[#FBF9F5] h-12 px-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Disminuir cantidad"
                  className="w-9 h-9 flex items-center justify-center rounded-md text-[#1C1A17] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="tabular-nums w-10 text-center text-sm font-semibold text-[#1C1A17]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumentar cantidad"
                  className="w-9 h-9 flex items-center justify-center rounded-md text-[#1C1A17] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={isUpcomingProduct}
                className={`flex-1 h-12 px-6 rounded-lg text-sm sm:text-base font-medium inline-flex items-center justify-center gap-2.5 transition-colors ${
                  isUpcomingProduct
                    ? 'bg-[#E2DBD0] text-[#5C574E] cursor-not-allowed'
                    : addedFeedback
                      ? 'bg-[#5AA9D4] text-[#1C1A17] cursor-pointer'
                      : 'bg-[#1C1A17] text-[#F7F4EE] hover:bg-[#332F2A] cursor-pointer'
                }`}
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Sumado al carrito</span>
                  </>
                ) : isUpcomingProduct ? (
                  <span>Diseño disponible próximamente</span>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#8EC9E8]" aria-hidden="true" />
                    <span>Agregar al carrito</span>
                  </>
                )}
              </button>
            </div>

            {/* Shipping & Payment Information */}
            <div className="pt-4 space-y-4 border-t border-[#E2DBD0]">
              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-[#C6A15B] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <h2 className="text-sm font-semibold text-[#1C1A17]">Envíos y entregas</h2>
                  <p className="mt-1 text-xs sm:text-sm text-[#5C574E] leading-relaxed">
                    {SITE_CONFIG.shippingInfo}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="w-4 h-4 text-[#C6A15B] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <h2 className="text-sm font-semibold text-[#1C1A17]">Medios de pago</h2>
                  <p className="mt-1 text-xs sm:text-sm text-[#5C574E] leading-relaxed">
                    {SITE_CONFIG.paymentInfo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
