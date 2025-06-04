import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { AnnouncementBanner } from '@/components/announcement-banner';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, ExternalLink } from 'lucide-react';

export default function Contact() {
  const [contactEmail, setContactEmail] = useState('animateme.productions@gmail.com');

  useEffect(() => {
    const loadContactEmail = () => {
      try {
        const saved = localStorage.getItem('appSettings');
        if (saved) {
          const settings = JSON.parse(saved);
          if (settings.contactEmail) {
            setContactEmail(settings.contactEmail);
          }
        }
      } catch (error) {
        console.error('Error loading contact email:', error);
      }
    };

    loadContactEmail();
    
    // Listen for storage changes when admin saves settings
    const handleStorageChange = () => {
      loadContactEmail();
    };
    
    // Listen for custom event for same-tab updates
    const handleAppSettingsChanged = (event: any) => {
      const newSettings = event.detail;
      if (newSettings.contactEmail) {
        setContactEmail(newSettings.contactEmail);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('appSettingsChanged', handleAppSettingsChanged);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('appSettingsChanged', handleAppSettingsChanged);
    };
  }, []);

  const handleDirectEmail = () => {
    window.location.href = `mailto:${contactEmail}?subject=ImageCraft Lite Support&body=Hello ImageCraft Lite Team,%0D%0A%0D%0AI would like to get in touch regarding:%0D%0A%0D%0A[Please describe your inquiry here]%0D%0A%0D%0AThank you!`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      <AnnouncementBanner />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <MessageCircle className="h-16 w-16 text-teal-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions about ImageCraft Lite? Need technical support? We're here to help you.
          </p>
        </div>
      </section>



      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Email */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <CardDescription>
                  Send us an email and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Mail className="h-16 w-16 text-teal-600 mx-auto mb-6" />
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Email Us Directly
                  </h3>
                  <p className="text-lg text-teal-600 font-medium mb-6">
                    {contactEmail}
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="px-8 py-3 text-lg"
                  onClick={handleDirectEmail}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Send Email
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Get in touch with us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-teal-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email</p>
                    <p className="text-gray-600 dark:text-gray-300">animateme.productions@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-teal-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                    <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-teal-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Address</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 Tech Street<br />
                      Digital City, DC 12345<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-teal-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Business Hours</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday - Sunday: 10:00 AM - 4:00 PM<br />
                      (EST Timezone)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  For faster support, please include:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Your browser type and version</li>
                  <li>• Description of the issue</li>
                  <li>• Steps to reproduce the problem</li>
                  <li>• Screenshot if applicable</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Common questions and answers
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/help">View Help Documentation</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}