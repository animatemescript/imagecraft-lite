import { useState, useCallback, useRef } from 'react';
import type { 
  EditorState, 
  ImageFilters, 
  ImageDimensions, 
  ResizeSettings, 
  ExportSettings, 
  ToolType,
  ImageHistoryState,
  TransformOperation
} from '@/types/image-editor';
import { ImageProcessor, DEFAULT_FILTERS, SOCIAL_MEDIA_PRESETS } from '@/lib/image-processing';

const DEFAULT_RESIZE_SETTINGS: ResizeSettings = {
  width: 0,
  height: 0,
  lockAspectRatio: true,
  mode: 'pixels'
};

const DEFAULT_EXPORT_SETTINGS: ExportSettings = {
  format: 'original',
  quality: 90,
  fileSizeUnit: 'KB'
};

export const useImageEditor = () => {
  const [state, setState] = useState<EditorState>({
    originalImage: null,
    currentImage: null,
    canvas: null,
    context: null,
    filters: { ...DEFAULT_FILTERS },
    dimensions: { width: 0, height: 0 },
    resizeSettings: { ...DEFAULT_RESIZE_SETTINGS },
    exportSettings: { ...DEFAULT_EXPORT_SETTINGS },
    history: [],
    historyIndex: -1,
    isProcessing: false,
    selectedTool: null
  });

  const processorRef = useRef<ImageProcessor | null>(null);

  const initializeCanvas = useCallback((canvas: HTMLCanvasElement) => {
    console.log('Initializing canvas:', canvas);
    const context = canvas.getContext('2d');
    if (!context) {
      console.error('Failed to get canvas context');
      return;
    }

    setState(prev => ({ ...prev, canvas, context }));
    processorRef.current = new ImageProcessor(canvas);
    console.log('Canvas initialized successfully');
  }, []);

  const saveToHistory = useCallback(() => {
    if (!processorRef.current) return;

    const imageData = processorRef.current.getImageData();
    const historyState: ImageHistoryState = {
      imageData,
      filters: { ...state.filters },
      dimensions: { ...state.dimensions }
    };

    setState(prev => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(historyState);
      
      // Limit history to 20 items
      if (newHistory.length > 20) {
        newHistory.shift();
      }

      return {
        ...prev,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  }, [state.filters, state.dimensions]);

  const loadImage = useCallback(async (file: File) => {
    if (!processorRef.current) {
      console.error('Processor not initialized');
      return;
    }

    console.log('Loading image:', file.name, file.size);
    setState(prev => ({ ...prev, isProcessing: true }));

    try {
      const image = await processorRef.current.loadImage(file);
      console.log('Image loaded:', image.width, 'x', image.height);
      
      const dimensions = processorRef.current.setupCanvas(image);
      console.log('Canvas setup complete:', dimensions);
      
      setState(prev => ({
        ...prev,
        originalImage: image,
        currentImage: image,
        dimensions,
        resizeSettings: {
          ...prev.resizeSettings,
          width: dimensions.width,
          height: dimensions.height
        },
        filters: { ...DEFAULT_FILTERS },
        history: [],
        historyIndex: -1,
        isProcessing: false
      }));

      console.log('State updated with image');
      // Save initial state to history
      setTimeout(saveToHistory, 100);
    } catch (error) {
      console.error('Failed to load image:', error);
      setState(prev => ({ ...prev, isProcessing: false }));
      throw error;
    }
  }, [saveToHistory]);

  const updateFilter = useCallback((tool: ToolType, value: number) => {
    if (!state.originalImage || !processorRef.current) return;

    console.log(`Updating ${tool} filter to:`, value);
    
    const newFilters = { ...state.filters, [tool]: value };
    
    setState(prev => ({ ...prev, filters: newFilters, selectedTool: tool }));
    
    // Apply filters to the canvas immediately for real-time preview
    processorRef.current.applyFilters(state.originalImage, newFilters);
    
    // Trigger display canvas sync
    setTimeout(() => {
      const event = new CustomEvent('canvasTransformed');
      window.dispatchEvent(event);
      console.log(`${tool} filter applied and display synced`);
    }, 10);
    
    // Auto-save to history after filter change (debounced)
    setTimeout(() => {
      saveToHistory();
    }, 300);
  }, [state.originalImage, state.filters, saveToHistory]);

  const applyResize = useCallback(() => {
    if (!processorRef.current || !state.canvas || !state.originalImage) return;

    let newDimensions: ImageDimensions;

    if (state.resizeSettings.mode === 'percentage') {
      // Calculate new dimensions based on percentage
      const percentage = state.resizeSettings.width / 100;
      newDimensions = {
        width: Math.round(state.originalImage.width * percentage),
        height: Math.round(state.originalImage.height * percentage)
      };
      console.log('Applying percentage resize:', percentage * 100 + '%', newDimensions);
    } else {
      // Use pixel values directly
      newDimensions = {
        width: state.resizeSettings.width,
        height: state.resizeSettings.height
      };
      console.log('Applying pixel resize:', newDimensions);
    }

    processorRef.current.resize(newDimensions);
    
    setState(prev => ({
      ...prev,
      dimensions: newDimensions,
      resizeSettings: {
        ...prev.resizeSettings,
        width: newDimensions.width,
        height: newDimensions.height
      }
    }));

    // Trigger display canvas sync after resize
    setTimeout(() => {
      const event = new CustomEvent('canvasTransformed');
      window.dispatchEvent(event);
      console.log('Resize completed, display synced');
    }, 50);

    saveToHistory();
  }, [state.resizeSettings, state.canvas, state.originalImage, saveToHistory]);

  const applyTransform = useCallback((operation: TransformOperation) => {
    if (!processorRef.current || !state.canvas) return;

    console.log('Applying transform:', operation.type);
    
    processorRef.current.transform(operation);
    
    // Update dimensions after transform (especially important for rotations)
    setTimeout(() => {
      if (state.canvas) {
        const newDimensions = {
          width: state.canvas.width,
          height: state.canvas.height
        };
        
        setState(prev => ({
          ...prev,
          dimensions: newDimensions,
          resizeSettings: {
            ...prev.resizeSettings,
            width: newDimensions.width,
            height: newDimensions.height
          }
        }));
        
        console.log('Updated state dimensions after transform:', newDimensions);
      }
    }, 10);
    
    console.log('Transform operation completed:', operation.type);
    
    // Force display canvas update by triggering a custom event
    setTimeout(() => {
      const event = new CustomEvent('canvasTransformed');
      window.dispatchEvent(event);
      
      // Save to history after transform is complete
      setTimeout(() => {
        saveToHistory();
        console.log('Transform saved to history');
      }, 100);
    }, 50);
  }, [saveToHistory, state.canvas]);

  const updateResizeSettings = useCallback((updates: Partial<ResizeSettings>) => {
    setState(prev => {
      const newSettings = { ...prev.resizeSettings, ...updates };
      
      // Handle aspect ratio locking
      if (newSettings.lockAspectRatio && state.dimensions.width && state.dimensions.height) {
        const aspectRatio = processorRef.current?.calculateAspectRatio(state.dimensions) || 1;
        
        if (updates.width && !updates.height) {
          newSettings.height = Math.round(updates.width / aspectRatio);
        } else if (updates.height && !updates.width) {
          newSettings.width = Math.round(updates.height * aspectRatio);
        }
      }

      return { ...prev, resizeSettings: newSettings };
    });
  }, [state.dimensions]);

  const applySocialMediaPreset = useCallback((presetName: string) => {
    const preset = SOCIAL_MEDIA_PRESETS.find(p => p.name === presetName);
    if (!preset) {
      console.error('Social media preset not found:', presetName);
      return;
    }

    console.log('Applying social media preset:', presetName, preset);
    
    updateResizeSettings({
      width: preset.width,
      height: preset.height,
      mode: 'social',
      lockAspectRatio: false
    });
  }, [updateResizeSettings]);

  const updateExportSettings = useCallback((updates: Partial<ExportSettings>) => {
    setState(prev => ({
      ...prev,
      exportSettings: { ...prev.exportSettings, ...updates }
    }));
  }, []);

  const exportImage = useCallback(() => {
    if (!processorRef.current) return null;

    return processorRef.current.exportImage(state.exportSettings);
  }, [state.exportSettings]);

  const applyExportSettings = useCallback(() => {
    if (!processorRef.current) return;

    console.log('=== APPLYING EXPORT SETTINGS ===');
    console.log('Export settings:', state.exportSettings);
    console.log('Format:', state.exportSettings.format);
    console.log('Target file size:', state.exportSettings.targetFileSize, state.exportSettings.fileSizeUnit);
    
    // Export with current settings to test the compression
    const testExport = processorRef.current.exportImage(state.exportSettings);
    
    if (testExport && state.exportSettings.targetFileSize) {
      // Calculate actual file size for feedback
      const base64Data = testExport.split(',')[1];
      const currentSizeBytes = (base64Data.length * 3) / 4;
      const currentSizeKB = Math.round(currentSizeBytes / 1024);
      const targetKB = state.exportSettings.fileSizeUnit === 'MB' 
        ? state.exportSettings.targetFileSize * 1024 
        : state.exportSettings.targetFileSize;
      
      console.log(`=== EXPORT RESULT ===`);
      console.log(`Final size: ${currentSizeKB}KB`);
      console.log(`Target size: ${targetKB}KB`);
      console.log(`Success: ${currentSizeKB <= targetKB ? 'YES' : 'NO'}`);
    } else {
      console.log('Export completed without target file size');
    }
  }, [state.exportSettings]);

  const downloadImage = useCallback(() => {
    if (!processorRef.current) return;

    // Use the processor directly to ensure target file size is applied
    const dataUrl = processorRef.current.exportImage(state.exportSettings);
    if (!dataUrl) return;

    console.log('Downloading image with export settings:', state.exportSettings);

    const link = document.createElement('a');
    link.download = `imagecraft-edited.${state.exportSettings.format === 'original' ? 'png' : state.exportSettings.format}`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [state.exportSettings]);

  const undo = useCallback(() => {
    if (state.historyIndex <= 0 || !processorRef.current || !state.canvas) return;

    const prevState = state.history[state.historyIndex - 1];
    if (!prevState) return;

    console.log('Undoing to history index:', state.historyIndex - 1);

    const img = new Image();
    img.onload = () => {
      processorRef.current!.setupCanvas(img);
      setState(prev => ({
        ...prev,
        filters: { ...prevState.filters },
        dimensions: { ...prevState.dimensions },
        resizeSettings: {
          ...prev.resizeSettings,
          width: prevState.dimensions.width,
          height: prevState.dimensions.height
        },
        historyIndex: prev.historyIndex - 1
      }));
      
      // Trigger display canvas sync after undo
      setTimeout(() => {
        const event = new CustomEvent('canvasTransformed');
        window.dispatchEvent(event);
        console.log('Undo completed, display synced');
      }, 50);
    };
    img.src = prevState.imageData;
  }, [state.historyIndex, state.history, state.canvas]);

  const redo = useCallback(() => {
    if (state.historyIndex >= state.history.length - 1 || !processorRef.current || !state.canvas) return;

    const nextState = state.history[state.historyIndex + 1];
    if (!nextState) return;

    console.log('Redoing to history index:', state.historyIndex + 1);

    const img = new Image();
    img.onload = () => {
      processorRef.current!.setupCanvas(img);
      setState(prev => ({
        ...prev,
        filters: { ...nextState.filters },
        dimensions: { ...nextState.dimensions },
        resizeSettings: {
          ...prev.resizeSettings,
          width: nextState.dimensions.width,
          height: nextState.dimensions.height
        },
        historyIndex: prev.historyIndex + 1
      }));
      
      // Trigger display canvas sync after redo
      setTimeout(() => {
        const event = new CustomEvent('canvasTransformed');
        window.dispatchEvent(event);
        console.log('Redo completed, display synced');
      }, 50);
    };
    img.src = nextState.imageData;
  }, [state.historyIndex, state.history, state.canvas]);

  const resetFilters = useCallback(() => {
    if (!state.originalImage || !processorRef.current || !state.canvas) return;

    console.log('Resetting all filters and transformations to original state');
    
    // Get original image dimensions
    const originalDimensions = {
      width: state.originalImage.width,
      height: state.originalImage.height
    };
    
    // Reset canvas size to original dimensions
    state.canvas.width = originalDimensions.width;
    state.canvas.height = originalDimensions.height;
    
    // Clear the canvas completely
    const ctx = state.canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset any transformations
    }
    
    // Redraw the original image without any filters or transformations
    processorRef.current.applyFilters(state.originalImage, DEFAULT_FILTERS);
    
    // Reset all state to original values
    setState(prev => ({ 
      ...prev, 
      filters: { ...DEFAULT_FILTERS },
      dimensions: originalDimensions,
      resizeSettings: {
        ...prev.resizeSettings,
        width: originalDimensions.width,
        height: originalDimensions.height
      },
      selectedTool: null
    }));
    
    // Trigger display canvas sync with delay to ensure processing completes
    setTimeout(() => {
      const event = new CustomEvent('canvasTransformed');
      window.dispatchEvent(event);
      console.log('Reset completed - all filters and transformations cleared, original image restored');
    }, 100);
    
    // Save state to history
    setTimeout(() => {
      saveToHistory();
    }, 150);
  }, [state.originalImage, state.canvas, saveToHistory]);

  const deleteImage = useCallback(() => {
    setState(prev => ({
      ...prev,
      originalImage: null,
      currentImage: null,
      dimensions: { width: 0, height: 0 },
      filters: { ...DEFAULT_FILTERS },
      history: [],
      historyIndex: -1,
      selectedTool: null
    }));
    
    if (processorRef.current && state.canvas) {
      const ctx = state.canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
      }
    }
  }, [state.canvas]);

  const selectTool = useCallback((tool: ToolType | null) => {
    setState(prev => ({
      ...prev,
      selectedTool: prev.selectedTool === tool ? null : tool
    }));
  }, []);

  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  return {
    state,
    initializeCanvas,
    loadImage,
    updateFilter,
    applyResize,
    applyTransform,
    updateResizeSettings,
    applySocialMediaPreset,
    updateExportSettings,
    applyExportSettings,
    exportImage,
    downloadImage,
    undo,
    redo,
    resetFilters,
    deleteImage,
    selectTool,
    canUndo,
    canRedo,
    socialMediaPresets: SOCIAL_MEDIA_PRESETS
  };
};
