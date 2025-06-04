import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/image-editor">
              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cookie Policy</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-8">
              <strong>Last updated:</strong> December 2024
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. What Are Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                ImageCraft Lite uses cookies to enhance your experience:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Remember your theme preferences (light/dark mode)</li>
                <li>Store your editor settings and tool configurations</li>
                <li>Maintain session information for better performance</li>
                <li>Analyze usage patterns to improve our service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. Types of Cookies We Use</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Essential Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  These cookies are necessary for the website to function properly:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Session management</li>
                  <li>Security features</li>
                  <li>Basic functionality</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Preference Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  These cookies remember your choices and preferences:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Theme settings (light/dark mode)</li>
                  <li>Language preferences</li>
                  <li>Tool configurations</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Analytics Cookies</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  These cookies help us understand how you use our service:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Page views and navigation patterns</li>
                  <li>Feature usage statistics</li>
                  <li>Performance monitoring</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Third-Party Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may use third-party services that set their own cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Google Analytics for usage statistics and insights</li>
                <li>Content delivery networks for improved performance</li>
                <li>Advertising partners for relevant ad delivery</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. Managing Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Use your browser settings to block or delete cookies</li>
                <li>Set your browser to notify you when cookies are being sent</li>
                <li>Use private browsing mode to prevent cookie storage</li>
                <li>Clear your browser's cache and cookies regularly</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                Please note that blocking cookies may affect the functionality of ImageCraft Lite and limit your user experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. Browser-Specific Instructions</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For detailed instructions on managing cookies in your specific browser:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
                <li>Firefox: Settings → Privacy & Security → Cookies and Site Data</li>
                <li>Safari: Preferences → Privacy → Manage Website Data</li>
                <li>Edge: Settings → Cookies and site permissions → Cookies and site data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">7. Updates to This Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">8. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about our use of cookies, please contact us at:{" "}
                <a 
                  href="mailto:animateme.productions@gmail.com" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  animateme.productions@gmail.com
                </a>
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}