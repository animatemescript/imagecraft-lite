import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  cookieConsent: boolean;
  analyticsEnabled: boolean;
  maxFileSize: number;
  imageCompression: boolean;
  defaultTheme: string;
}

interface SettingsContextType {
  appSettings: AppSettings;
  updateSettings: (newSettings: AppSettings) => void;
  loadSettings: () => void;
}

const defaultSettings: AppSettings = {
  siteName: 'ImageCraft Lite',
  siteDescription: 'Professional Image Editor',
  contactEmail: 'animateme.productions@gmail.com',
  cookieConsent: true,
  analyticsEnabled: false,
  maxFileSize: 50,
  imageCompression: true,
  defaultTheme: 'light'
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [appSettings, setAppSettings] = useState<AppSettings>(defaultSettings);

  const loadSettings = () => {
    try {
      const saved = localStorage.getItem('appSettings');
      if (saved) {
        const settings = JSON.parse(saved);
        setAppSettings({ ...defaultSettings, ...settings });
      }
    } catch (error) {
      console.error('Error loading app settings:', error);
    }
  };

  const updateSettings = (newSettings: AppSettings) => {
    setAppSettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
    
    // Dispatch custom event for same-tab real-time updates
    window.dispatchEvent(new CustomEvent('appSettingsChanged', { 
      detail: newSettings 
    }));
  };

  useEffect(() => {
    loadSettings();
    
    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'appSettings') {
        loadSettings();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <SettingsContext.Provider value={{ appSettings, updateSettings, loadSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}