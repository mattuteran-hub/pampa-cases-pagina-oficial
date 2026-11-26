import { Product, ProductCategory } from '../types/store';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Símbolos & Historia',
  'Buenos Aires & Urbano',
  'Costumbres & Mate',
  'Paisajes & Fauna',
  'Postales & Cultura',
];

/**
 * Catálogo inicial de Pampa Cases.
 * - El diseño "Sol de Mayo" utiliza la fotografía real del producto proporcionada por la marca.
 * - Los demás diseños son artículos de demostración claramente identificados (`isDemoData: true`)
 *   hasta cargar los precios, fotografías y stocks definitivos desde un futuro panel de administración.
 */
export const CATALOG_PRODUCTS: Product[] = [
  {
    id: 'bandera-sol-de-mayo',
    slug: 'sol-de-mayo',
    name: 'Sol de Mayo',
    collection: 'Emblema Nacional',
    category: 'Símbolos & Historia',
    description:
      'Funda en tonos celeste y blanco cálido con acabado texturado y el Sol de Mayo en dorado como protagonista central. Pensada para proteger tu iPhone en el uso diario con bordes elevados en módulo de cámaras y pantalla.',
    price: null,
    isDemoData: false,
    hasRealPhoto: true,
    imageUrl: '/assets/aistudio/Gemini_Generated_Image_x4wa2vx4wa2vx4wa_e6791fb7.jpg',
    gallery: [
      {
        id: 'vista-completa',
        label: 'Vista completa',
        imageUrl: '/assets/aistudio/Gemini_Generated_Image_x4wa2vx4wa2vx4wa_e6791fb7.jpg',
        cropPosition: 'center center',
        scale: 1,
      },
      {
        id: 'detalle-sol',
        label: 'Detalle Sol de Mayo',
        imageUrl: '/assets/aistudio/Gemini_Generated_Image_x4wa2vx4wa2vx4wa_e6791fb7.jpg',
        cropPosition: '50% 50%',
        scale: 1.9,
      },
      {
        id: 'detalle-camara',
        label: 'Protección de cámaras',
        imageUrl: '/assets/aistudio/Gemini_Generated_Image_x4wa2vx4wa2vx4wa_e6791fb7.jpg',
        cropPosition: '36% 22%',
        scale: 1.85,
      },
    ],
    artworkVariant: 'sol-de-mayo',
    availability: 'disponible',
    materialNote: 'Terminación texturada de tacto firme con interior protector y bordes elevados.',
    featured: true,
  },
  {
    id: 'demo-diagonal-norte',
    slug: 'diagonal-norte',
    name: 'Diagonal Norte',
    collection: 'Buenos Aires',
    category: 'Buenos Aires & Urbano',
    description:
      'Diseño de demostración inspirado en las líneas arquitectónicas del Obelisco y las diagonales porteñas. Composición limpia sobre fondo crema cálido con trazo celeste y detalles en dorado.',
    price: 22900,
    isDemoData: true,
    hasRealPhoto: false,
    artworkVariant: 'obelisco-diagonal',
    availability: 'disponible',
    materialNote: 'Especificación de material editable al cargar producto definitivo.',
    featured: true,
  },
  {
    id: 'demo-mate-manana',
    slug: 'mate-y-manana',
    name: 'Mate & Mañana',
    collection: 'Rituales',
    category: 'Costumbres & Mate',
    description:
      'Diseño de demostración dedicado a la pausa de todos los días: ilustración minimalista de mate y bombilla en dorado sobre tono crema, acompañado de líneas suaves.',
    price: 21500,
    isDemoData: true,
    hasRealPhoto: false,
    artworkVariant: 'mate-manana',
    availability: 'disponible',
    materialNote: 'Especificación de material editable al cargar producto definitivo.',
    featured: true,
  },
  {
    id: 'demo-fileteado-60',
    slug: 'fileteado-60',
    name: 'Línea 60',
    collection: 'Colectivos & Subtes',
    category: 'Buenos Aires & Urbano',
    description:
      'Diseño de demostración con guiño al transporte urbano de Buenos Aires y la geometría del fileteado porteño en versión contemporánea.',
    price: 22900,
    isDemoData: true,
    hasRealPhoto: false,
    artworkVariant: 'fileteado-colectivo',
    availability: 'consultar',
    materialNote: 'Especificación de material editable al cargar producto definitivo.',
  },
  {
    id: 'demo-cordillera-austral',
    slug: 'cordillera-austral',
    name: 'Cordillera Austral',
    collection: 'Norte y Sur',
    category: 'Paisajes & Fauna',
    description:
      'Diseño de demostración inspirado en las cumbres patagónicas y la geografía del sur argentino, reinterpretado con trazos editoriales en celeste y dorado.',
    price: 23500,
    isDemoData: true,
    hasRealPhoto: false,
    artworkVariant: 'cordillera-austral',
    availability: 'disponible',
    materialNote: 'Especificación de material editable al cargar producto definitivo.',
  },
  {
    id: 'demo-postal-san-telmo',
    slug: 'postal-san-telmo',
    name: 'Postal del Sur',
    collection: 'Postales Antiguas',
    category: 'Postales & Cultura',
    description:
      'Diseño de demostración inspirado en antiguas postales y sellos postales argentinos, con tipografía sobria y balance editorial.',
    price: 21900,
    isDemoData: true,
    hasRealPhoto: false,
    artworkVariant: 'postal-san-telmo',
    availability: 'proximamente',
    materialNote: 'Especificación de material editable al cargar producto definitivo.',
  },
];

export function getProductById(id: string): Product | undefined {
  return CATALOG_PRODUCTS.find((p) => p.id === id);
}
