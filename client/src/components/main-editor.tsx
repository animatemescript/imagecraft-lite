import { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Sun, 
  Camera, 
  Palette, 
  Droplets, 
  Contrast, 
  ArrowUpDown, 
  Eye, 
  Leaf,
  Download,
  Plus,
  X,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import type { ToolType } from '@/types/image-editor';

interface MainEditorProps {
  onImageUpload: (file: File) => void;
  onFilterChange: (tool: ToolType, value: number) => void;
  onDownload: () => void;
  onReset: () => void;
  onDelete: () => void;
  onToolSelect: (tool: ToolType | null) => void;
  hasImage: boolean;
  selectedTool: ToolType | null;
  filterValue: number;
  isProcessing: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const TOOLS: Array<{ key: ToolType; icon: React.ReactNode; label: string; color: string }> = [
  { key: 'brightness', icon: <Sun className="w-5 h-5" />, label: 'Brightness', color: 'yellow' },
  { key: 'grayscale', icon: <Palette className="w-5 h-5" />, label: 'Grayscale', color: 'gray' },
  { key: 'saturation', icon: <Droplets className="w-5 h-5" />, label: 'Saturation', color: 'orange' },
  { key: 'contrast', icon: <Contrast className="w-5 h-5" />, label: 'Contrast', color: 'green' },
  { key: 'invert', icon: <ArrowUpDown className="w-5 h-5" />, label: 'Invert', color: 'red' }
];

export function MainEditor({
  onImageUpload,
  onFilterChange,
  onDownload,
  onReset,
  onDelete,
  onToolSelect,
  hasImage,
  selectedTool,
  filterValue,
  isProcessing,
  canvasRef
}: MainEditorProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  const handleToolClick = useCallback((tool: ToolType) => {
    onToolSelect(tool);
  }, [onToolSelect]);

  // Sync the hidden processing canvas with the display canvas
  useEffect(() => {
    if (hasImage && canvasRef.current && displayCanvasRef.current) {
      const sourceCanvas = canvasRef.current;
      const displayCanvas = displayCanvasRef.current;
      const displayCtx = displayCanvas.getContext('2d');
      
      if (displayCtx && sourceCanvas.width > 0 && sourceCanvas.height > 0) {
        console.log('Syncing display canvas with processing canvas');
        displayCanvas.width = sourceCanvas.width;
        displayCanvas.height = sourceCanvas.height;
        displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
        displayCtx.drawImage(sourceCanvas, 0, 0);
        console.log('Display canvas updated');
      }
    }
  }, [hasImage, canvasRef, filterValue, selectedTool]);

  // Listen for transform events and sync immediately
  useEffect(() => {
    const handleCanvasTransformed = () => {
      console.log('Canvas transformed event received');
      if (hasImage && canvasRef.current && displayCanvasRef.current) {
        const sourceCanvas = canvasRef.current;
        const displayCanvas = displayCanvasRef.current;
        const displayCtx = displayCanvas.getContext('2d');
        
        if (displayCtx && sourceCanvas.width > 0 && sourceCanvas.height > 0) {
          console.log('Immediate sync after transform');
          displayCanvas.width = sourceCanvas.width;
          displayCanvas.height = sourceCanvas.height;
          displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
          displayCtx.drawImage(sourceCanvas, 0, 0);
        }
      }
    };

    window.addEventListener('canvasTransformed', handleCanvasTransformed);
    return () => window.removeEventListener('canvasTransformed', handleCanvasTransformed);
  }, [hasImage, canvasRef]);

  return (
    <main className="flex-1 flex flex-col">

      {/* Tool Bar */}
      <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-3 shadow-lg shadow-gray-300/50 dark:shadow-gray-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 overflow-x-auto">
            {TOOLS.map((tool) => (
              <Button
                key={tool.key}
                onClick={() => handleToolClick(tool.key)}
                variant="ghost"
                className={`flex flex-col items-center p-3 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors group text-gray-800 dark:text-white border-0 h-auto min-w-0 ${
                  selectedTool === tool.key ? 'bg-gray-300 dark:bg-gray-600' : ''
                }`}
              >
                <div className={`mb-1 group-hover:text-${tool.color}-400`}>
                  {tool.icon}
                </div>
                <span className="text-xs whitespace-nowrap">{tool.label}</span>
              </Button>
            ))}
            
            {/* Separator Line */}
            <div className="h-12 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>
            
            {/* Additional Action Buttons */}
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="ghost"
              className="flex flex-col items-center p-3 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors group text-gray-800 dark:text-white border-0 h-auto min-w-0"
            >
              <Plus className="w-5 h-5 mb-1 group-hover:text-blue-400" />
              <span className="text-xs whitespace-nowrap">Add Image</span>
            </Button>
            
            <Button
              onClick={onReset}
              disabled={!hasImage}
              variant="ghost"
              className="flex flex-col items-center p-3 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors group text-gray-800 dark:text-white border-0 h-auto min-w-0 disabled:opacity-50"
            >
              <RotateCcw className="w-5 h-5 mb-1 group-hover:text-green-400" />
              <span className="text-xs whitespace-nowrap">Reset</span>
            </Button>
            
            <Button
              onClick={onDelete}
              disabled={!hasImage}
              variant="ghost"
              className="flex flex-col items-center p-3 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors group text-gray-800 dark:text-white border-0 h-auto min-w-0 disabled:opacity-50"
            >
              <Trash2 className="w-5 h-5 mb-1 group-hover:text-red-400" />
              <span className="text-xs whitespace-nowrap">Delete</span>
            </Button>
          </div>
          
          <Button
            onClick={onDownload}
            disabled={!hasImage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors shadow-lg disabled:opacity-50"
          >
            <span>DOWNLOAD</span>
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>



      {/* Main Canvas Area */}
      <div className="flex-1 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          {!hasImage ? (
            /* Image Upload Zone */
            <div
              className={`w-full max-w-6xl h-[500px] border-4 border-dashed rounded-3xl bg-white dark:bg-gray-800 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${
                isDragOver 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-blue-400 hover:border-blue-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 border-2 border-gray-300 dark:border-gray-600 shadow-lg">
                <Plus className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                Drop Image Here
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">or</p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6">
                click to add image
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg px-4 py-3">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Supports: JPG, PNG, WebP, GIF</span>
                  <span>•</span>
                  <span className="font-medium">Max: 10MB</span>
                </div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </div>
          ) : (
            /* Display Canvas */
            <canvas
              ref={displayCanvasRef}
              className="max-w-full max-h-full object-contain shadow-2xl rounded-lg bg-white"
              style={{ 
                filter: isProcessing ? 'blur(2px)' : 'none',
                transition: 'filter 0.3s ease',
                display: 'block',
                minHeight: '200px',
                minWidth: '200px'
              }}
            />
          )}

          {/* Tool Control Popup */}
          {selectedTool && hasImage && (
            <Card className="absolute top-4 left-4 w-80 bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                    {selectedTool}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToolSelect(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ×
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px]">
                      Value:
                    </span>
                    <div className="flex-1">
                      <Slider
                        value={[filterValue]}
                        onValueChange={(value) => onFilterChange(selectedTool, value[0])}
                        min={0}
                        max={100}
                        step={1}
                        className="w-full [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&>.relative]:h-1.5"
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[40px] text-right">
                      {filterValue}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onFilterChange(selectedTool, 
                        selectedTool === 'brightness' || selectedTool === 'saturation' || selectedTool === 'contrast' ? 50 : 0)}
                      className="text-xs"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

    </main>
  );
}
