import { 
  RotateCcw, 
  RotateCw, 
  Undo, 
  FlipHorizontal,
  FlipVertical,
  Redo
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useImageEditor } from '@/hooks/use-image-editor';
import { AdPlaceholder } from '@/components/ad-placeholder';

interface LeftSidebarProps {
  onTransform: (operation: string) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  dimensions: { width: number; height: number };
}

export function LeftSidebar({ 
  onTransform, 
  canUndo, 
  canRedo, 
  onUndo, 
  onRedo, 
  dimensions 
}: LeftSidebarProps) {
  return (
    <aside className="w-64 gradient-dark text-white shadow-xl hidden lg:block">
      <div className="p-4">
        {/* Transform Section */}
        <div className="mb-6">
          <h3 className="text-green-300 font-semibold mb-3 text-sm uppercase tracking-wide">
            Transform
          </h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Button
              onClick={() => onTransform('flip-horizontal')}
              variant="ghost"
              className="bg-green-700/50 hover:bg-green-600 p-3 rounded transition-colors flex flex-col items-center text-white border-0 h-auto"
            >
              <FlipHorizontal className="w-5 h-5 mb-1" />
              <span className="text-xs">Flip H</span>
            </Button>
            <Button
              onClick={() => onTransform('flip-vertical')}
              variant="ghost"
              className="bg-green-700/50 hover:bg-green-600 p-3 rounded transition-colors flex flex-col items-center text-white border-0 h-auto"
            >
              <FlipVertical className="w-5 h-5 mb-1" />
              <span className="text-xs">Flip V</span>
            </Button>
            <Button
              onClick={() => onTransform('rotate-left')}
              variant="ghost"
              className="bg-green-700/50 hover:bg-green-600 p-3 rounded transition-colors flex flex-col items-center text-white border-0 h-auto"
            >
              <RotateCcw className="w-5 h-5 mb-1" />
              <span className="text-xs">Rotate L</span>
            </Button>
            <Button
              onClick={() => onTransform('rotate-right')}
              variant="ghost"
              className="bg-green-700/50 hover:bg-green-600 p-3 rounded transition-colors flex flex-col items-center text-white border-0 h-auto"
            >
              <RotateCw className="w-5 h-5 mb-1" />
              <span className="text-xs">Rotate R</span>
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            onClick={onUndo}
            disabled={!canUndo}
            variant="ghost"
            className="bg-green-700/50 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded transition-colors flex flex-col items-center text-white border-0 h-auto"
          >
            <Undo className="w-5 h-5 mb-1" />
            <span className="text-xs">Undo</span>
          </Button>
          <Button
            onClick={onRedo}
            disabled={!canRedo}
            variant="ghost"
            className="bg-green-700/50 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded transition-colors flex flex-col items-center text-white border-0 h-auto"
          >
            <Redo className="w-5 h-5 mb-1" />
            <span className="text-xs">Redo</span>
          </Button>
        </div>

        {/* Size Display */}
        <div className="border-t border-green-700 pt-4">
          <div className="text-green-300 text-sm mb-2">Current Size</div>
          <div className="text-white font-mono text-lg">
            {dimensions.width} × {dimensions.height}px
          </div>
        </div>

        {/* Sidebar Ad - Rectangle */}
        <div className="mt-6">
          <AdPlaceholder size="rectangle" label="Tools Advertisement" />
        </div>

      </div>
    </aside>
  );
}
