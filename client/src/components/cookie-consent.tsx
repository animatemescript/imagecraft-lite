import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Cookie, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  functional: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always required
  analytics: false,
  advertising: false,
  functional: false
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const saved = JSON.parse(consent);
      setPreferences(saved);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setPreferences(prefs);
    setShowBanner(false);
    setShowPreferences(false);
    
    // Trigger analytics and ad loading based on preferences
    if (prefs.analytics) {
      loadAnalytics();
    }
    if (prefs.advertising) {
      loadAdvertising();
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      advertising: true,
      functional: true
    };
    savePreferences(allAccepted);
  };

  const acceptNecessary = () => {
    savePreferences(defaultPreferences);
  };

  const loadAnalytics = () => {
    // Google Analytics 4 implementation
    if (typeof window !== 'undefined' && !window.gtag) {
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', 'GA_MEASUREMENT_ID');
    }
  };

  const loadAdvertising = () => {
    // Google AdSense implementation
    if (typeof window !== 'undefined' && !document.querySelector('.adsbygoogle-script')) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.className = 'adsbygoogle-script';
      script.setAttribute('data-ad-client', 'ca-pub-YOUR_PUBLISHER_ID');
      document.head.appendChild(script);
    }
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Cookie className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Cookie Settings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  We use cookies to enhance your experience, analyze site traffic, and serve personalized advertisements. 
                  Your privacy is important to us.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={acceptAll} className="bg-blue-600 hover:bg-blue-700">
                    Accept All
                  </Button>
                  <Button onClick={acceptNecessary} variant="outline">
                    Necessary Only
                  </Button>
                  <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Customize
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Cookie Preferences</DialogTitle>
                        <DialogDescription>
                          Choose which cookies you want to allow
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="necessary" className="flex-1">
                            <div className="font-medium">Necessary</div>
                            <div className="text-sm text-gray-500">Required for basic functionality</div>
                          </Label>
                          <Switch id="necessary" checked disabled />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="analytics" className="flex-1">
                            <div className="font-medium">Analytics</div>
                            <div className="text-sm text-gray-500">Help us improve our website</div>
                          </Label>
                          <Switch 
                            id="analytics" 
                            checked={preferences.analytics}
                            onCheckedChange={(checked) => 
                              setPreferences(prev => ({...prev, analytics: checked}))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="advertising" className="flex-1">
                            <div className="font-medium">Advertising</div>
                            <div className="text-sm text-gray-500">Personalized ads and content</div>
                          </Label>
                          <Switch 
                            id="advertising" 
                            checked={preferences.advertising}
                            onCheckedChange={(checked) => 
                              setPreferences(prev => ({...prev, advertising: checked}))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="functional" className="flex-1">
                            <div className="font-medium">Functional</div>
                            <div className="text-sm text-gray-500">Enhanced features and personalization</div>
                          </Label>
                          <Switch 
                            id="functional" 
                            checked={preferences.functional}
                            onCheckedChange={(checked) => 
                              setPreferences(prev => ({...prev, functional: checked}))
                            }
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button 
                          onClick={() => savePreferences(preferences)} 
                          className="flex-1"
                        >
                          Save Preferences
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowPreferences(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={acceptNecessary}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Hook to check cookie preferences
export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      setPreferences(JSON.parse(consent));
    }
  }, []);

  return preferences;
}

// Global types for AdSense and Analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    adsbygoogle: any[];
  }
}