import { Camera } from 'lucide-react';
import { Link } from 'wouter';
import { AdPlaceholder } from '@/components/ad-placeholder';
import logoImage from '@assets/imagecraft lite logo.png';

export function Footer() {
  return (
    <>
      {/* Footer Top Ad - Banner */}
      <div className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-3">
        <div className="container mx-auto flex justify-center">
          <AdPlaceholder size="banner" label="Footer Advertisement" />
        </div>
      </div>
      
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Brand Section */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center p-1">
                  <img 
                    src={logoImage} 
                    alt="ImageCraft Lite Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">ImageCraft Lite</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Professional image editing made simple. Transform your photos with our powerful online editor featuring advanced filters, resizing tools, and export options.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-gray-800 dark:text-white font-semibold mb-4 uppercase tracking-wide text-sm">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/image-editor" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                    Image Editor
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-gray-800 dark:text-white font-semibold mb-4 uppercase tracking-wide text-sm">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; 2024 ImageCraft Lite. All rights reserved. | Professional Image Editor
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}