import type { ImageFilters, ImageDimensions, ExportSettings, TransformOperation } from '@/types/image-editor';

export class ImageProcessor {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context from canvas');
    }
    this.context = ctx;
  }

  loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Invalid file type. Please select an image file.'));
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        reject(new Error('File size too large. Maximum 10MB supported.'));
        return;
      }

      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  setupCanvas(image: HTMLImageElement): ImageDimensions {
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(image, 0, 0);
    
    return { width: image.width, height: image.height };
  }

  applyFilters(image: HTMLImageElement, filters: ImageFilters): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Build CSS filter string
    const filterParts: string[] = [];
    
    // Convert 0-100 range to appropriate CSS filter values
    // Brightness: 50 = 100% (neutral), 0 = 0%, 100 = 200%
    const brightnessValue = filters.brightness * 2;
    filterParts.push(`brightness(${brightnessValue}%)`);
    
    // Contrast: 50 = 100% (neutral), 0 = 0%, 100 = 200%  
    const contrastValue = filters.contrast * 2;
    filterParts.push(`contrast(${contrastValue}%)`);
    
    // Saturation: 50 = 100% (neutral), 0 = 0%, 100 = 200%
    const saturationValue = filters.saturation * 2;
    filterParts.push(`saturate(${saturationValue}%)`);
    
    // Grayscale: 0-100 maps directly to 0-100%
    filterParts.push(`grayscale(${filters.grayscale}%)`);
    
    // Invert: 0-100 maps directly to 0-100%
    filterParts.push(`invert(${filters.invert}%)`);

    const filterString = filterParts.join(' ');
    console.log('Applying filters:', filterString);
    
    this.context.filter = filterString;
    this.context.drawImage(image, 0, 0);
    this.context.filter = 'none';
  }

  resize(newDimensions: ImageDimensions): void {
    const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    
    this.canvas.width = newDimensions.width;
    this.canvas.height = newDimensions.height;
    
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;
    tempCtx.putImageData(imageData, 0, 0);
    
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(tempCanvas, 0, 0, newDimensions.width, newDimensions.height);
  }

  transform(operation: TransformOperation): void {
    // Create temporary canvas to store current state
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    
    // Copy current canvas content to temp canvas
    tempCtx.drawImage(this.canvas, 0, 0);
    
    // Clear the main canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    
    switch (operation.type) {
      case 'mirror':
      case 'flip-horizontal':
        console.log('Performing flip horizontal');
        this.context.save();
        this.context.scale(-1, 1);
        this.context.drawImage(tempCanvas, -this.canvas.width, 0);
        this.context.restore();
        break;
        
      case 'mirror-rl':
      case 'flip-vertical':
        console.log('Performing flip vertical');
        this.context.save();
        this.context.scale(1, -1);
        this.context.drawImage(tempCanvas, 0, -this.canvas.height);
        this.context.restore();
        break;
        
      case 'rotate-left':
        console.log('Performing rotate left');
        const newWidth = this.canvas.height;
        const newHeight = this.canvas.width;
        
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
        
        this.context.save();
        this.context.translate(newWidth / 2, newHeight / 2);
        this.context.rotate(-Math.PI / 2);
        this.context.drawImage(tempCanvas, -tempCanvas.width / 2, -tempCanvas.height / 2);
        this.context.restore();
        break;
        
      case 'rotate-right':
        console.log('Performing rotate right');
        const newWidthR = this.canvas.height;
        const newHeightR = this.canvas.width;
        
        this.canvas.width = newWidthR;
        this.canvas.height = newHeightR;
        
        this.context.save();
        this.context.translate(newWidthR / 2, newHeightR / 2);
        this.context.rotate(Math.PI / 2);
        this.context.drawImage(tempCanvas, -tempCanvas.width / 2, -tempCanvas.height / 2);
        this.context.restore();
        break;
    }
  }

  exportImage(exportSettings: ExportSettings): string {
    const format = exportSettings.format === 'original' ? 'image/png' : `image/${exportSettings.format}`;
    
    // If target file size is specified, optimize for that size
    if (exportSettings.targetFileSize) {
      return this.exportWithTargetSize(format, exportSettings);
    }
    
    const quality = exportSettings.format === 'jpeg' ? exportSettings.quality / 100 : undefined;
    return this.canvas.toDataURL(format, quality);
  }

  private exportWithTargetSize(format: string, exportSettings: ExportSettings): string {
    const targetSizeBytes = exportSettings.targetFileSize! * (exportSettings.fileSizeUnit === 'MB' ? 1024 * 1024 : 1024);
    
    console.log(`=== TARGET SIZE COMPRESSION START ===`);
    console.log(`Format: ${exportSettings.format} -> ${format}`);
    console.log(`Target: ${exportSettings.targetFileSize} ${exportSettings.fileSizeUnit} = ${targetSizeBytes} bytes`);
    
    // Use the same successful approach for all formats
    if (exportSettings.format === 'original' || format === 'image/png') {
      return this.compressWithResizing('image/png', targetSizeBytes);
    } else if (format === 'image/jpeg') {
      // Use the same precise resizing approach that works for original
      return this.compressWithResizing('image/jpeg', targetSizeBytes);
    } else if (format === 'image/webp') {
      // Use the same precise resizing approach that works for original and JPEG
      return this.compressWithResizing('image/webp', targetSizeBytes);
    } else {
      // Fallback to resizing for unknown formats
      return this.compressWithResizing(format, targetSizeBytes);
    }
  }



  private compressWithResizing(format: string, targetSizeBytes: number): string {
    console.log(`Using resize compression for ${format}, target: ${Math.round(targetSizeBytes/1024)}KB`);
    
    const originalWidth = this.canvas.width;
    const originalHeight = this.canvas.height;
    
    // Create temporary canvas for resizing
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    
    // For very small targets, use aggressive scaling
    const targetKB = targetSizeBytes / 1024;
    let minScale = targetKB < 50 ? 0.05 : 0.1; // Start much smaller for tiny targets
    let maxScale = 1.0;
    let bestResult = '';
    let bestDifference = Infinity;
    
    for (let iteration = 0; iteration < 20; iteration++) {
      const scale = (minScale + maxScale) / 2;
      const newWidth = Math.max(1, Math.round(originalWidth * scale));
      const newHeight = Math.max(1, Math.round(originalHeight * scale));
      
      tempCanvas.width = newWidth;
      tempCanvas.height = newHeight;
      
      // Clear and draw scaled image
      tempCtx.clearRect(0, 0, newWidth, newHeight);
      tempCtx.drawImage(this.canvas, 0, 0, originalWidth, originalHeight, 0, 0, newWidth, newHeight);
      
      const result = tempCanvas.toDataURL(format);
      
      const base64Data = result.split(',')[1];
      const currentSizeBytes = (base64Data.length * 3) / 4;
      const currentSizeKB = Math.round(currentSizeBytes / 1024);
      const difference = Math.abs(currentSizeBytes - targetSizeBytes);
      
      console.log(`Scale ${Math.round(scale * 100)}% (${newWidth}x${newHeight}): ${currentSizeKB}KB (target: ${Math.round(targetKB)}KB)`);
      
      // Keep track of closest result
      if (difference < bestDifference) {
        bestResult = result;
        bestDifference = difference;
      }
      
      // For small targets, accept larger tolerance
      const tolerance = targetKB < 50 ? 0.15 : 0.05; // 15% for small, 5% for large
      if (difference <= targetSizeBytes * tolerance) {
        console.log(`Target achieved at scale ${Math.round(scale * 100)}%`);
        return result;
      }
      
      // Adjust search range
      if (currentSizeBytes > targetSizeBytes) {
        maxScale = scale; // File too big, reduce scale
      } else {
        minScale = scale; // File too small, increase scale
      }
      
      // Stop if range is too narrow or scale too small
      if (maxScale - minScale < 0.005 || minScale < 0.02) break;
    }
    
    const finalBase64 = bestResult.split(',')[1];
    const finalSizeKB = Math.round(((finalBase64.length * 3) / 4) / 1024);
    console.log(`Resize compression final: ${finalSizeKB}KB (diff: ${Math.round(bestDifference/1024)}KB)`);
    
    return bestResult;
  }



  getImageData(): string {
    return this.canvas.toDataURL();
  }

  calculateAspectRatio(dimensions: ImageDimensions): number {
    return dimensions.width / dimensions.height;
  }

  maintainAspectRatio(newWidth: number, aspectRatio: number): ImageDimensions {
    return {
      width: newWidth,
      height: Math.round(newWidth / aspectRatio)
    };
  }

  maintainAspectRatioByHeight(newHeight: number, aspectRatio: number): ImageDimensions {
    return {
      width: Math.round(newHeight * aspectRatio),
      height: newHeight
    };
  }
}

export const SOCIAL_MEDIA_PRESETS = [
  { name: 'Instagram Square', width: 1080, height: 1080, description: '1080 × 1080px' },
  { name: 'Instagram Story', width: 1080, height: 1920, description: '1080 × 1920px' },
  { name: 'Facebook Cover', width: 1200, height: 630, description: '1200 × 630px' },
  { name: 'Twitter Header', width: 1500, height: 500, description: '1500 × 500px' },
  { name: 'LinkedIn Banner', width: 1584, height: 396, description: '1584 × 396px' },
  { name: 'YouTube Thumbnail', width: 1280, height: 720, description: '1280 × 720px' }
];

export const DEFAULT_FILTERS: ImageFilters = {
  brightness: 50,
  grayscale: 0,
  saturation: 50,
  contrast: 50,
  invert: 0
};
