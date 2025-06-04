export interface ImageFilters {
  brightness: number;
  grayscale: number;
  saturation: number;
  contrast: number;
  invert: number;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ResizeSettings {
  width: number;
  height: number;
  lockAspectRatio: boolean;
  mode: 'pixels' | 'percentage' | 'social';
}

export interface ExportSettings {
  format: 'original' | 'jpeg' | 'png' | 'webp';
  quality: number;
  targetFileSize?: number;
  fileSizeUnit: 'KB' | 'MB';
}

export interface SocialMediaPreset {
  name: string;
  width: number;
  height: number;
  description: string;
}

export interface ImageHistoryState {
  imageData: string;
  filters: ImageFilters;
  dimensions: ImageDimensions;
}

export interface TransformOperation {
  type: 'mirror' | 'mirror-rl' | 'mirror-rr' | 'rotate-left' | 'rotate-right' | 'flip-horizontal' | 'flip-vertical';
}

export type ToolType = keyof ImageFilters;

export interface EditorState {
  originalImage: HTMLImageElement | null;
  currentImage: HTMLImageElement | null;
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  filters: ImageFilters;
  dimensions: ImageDimensions;
  resizeSettings: ResizeSettings;
  exportSettings: ExportSettings;
  history: ImageHistoryState[];
  historyIndex: number;
  isProcessing: boolean;
  selectedTool: ToolType | null;
}
