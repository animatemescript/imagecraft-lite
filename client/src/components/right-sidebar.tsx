import { useState } from 'react';
import { Download, ArrowRightFromLine as Expand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdPlaceholder } from '@/components/ad-placeholder';
import type { ResizeSettings, ExportSettings, SocialMediaPreset } from '@/types/image-editor';

interface RightSidebarProps {
  resizeSettings: ResizeSettings;
  exportSettings: ExportSettings;
  onResizeSettingsChange: (updates: Partial<ResizeSettings>) => void;
  onExportSettingsChange: (updates: Partial<ExportSettings>) => void;
  onApplyResize: () => void;
  onApplyExportSettings: () => void;
  onSocialPresetSelect: (presetName: string) => void;
  socialPresets: SocialMediaPreset[];
}

export function RightSidebar({
  resizeSettings,
  exportSettings,
  onResizeSettingsChange,
  onExportSettingsChange,
  onApplyResize,
  onApplyExportSettings,
  onSocialPresetSelect,
  socialPresets
}: RightSidebarProps) {
  const [resizeMode, setResizeMode] = useState<'pixels' | 'percentage' | 'social'>('pixels');
  const [percentageValue, setPercentageValue] = useState(100);

  return (
    <aside className="w-80 gradient-dark text-white shadow-xl hidden xl:block">
      <div className="p-4 space-y-6">
        
        {/* Resize Settings */}
        <div>
          <h3 className="text-green-300 font-semibold mb-4 text-sm uppercase tracking-wide flex items-center">
            <Expand className="w-4 h-4 mr-2" />
            Resize Settings
          </h3>
          
          {/* Resize Mode Tabs */}
          <Tabs value={resizeMode} onValueChange={(value) => setResizeMode(value as typeof resizeMode)}>
            <TabsList className="grid w-full grid-cols-3 bg-green-800/50">
              <TabsTrigger value="pixels" className="text-xs">By Size</TabsTrigger>
              <TabsTrigger value="percentage" className="text-xs">As %</TabsTrigger>
              <TabsTrigger value="social" className="text-xs">Social</TabsTrigger>
            </TabsList>

            <TabsContent value="pixels" className="space-y-4">
              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-green-300 text-xs mb-1">Width</Label>
                  <Input
                    type="number"
                    value={resizeSettings.width}
                    onChange={(e) => onResizeSettingsChange({ width: parseInt(e.target.value) || 0 })}
                    className="bg-green-800/50 border-green-700 text-white placeholder-green-400"
                    placeholder="Width"
                  />
                </div>
                <div>
                  <Label className="text-green-300 text-xs mb-1">Height</Label>
                  <Input
                    type="number"
                    value={resizeSettings.height}
                    onChange={(e) => onResizeSettingsChange({ height: parseInt(e.target.value) || 0 })}
                    className="bg-green-800/50 border-green-700 text-white placeholder-green-400"
                    placeholder="Height"
                  />
                </div>
              </div>

              {/* Lock Aspect Ratio */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lockAspect"
                  checked={resizeSettings.lockAspectRatio}
                  onCheckedChange={(checked) => onResizeSettingsChange({ lockAspectRatio: !!checked })}
                  className="border-green-700 data-[state=checked]:bg-green-600"
                />
                <Label htmlFor="lockAspect" className="text-sm cursor-pointer">
                  Lock Aspect Ratio
                </Label>
              </div>
            </TabsContent>

            <TabsContent value="percentage" className="space-y-4">
              <div>
                <Label className="text-green-300 text-xs mb-1">Scale Percentage</Label>
                <Input
                  type="number"
                  value={percentageValue}
                  onChange={(e) => {
                    const percentage = parseInt(e.target.value) || 100;
                    setPercentageValue(percentage);
                    onResizeSettingsChange({ 
                      mode: 'percentage',
                      width: percentage,
                      height: percentage
                    });
                  }}
                  className="bg-green-800/50 border-green-700 text-white placeholder-green-400"
                  placeholder="100"
                  min="1"
                  max="500"
                />
                <div className="text-xs text-green-400 mt-1">
                  100% = original size, 50% = half size, 200% = double size
                </div>
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-2">
              {socialPresets.map((preset) => (
                <Button
                  key={preset.name}
                  onClick={() => {
                    onSocialPresetSelect(preset.name);
                    setResizeMode('social');
                  }}
                  variant="ghost"
                  className="w-full text-left bg-green-800/50 hover:bg-green-700 text-white border-0 h-auto p-3"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-sm">{preset.name}</div>
                    <div className="text-xs text-green-400 font-mono">
                      {preset.width}×{preset.height}
                    </div>
                  </div>
                </Button>
              ))}
              
              {/* Show current selection if in social mode */}
              {resizeSettings.mode === 'social' && (
                <div className="mt-3 p-2 bg-green-900/50 rounded text-xs">
                  <div className="text-green-300">Selected:</div>
                  <div className="text-white font-mono">
                    {resizeSettings.width} × {resizeSettings.height} pixels
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Apply Resize Button */}
          <Button 
            onClick={onApplyResize}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white mt-4"
          >
            Apply Resize
          </Button>
        </div>

        {/* Export Settings */}
        <div>
          <h3 className="text-green-300 font-semibold mb-4 text-sm uppercase tracking-wide flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Settings
          </h3>

          {/* Target File Size */}
          <div className="mb-4">
            <Label className="text-green-300 text-xs mb-1">
              Target File Size <span className="text-green-500">(optional)</span>
            </Label>
            <div className="flex">
              <Input
                type="number"
                value={exportSettings.targetFileSize || ''}
                onChange={(e) => onExportSettingsChange({ 
                  targetFileSize: e.target.value ? parseInt(e.target.value) : undefined 
                })}
                className="flex-1 bg-green-800/50 border-green-700 rounded-r-none text-white placeholder-green-400"
                placeholder="Size"
              />
              <Select 
                value={exportSettings.fileSizeUnit} 
                onValueChange={(value: 'KB' | 'MB') => onExportSettingsChange({ fileSizeUnit: value })}
              >
                <SelectTrigger className="w-20 bg-green-800/50 border-green-700 rounded-l-none text-white border-l-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KB">KB</SelectItem>
                  <SelectItem value="MB">MB</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-green-400 mt-1">
              Set a max output file size. Works for JPEG, PNG, and WebP formats.
            </p>
          </div>

          {/* Save Format */}
          <div className="mb-4">
            <Label className="text-green-300 text-xs mb-1">Save Image As</Label>
            <Select 
              value={exportSettings.format} 
              onValueChange={(value: typeof exportSettings.format) => onExportSettingsChange({ format: value })}
            >
              <SelectTrigger className="w-full bg-green-800/50 border-green-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="original">Original</SelectItem>
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>



          {/* Apply Export Settings Button */}
          <Button 
            onClick={onApplyExportSettings}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
          >
            Apply Export Settings
          </Button>
        </div>

        {/* Sidebar Ad - Rectangle */}
        <div className="mt-6">
          <AdPlaceholder size="rectangle" label="Export Advertisement" />
        </div>

      </div>
    </aside>
  );
}
