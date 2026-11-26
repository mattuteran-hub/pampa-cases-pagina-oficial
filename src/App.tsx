import { useEffect, useState } from 'react';
import { Check, ShoppingBag, X } from 'lucide-react';
import { AboutSection } from './components/AboutSection';
import { CartDrawer } from './components/CartDrawer';
import { CatalogSection } from './components/CatalogSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { MultiBuyPromoBanner } from './components/MultiBuyPromoBanner';
import { Navbar } from './components/Navbar';
import { ProductDetailView } from './components/ProductDetailView';
import { CATALOG_PRODUCTS, getProductById } from './data/catalog';
import { getModelById } from './data/iphoneModels';
import { loadCartFromStorage, saveCartToStorage } from './services/orderService';
import { CartItem, Product } from './types/store';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => loadCartFromStorage());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Persist cart changes
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  // Support browser back/forward for product detail view
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#producto/')) {
        const slug = hash.replace('#producto/', '').trim();
        const found = CATALOG_PRODUCTS.find((p) => p.slug === slug) ?? null;
        setSelectedProduct(found);
      } else {
        setSelectedProduct(null);
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const showAddedToast = (productName: string, modelName: string) => {
    setToastMessage(`${productName} (${modelName}) agregado al carrito`);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(''), 3500);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.history.pushState(null, '', `#producto/${product.slug}`);
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    window.history.pushState(null, '', '#coleccion');
    window.requestAnimationFrame(() => {
      document.getElementById('coleccion')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (selectedProduct) {
      setSelectedProduct(null);
      window.history.pushState(null, '', `#${sectionId}`);
      window.requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      window.history.replaceState(null, '', `#${sectionId}`);
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (product: Product, modelId: string, quantity: number) => {
    const model = getModelById(modelId);
    if (!model || !model.enabled) return;

    const cartItemId = `${product.id}__${model.id}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const newItem: CartItem = {
        cartItemId,
        productId: product.id,
        productName: product.name,
        collection: product.collection,
        unitPrice: product.price,
        isDemoData: product.isDemoData,
        modelId: model.id,
        modelName: model.name,
        quantity,
        imageUrl: product.hasRealPhoto ? product.imageUrl : undefined,
        artworkVariant: product.artworkVariant,
      };
      return [...prev, newItem];
    });

    showAddedToast(product.name, model.name);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleChangeModel = (cartItemId: string, newModelId: string) => {
    const newModel = getModelById(newModelId);
    if (!newModel || !newModel.enabled) return;

    setCartItems((prev) => {
      const targetItem = prev.find((item) => item.cartItemId === cartItemId);
      if (!targetItem) return prev;

      const newCartItemId = `${targetItem.productId}__${newModel.id}`;
      if (newCartItemId === cartItemId) return prev;

      const duplicate = prev.find((item) => item.cartItemId === newCartItemId);
      if (duplicate) {
        return prev
          .filter((item) => item.cartItemId !== cartItemId)
          .map((item) =>
            item.cartItemId === newCartItemId
              ? { ...item, quantity: item.quantity + targetItem.quantity }
              : item
          );
      }

      return prev.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              cartItemId: newCartItemId,
              modelId: newModel.id,
              modelName: newModel.name,
            }
          : item
      );
    });
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const featuredProduct = getProductById('bandera-sol-de-mayo') ?? CATALOG_PRODUCTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#1C1A17]">
      <Navbar
        cartCount={totalUnits}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {selectedProduct ? (
          <ProductDetailView
            product={selectedProduct}
            onBackToCatalog={handleBackToCatalog}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <>
            <Hero
              onDiscoverClick={() => handleNavigateSection('coleccion')}
              onOpenFeaturedProduct={() => handleSelectProduct(featuredProduct)}
            />

            <CatalogSection
              onSelectProduct={handleSelectProduct}
              onQuickAddToCart={(product, modelId) => handleAddToCart(product, modelId, 1)}
            />

            <MultiBuyPromoBanner
              onExploreCollection={() => handleNavigateSection('coleccion')}
            />

            <AboutSection />

            <FaqSection />

            <ContactSection />
          </>
        )}
      </main>

      <Footer onNavigateSection={handleNavigateSection} />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onChangeModel={handleChangeModel}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Non-intrusive cart feedback toast */}
      {toastMessage && !isCartOpen && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 max-w-sm rounded-xl border border-[#D4CBB8] bg-[#1C1A17] text-[#F7F4EE] px-4 py-3 shadow-xl flex items-center gap-3"
        >
          <Check className="w-4 h-4 text-[#8EC9E8] shrink-0" aria-hidden="true" />
          <p className="text-xs sm:text-sm font-medium flex-1">{toastMessage}</p>
          <button
            type="button"
            onClick={() => {
              setToastMessage('');
              setIsCartOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#F7F4EE] text-[#1C1A17] text-xs font-semibold hover:bg-[#EFEAE0] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Ver</span>
          </button>
          <button
            type="button"
            onClick={() => setToastMessage('')}
            aria-label="Cerrar notificación"
            className="text-[#CFC8BA] hover:text-[#F7F4EE] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
