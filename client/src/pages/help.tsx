import { Header } from '@/components/header';
import { AnnouncementBanner } from '@/components/announcement-banner';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Upload, Sliders, RotateCw, Download, Image, Settings, HelpCircle } from 'lucide-react';

export default function Help() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      <AnnouncementBanner />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <HelpCircle className="h-16 w-16 text-teal-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Help & Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn how to use ImageCraft Lite's powerful editing tools and features to transform your images.
          </p>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Getting Started
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Upload className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>1. Upload Image</CardTitle>
                <CardDescription>
                  Drag and drop or click to upload images up to 10MB in size
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Sliders className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>2. Apply Filters</CardTitle>
                <CardDescription>
                  Adjust brightness, contrast, saturation, and other filter settings
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <RotateCw className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>3. Transform</CardTitle>
                <CardDescription>
                  Rotate, flip, resize using transform tools and social presets
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Download className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>4. Export</CardTitle>
                <CardDescription>
                  Download your edited image in JPEG, PNG, or WebP format
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What image formats are supported?</AccordionTrigger>
              <AccordionContent>
                ImageCraft Lite supports uploading JPEG, PNG, WebP, and GIF images up to 10MB in size. 
                You can export your edited images in JPEG, PNG, or WebP formats with customizable quality settings.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I use the filter tools?</AccordionTrigger>
              <AccordionContent>
                After uploading an image, select any filter tool from the main editor (brightness, contrast, saturation, grayscale, or invert). 
                Use the slider to adjust the intensity from 0 to 200. Changes are applied in real-time, and you can undo/redo any changes.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>What are social media presets?</AccordionTrigger>
              <AccordionContent>
                Social media presets are pre-configured dimensions for popular platforms like Instagram (1080x1080), 
                Facebook cover (820x312), Twitter header (1500x500), and more. Select a preset to automatically resize your image to the optimal dimensions.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I undo changes to my image?</AccordionTrigger>
              <AccordionContent>
                Yes! ImageCraft Lite includes full undo/redo functionality. Use the undo and redo buttons in the left sidebar 
                to step back through your editing history. You can also use the reset button to return to the original image.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Is my data secure and private?</AccordionTrigger>
              <AccordionContent>
                All image processing happens entirely in your browser - no images are uploaded to our servers. 
                Your photos remain completely private and secure on your device throughout the editing process.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>How do I resize images?</AccordionTrigger>
              <AccordionContent>
                Use the resize settings in the right sidebar. You can resize by pixels, percentage, or select social media presets. 
                Toggle the aspect ratio lock to maintain proportions, or unlock it for custom dimensions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Feature Details */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Feature Guide
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Image className="h-8 w-8 text-teal-600 mb-2" />
                <CardTitle>Image Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li><strong>Brightness:</strong> Adjust image lightness from dark to bright</li>
                  <li><strong>Contrast:</strong> Control the difference between light and dark areas</li>
                  <li><strong>Saturation:</strong> Modify color intensity and vibrancy</li>
                  <li><strong>Grayscale:</strong> Convert to black and white with adjustable intensity</li>
                  <li><strong>Invert:</strong> Create negative effect by inverting colors</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Settings className="h-8 w-8 text-teal-600 mb-2" />
                <CardTitle>Transform Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li><strong>Flip Horizontal:</strong> Mirror image left to right</li>
                  <li><strong>Flip Vertical:</strong> Mirror image top to bottom</li>
                  <li><strong>Rotate Left:</strong> Rotate image 90 degrees counterclockwise</li>
                  <li><strong>Rotate Right:</strong> Rotate image 90 degrees clockwise</li>
                  <li><strong>Resize:</strong> Change dimensions with aspect ratio control</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-500 to-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Need More Help?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Get in touch with our support team.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Contact Support
              </Button>
            </Link>
            <Link href="/image-editor">
              <Button size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-teal-600">
                Try Editor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}