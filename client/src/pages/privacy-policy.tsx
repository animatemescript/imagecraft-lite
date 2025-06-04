import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function PrivacyPolicy() {
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                ImageCraft Lite is designed with privacy in mind. We collect minimal information to provide our image editing services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Images you upload for editing (processed locally in your browser)</li>
                <li>Basic usage analytics to improve our service</li>
                <li>Technical information such as browser type and device information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your uploaded images are processed entirely in your browser. We do not store, transmit, or have access to your images. Other information is used to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Provide and maintain our image editing service</li>
                <li>Improve user experience and service functionality</li>
                <li>Analyze usage patterns to enhance our features</li>
                <li>Communicate with you about service updates</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We implement appropriate security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>All image processing happens locally in your browser</li>
                <li>We use HTTPS encryption for all data transmission</li>
                <li>Regular security updates and monitoring</li>
                <li>Limited data collection and retention policies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Third-Party Services</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may use third-party services that have their own privacy policies:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Google Analytics for usage statistics</li>
                <li>Hosting providers for service delivery</li>
                <li>Content delivery networks for performance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. Your Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Access information we have about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of certain data collection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about this Privacy Policy, please contact us at:{" "}
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