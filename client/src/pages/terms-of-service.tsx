import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function TermsOfService() {
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By accessing and using ImageCraft Lite, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. Service Description</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                ImageCraft Lite is a web-based image editing application that provides:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Client-side image processing and editing tools</li>
                <li>Image resizing, filtering, and enhancement capabilities</li>
                <li>Format conversion and optimization features</li>
                <li>Professional-grade editing tools accessible through web browsers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                When using our service, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Use the service only for lawful purposes</li>
                <li>Not upload copyrighted images without proper authorization</li>
                <li>Not attempt to reverse engineer or compromise the service</li>
                <li>Respect the intellectual property rights of others</li>
                <li>Not use the service to create harmful or offensive content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Image Processing and Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                ImageCraft Lite processes images entirely within your browser:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Your images are never uploaded to our servers</li>
                <li>All processing happens locally on your device</li>
                <li>You retain full ownership and control of your images</li>
                <li>We do not store, access, or distribute your images</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. Service Availability</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                While we strive to maintain continuous service availability:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Service may be temporarily unavailable due to maintenance</li>
                <li>We do not guarantee uninterrupted access</li>
                <li>Features may be updated or modified without prior notice</li>
                <li>We reserve the right to suspend service if necessary</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                ImageCraft Lite is provided "as is" without any warranties:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>We are not liable for any data loss or corruption</li>
                <li>Users are responsible for backing up their work</li>
                <li>We do not guarantee specific results or outcomes</li>
                <li>Our liability is limited to the maximum extent permitted by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">7. Modifications to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">8. Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300">
                For questions about these Terms of Service, contact us at:{" "}
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