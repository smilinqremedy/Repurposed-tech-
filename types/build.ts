export type BaseDevice = {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  year: number;
  previewImage: string;
};

export type ShellOption = {
  id: string;
  name: string;
  colorHex: string;
  priceModifier: number;
  material: string;
  badge?: string;
};

export type DisplayOption = {
  id: string;
  name: string;
  priceModifier: number;
  description: string;
  tech: string;
};

export type PowerOption = {
  id: string;
  name: string;
  priceModifier: number;
  capacity: string;
  batteryLife: string;
};

export type ExtraMod = {
  id: string;
  name: string;
  priceModifier: number;
  description: string;
};

export type CustomBuildConfig = {
  deviceId: string;
  shellId: string;
  displayId: string;
  powerId: string;
  selectedExtraIds: string[];
  customEngravingText?: string;
};
