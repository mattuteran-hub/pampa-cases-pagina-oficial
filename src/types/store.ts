export type ProductCategory =
  | 'Símbolos & Historia'
  | 'Buenos Aires & Urbano'
  | 'Costumbres & Mate'
  | 'Paisajes & Fauna'
  | 'Postales & Cultura';

export type ProductAvailability = 'disponible' | 'consultar' | 'proximamente';

export type ArtworkPreviewVariant =
  | 'sol-de-mayo'
  | 'obelisco-diagonal'
  | 'mate-manana'
  | 'fileteado-colectivo'
  | 'cordillera-austral'
  | 'postal-san-telmo';

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: string;
  category: ProductCategory;
  description: string;
  /** Precio en ARS. Si es null, se muestra como "A definir". */
  price: number | null;
  /** Indica si el precio/producto corresponde a contenido de demostración editable. */
  isDemoData: boolean;
  /** Indica si cuenta con fotografía real cargada o si usa vista previa de demostración. */
  hasRealPhoto: boolean;
  /** Ruta de la imagen principal si existe fotografía real. */
  imageUrl?: string;
  /** Galería adicional (puede reutilizar recortes o vistas de producto reales). */
  gallery?: Array<{
    id: string;
    label: string;
    imageUrl?: string;
    cropPosition?: string;
    scale?: number;
  }>;
  artworkVariant: ArtworkPreviewVariant;
  availability: ProductAvailability;
  /** IDs de modelos de iPhone compatibles con este diseño. Si está vacío, aplica a los habilitados por etapa. */
  compatibleModelIds?: string[];
  materialNote: string;
  featured?: boolean;
}

export type IPhoneStage = 1 | 2 | 3;

export interface IPhoneModel {
  id: string;
  name: string;
  family: string;
  stage: IPhoneStage;
  /** Cambiar a true/false para activar o desactivar el modelo en todo el sitio. */
  enabled: boolean;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  productName: string;
  collection: string;
  unitPrice: number | null;
  isDemoData: boolean;
  modelId: string;
  modelName: string;
  quantity: number;
  imageUrl?: string;
  artworkVariant: ArtworkPreviewVariant;
}

export interface CustomerOrderInfo {
  fullName: string;
  phone: string;
  zone: string;
  address: string;
  notes: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  isEditablePlaceholder?: boolean;
}

export interface SiteConfig {
  brandName: string;
  slogan: string;
  logoPath: string;
  regionLabel: string;
  contact: {
    /** Número en formato internacional sin +, ej: "54911XXXXXXXX". Vacío hasta confirmar el definitivo. */
    whatsappNumber: string;
    whatsappDisplay: string;
    instagramHandle: string;
    instagramUrl: string;
    emailDisplay: string;
  };
  promo: {
    multiBuyTitle: string;
    multiBuyHeadline: string;
    multiBuyDescription: string;
    /** Porcentaje de descuento para 2 o más fundas (ej: 0.15 para 15%). Null hasta definir el definitivo. */
    twoUnitDiscountRate: number | null;
  };
  shippingInfo: string;
  pickupInfo: string;
  paymentInfo: string;
}
