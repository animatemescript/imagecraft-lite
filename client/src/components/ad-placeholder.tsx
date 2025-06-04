import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  size: 'banner' | 'rectangle' | 'leaderboard' | 'sidebar';
  className?: string;
  label?: string;
}

const adSizes = {
  banner: { width: '728px', height: '90px', description: '728x90 Banner' },
  rectangle: { width: '300px', height: '250px', description: '300x250 Rectangle' },
  leaderboard: { width: '728px', height: '90px', description: '728x90 Leaderboard' },
  sidebar: { width: '160px', height: '600px', description: '160x600 Sidebar' }
};

export function AdPlaceholder({ size, className, label }: AdPlaceholderProps) {
  const [adsSettings, setAdsSettings] = useState<any>(null);
  const [adScriptLoaded, setAdScriptLoaded] = useState(false);
  const adConfig = adSizes[size];

  useEffect(() => {
    const loadAdsSettings = () => {
      try {
        const saved = localStorage.getItem('googleAdsSettings');
        if (saved) {
          const settings = JSON.parse(saved);
          setAdsSettings(settings);
        }
      } catch (error) {
        console.error('Error loading ads settings:', error);
      }
    };

    loadAdsSettings();
    
    // Listen for storage changes (when admin saves new settings)
    const handleStorageChange = () => {
      loadAdsSettings();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    // Load AdSense script if ads are enabled and publisher ID is available
    if (adsSettings?.isEnabled && adsSettings?.publisherId && !adScriptLoaded) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsSettings.publisherId}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => setAdScriptLoaded(true);
      document.head.appendChild(script);
    }
  }, [adsSettings, adScriptLoaded]);

  // Show real ads if enabled and ad units are configured
  if (adsSettings?.isEnabled && adScriptLoaded) {
    let adUnitCode = '';
    
    if (size === 'leaderboard' && adsSettings.headerAdUnit) {
      adUnitCode = adsSettings.headerAdUnit;
    } else if (size === 'banner' && adsSettings.footerAdUnit) {
      adUnitCode = adsSettings.footerAdUnit;
    } else if ((size === 'rectangle' || size === 'sidebar') && adsSettings.sidebarAdUnit) {
      adUnitCode = adsSettings.sidebarAdUnit;
    }

    if (adUnitCode) {
      return (
        <div 
          className={cn("flex items-center justify-center mx-auto", className)}
          style={{
            width: adConfig.width,
            height: adConfig.height,
            maxWidth: '100%'
          }}
        >
          <div 
            dangerouslySetInnerHTML={{ __html: adUnitCode }}
            className="w-full h-full flex items-center justify-center"
          />
        </div>
      );
    }
  }

  // Show placeholder when ads are disabled or not configured
  return (
    <div 
      className={cn(
        "border-2 border-dashed border-gray-300 dark:border-gray-600",
        "bg-gray-50 dark:bg-gray-800",
        "flex items-center justify-center",
        "text-gray-500 dark:text-gray-400",
        "text-sm font-medium",
        "mx-auto rounded-lg",
        className
      )}
      style={{
        width: adConfig.width,
        height: adConfig.height,
        maxWidth: '100%'
      }}
    >
      <div className="text-center p-4">
        <div className="font-medium">
          {label || 'Advertisement'}
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {adConfig.description}
        </div>
      </div>
    </div>
  );
}

// AdSense Script Component for head injection
export function AdSenseScript({ publisherId }: { publisherId?: string }) {
  if (!publisherId) return null;
  
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
    />
  );
}

// AdUnit Component for manual ad placement
export function AdUnit({ 
  publisherId, 
  adSlot, 
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' }
}: {
  publisherId: string;
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={publisherId}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive}
    />
  );
}