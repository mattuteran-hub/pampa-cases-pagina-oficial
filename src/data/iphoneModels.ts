import { IPhoneModel, IPhoneStage } from '../types/store';

export interface StageMetadata {
  stage: IPhoneStage;
  title: string;
  rangeLabel: string;
  statusLabel: string;
  description: string;
}

export const IPHONE_STAGES: StageMetadata[] = [
  {
    stage: 1,
    title: 'Primera etapa',
    rangeLabel: 'iPhone 15 base hasta iPhone 17 Pro Max',
    statusLabel: 'Disponible ahora',
    description: 'Modelos habilitados actualmente para realizar pedidos.',
  },
  {
    stage: 2,
    title: 'Segunda etapa',
    rangeLabel: 'iPhone 13 base hasta iPhone 14 Pro Max',
    statusLabel: 'Próximamente',
    description: 'Se incorporarán en la segunda etapa de lanzamiento.',
  },
  {
    stage: 3,
    title: 'Tercera etapa',
    rangeLabel: 'Desde iPhone 7 hasta iPhone 12 Pro Max',
    statusLabel: 'Próximamente',
    description: 'Previstos para la tercera etapa de expansión del catálogo.',
  },
];

/**
 * Registro centralizado de modelos de iPhone.
 * Para habilitar o deshabilitar un modelo en toda la tienda, basta con cambiar `enabled`.
 */
export const IPHONE_MODELS: IPhoneModel[] = [
  // Primera etapa (Habilitados)
  { id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', family: 'Serie 17', stage: 1, enabled: true },
  { id: 'iphone-17-pro', name: 'iPhone 17 Pro', family: 'Serie 17', stage: 1, enabled: true },
  { id: 'iphone-17-plus', name: 'iPhone 17 Plus / Air', family: 'Serie 17', stage: 1, enabled: true },
  { id: 'iphone-17', name: 'iPhone 17', family: 'Serie 17', stage: 1, enabled: true },

  { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', family: 'Serie 16', stage: 1, enabled: true },
  { id: 'iphone-16-pro', name: 'iPhone 16 Pro', family: 'Serie 16', stage: 1, enabled: true },
  { id: 'iphone-16-plus', name: 'iPhone 16 Plus', family: 'Serie 16', stage: 1, enabled: true },
  { id: 'iphone-16', name: 'iPhone 16', family: 'Serie 16', stage: 1, enabled: true },

  { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', family: 'Serie 15', stage: 1, enabled: true },
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', family: 'Serie 15', stage: 1, enabled: true },
  { id: 'iphone-15-plus', name: 'iPhone 15 Plus', family: 'Serie 15', stage: 1, enabled: true },
  { id: 'iphone-15', name: 'iPhone 15', family: 'Serie 15', stage: 1, enabled: true },

  // Segunda etapa (Próximamente)
  { id: 'iphone-14-pro-max', name: 'iPhone 14 Pro Max', family: 'Serie 14', stage: 2, enabled: false },
  { id: 'iphone-14-pro', name: 'iPhone 14 Pro', family: 'Serie 14', stage: 2, enabled: false },
  { id: 'iphone-14-plus', name: 'iPhone 14 Plus', family: 'Serie 14', stage: 2, enabled: false },
  { id: 'iphone-14', name: 'iPhone 14', family: 'Serie 14', stage: 2, enabled: false },
  { id: 'iphone-13-pro-max', name: 'iPhone 13 Pro Max', family: 'Serie 13', stage: 2, enabled: false },
  { id: 'iphone-13-pro', name: 'iPhone 13 Pro', family: 'Serie 13', stage: 2, enabled: false },
  { id: 'iphone-13-mini', name: 'iPhone 13 mini', family: 'Serie 13', stage: 2, enabled: false },
  { id: 'iphone-13', name: 'iPhone 13', family: 'Serie 13', stage: 2, enabled: false },

  // Tercera etapa (Próximamente)
  { id: 'iphone-12-series', name: 'iPhone 12 / 12 mini / Pro / Pro Max', family: 'Serie 12', stage: 3, enabled: false },
  { id: 'iphone-11-series', name: 'iPhone 11 / 11 Pro / Pro Max', family: 'Serie 11', stage: 3, enabled: false },
  { id: 'iphone-x-series', name: 'iPhone X / XS / XS Max / XR', family: 'Serie X', stage: 3, enabled: false },
  { id: 'iphone-se-series', name: 'iPhone SE (2da y 3ra gen.)', family: 'Serie SE', stage: 3, enabled: false },
  { id: 'iphone-7-8-series', name: 'iPhone 7 / 7 Plus / 8 / 8 Plus', family: 'Series 7 y 8', stage: 3, enabled: false },
];

export function getEnabledModels(): IPhoneModel[] {
  return IPHONE_MODELS.filter((m) => m.enabled);
}

export function getModelById(id: string): IPhoneModel | undefined {
  return IPHONE_MODELS.find((m) => m.id === id);
}

export function getModelsByStage(stage: IPhoneStage): IPhoneModel[] {
  return IPHONE_MODELS.filter((m) => m.stage === stage);
}
