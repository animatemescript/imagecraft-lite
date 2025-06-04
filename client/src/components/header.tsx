import { Camera, Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { useSettings } from '@/contexts/settings-context';
import { Link } from 'wouter';
import logoImage from '@assets/imagecraft lite logo.png';
import { AdPlaceholder } from '@/components/ad-placeholder';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { appSettings } = useSettings();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <>
      {/* Header Top Ad - Leaderboard */}
      <div className="w-full bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-2">
        <div className="container mx-auto flex justify-center">
          <AdPlaceholder size="leaderboard" label="Header Advertisement" />
        </div>
      </div>
      
      <header className="gradient-teal shadow-lg relative z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link href="/image-editor" className="flex items-center space-x-4 hover:opacity-90 transition-opacity cursor-pointer">
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center p-2">
                <img 
                  src={logoImage} 
                  alt="ImageCraft Lite Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-white font-bold text-2xl hover:text-white/90 transition-colors">
                  {appSettings.siteName}
                </h1>
                <p className="text-white/80 text-base">{appSettings.siteDescription}</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/image-editor" className="text-white hover:text-white/80 font-medium transition-colors">
                Home
              </Link>
              <Link href="/help" className="text-white hover:text-white/80 font-medium transition-colors">
                Help
              </Link>
              <Link href="/contact" className="text-white hover:text-white/80 font-medium transition-colors">
                Contact
              </Link>
            </nav>

            {/* Theme Toggle */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-0 px-4 py-2 transition-all duration-300"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="hidden sm:inline ml-2 font-medium">
                  {isDark ? 'DAY' : 'NIGHT'}
                </span>
              </Button>
              
              {/* Mobile Menu Toggle */}
              <Button variant="ghost" size="sm" className="md:hidden text-white border-0">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}