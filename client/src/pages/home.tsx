import { Header } from '@/components/header';
import { AnnouncementBanner } from '@/components/announcement-banner';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import { Camera, Palette, Download, Zap, Users, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      <AnnouncementBanner />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Professional Image Editing
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600"> Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your images with powerful editing tools, filters, and effects. 
            No downloads required - edit directly in your browser with professional results.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/image-editor">
              <Button size="lg" className="px-8 py-3 text-lg">
                <Camera className="mr-2 h-5 w-5" />
                Start Editing
              </Button>
            </Link>
            <Link href="/help">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Palette className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>Advanced Filters</CardTitle>
                <CardDescription>
                  Apply professional-grade filters including brightness, contrast, saturation, and more
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>Transform Tools</CardTitle>
                <CardDescription>
                  Rotate, flip, and resize your images with precision controls and social media presets
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Download className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>Multiple Formats</CardTitle>
                <CardDescription>
                  Export in JPEG, PNG, WebP formats with quality controls up to 10MB file size
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-teal-600 mr-2" />
                <span className="text-4xl font-bold text-gray-900 dark:text-white">10K+</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Happy Users</p>
            </div>
            
            <div>
              <div className="flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-teal-600 mr-2" />
                <span className="text-4xl font-bold text-gray-900 dark:text-white">100K+</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Images Processed</p>
            </div>
            
            <div>
              <div className="flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-teal-600 mr-2" />
                <span className="text-4xl font-bold text-gray-900 dark:text-white">4.9</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-500 to-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Images?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust ImageCraft Lite for their image editing needs.
          </p>
          <Link href="/image-editor">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
              <Camera className="mr-2 h-5 w-5" />
              Start Editing Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}