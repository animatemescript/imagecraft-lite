import { useState, useEffect } from 'react';
import { Camera, Save, Upload, Link as LinkIcon, Image as ImageIcon, MessageSquare, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAnnouncementSettings, saveAnnouncementSettings, type AnnouncementSettings } from '@/lib/announcement-store';
import { useSettings } from '@/contexts/settings-context';
import { Link, useLocation } from 'wouter';

export default function AdminPanel() {
  const { appSettings, updateSettings } = useSettings();
  const [, setLocation] = useLocation();

  // Check authentication on component mount
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    const loginTime = sessionStorage.getItem('adminLoginTime');
    
    if (!isAuthenticated || !loginTime) {
      setLocation('/admin-login');
      return;
    }
    
    // Check if session expired (24 hours)
    const sessionAge = Date.now() - parseInt(loginTime);
    const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (sessionAge > maxSessionAge) {
      sessionStorage.removeItem('adminAuthenticated');
      sessionStorage.removeItem('adminLoginTime');
      setLocation('/admin-login');
      return;
    }
  }, [setLocation]);
  
  const [announcement, setAnnouncement] = useState<AnnouncementSettings>({
    type: 'text',
    title: '',
    content: '',
    linkUrl: '',
    imageUrl: '',
    isActive: false
  });

  const [googleAdsSettings, setGoogleAdsSettings] = useState({
    publisherId: '',
    headerAdUnit: '',
    footerAdUnit: '',
    sidebarAdUnit: '',
    isEnabled: false
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getAnnouncementSettings();
        setAnnouncement(settings);
      } catch (error) {
        console.error('Error loading announcement settings:', error);
      }
    };
    
    loadSettings();
  }, []);

  useEffect(() => {
    const loadGoogleAdsSettings = () => {
      try {
        const saved = localStorage.getItem('googleAdsSettings');
        if (saved) {
          setGoogleAdsSettings(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading Google Ads settings:', error);
      }
    };
    
    const loadAppSettings = () => {
      try {
        const saved = localStorage.getItem('appSettings');
        if (saved) {
          // Don't call updateSettings in useEffect to avoid infinite loop
          // Settings are already loaded by context provider
          console.log('App settings loaded from localStorage:', JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading app settings:', error);
      }
    };
    
    loadGoogleAdsSettings();
    loadAppSettings();
  }, []);

  const handleAnnouncementChange = (field: keyof AnnouncementSettings, value: string | boolean) => {
    setAnnouncement(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGoogleAdsChange = (field: keyof typeof googleAdsSettings, value: string | boolean) => {
    setGoogleAdsSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAnnouncement(prev => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAppSettingsChange = (field: keyof typeof appSettings, value: string | boolean | number) => {
    const newSettings = {
      ...appSettings,
      [field]: value
    };
    updateSettings(newSettings);
  };

  const handleSaveGoogleAds = () => {
    try {
      localStorage.setItem('googleAdsSettings', JSON.stringify(googleAdsSettings));
      alert('Google AdSense settings saved successfully! Real ads will now appear on all pages.');
    } catch (error) {
      console.error('Error saving Google Ads settings:', error);
      alert('Error saving Google Ads settings');
    }
  };

  const handleSaveAppSettings = () => {
    try {
      // Settings are already saved through context in real-time
      alert('Application settings saved successfully!');
    } catch (error) {
      console.error('Error saving app settings:', error);
      alert('Error saving app settings');
    }
  };

  const handleExportSettings = () => {
    try {
      const allSettings = {
        appSettings,
        googleAdsSettings,
        announcement
      };
      const dataStr = JSON.stringify(allSettings, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'imagecraft-settings.json';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting settings:', error);
      alert('Error exporting settings');
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      sessionStorage.removeItem('adminAuthenticated');
      sessionStorage.removeItem('adminLoginTime');
      setLocation('/admin-login');
    }
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings? This action cannot be undone.')) {
      localStorage.removeItem('appSettings');
      localStorage.removeItem('googleAdsSettings');
      const defaultSettings = {
        siteName: 'ImageCraft Lite',
        siteDescription: 'Professional Image Editor - Transform your photos with powerful online editing tools',
        contactEmail: 'animateme.productions@gmail.com',
        cookieConsent: true,
        analyticsEnabled: false,
        maxFileSize: 50,
        imageCompression: true,
        defaultTheme: 'light'
      };
      updateSettings(defaultSettings);
      setGoogleAdsSettings({
        publisherId: '',
        headerAdUnit: '',
        footerAdUnit: '',
        sidebarAdUnit: '',
        isEnabled: false
      });
      alert('All settings have been reset to default values.');
    }
  };

  const handleSave = async () => {
    try {
      await saveAnnouncementSettings(announcement);
      alert('Announcement settings saved successfully! Changes will appear on the main page.');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="gradient-teal shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center">
                <Camera className="text-teal-600 w-6 h-6" />
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">Admin Panel</h1>
                <p className="text-white/80 text-sm">ImageCraft Lite Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  Back to App
                </Button>
              </Link>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="bg-red-500/20 hover:bg-red-500/30 text-white border-red-300/30"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="announcements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="ads">Google Ads</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Announcement Banner Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Announcement Type */}
                <div>
                  <Label htmlFor="type">Announcement Type</Label>
                  <Select 
                    value={announcement.type} 
                    onValueChange={(value: typeof announcement.type) => handleAnnouncementChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text Message</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="gif">GIF</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Title */}
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={announcement.title}
                    onChange={(e) => handleAnnouncementChange('title', e.target.value)}
                    placeholder="Enter announcement title"
                  />
                </div>

                {/* Content */}
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={announcement.content}
                    onChange={(e) => handleAnnouncementChange('content', e.target.value)}
                    placeholder="Enter announcement content"
                    rows={3}
                  />
                </div>

                {/* Link URL (for link type) */}
                {announcement.type === 'link' && (
                  <div>
                    <Label htmlFor="linkUrl">Link URL</Label>
                    <Input
                      id="linkUrl"
                      value={announcement.linkUrl}
                      onChange={(e) => handleAnnouncementChange('linkUrl', e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                )}

                {/* Image/GIF Upload */}
                {(announcement.type === 'image' || announcement.type === 'gif') && (
                  <div className="space-y-4">
                    {/* File Upload Option */}
                    <div>
                      <Label htmlFor="imageUpload">Upload Image/GIF</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          id="imageUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="flex-1"
                        />
                        <Upload className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Select an image or GIF file from your computer (JPG, PNG, GIF supported)
                      </p>
                    </div>

                    {/* OR Divider */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">OR</span>
                      <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                    </div>

                    {/* URL Input Option */}
                    <div>
                      <Label htmlFor="imageUrl">Enter Image/GIF URL</Label>
                      <Input
                        id="imageUrl"
                        value={announcement.imageUrl}
                        onChange={(e) => handleAnnouncementChange('imageUrl', e.target.value)}
                        placeholder="https://example.com/image.gif or https://example.com/image.jpg"
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Enter a direct URL to an image or GIF file from the internet
                      </p>
                    </div>

                    {/* Preview */}
                    {announcement.imageUrl && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <Label className="block mb-2">Preview</Label>
                        <div className="flex items-center space-x-4">
                          <img 
                            src={announcement.imageUrl} 
                            alt="Preview" 
                            className="w-20 h-16 object-cover rounded border shadow-sm"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Image loaded successfully
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleAnnouncementChange('imageUrl', '')}
                              className="mt-2"
                            >
                              Remove Image
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Active Toggle */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={announcement.isActive}
                    onChange={(e) => handleAnnouncementChange('isActive', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="isActive">Show announcement on main page</Label>
                </div>

                {/* Preview */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <Label className="block mb-2">Live Preview</Label>
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {announcement.type === 'image' || announcement.type === 'gif' ? (
                          announcement.imageUrl && (
                            <img 
                              src={announcement.imageUrl} 
                              alt="Announcement" 
                              className="w-12 h-12 object-cover rounded-lg shadow-md"
                            />
                          )
                        ) : (
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <p className="text-gray-800 font-medium">
                            <span className="font-bold">{announcement.title}</span> {announcement.content}
                            {announcement.linkUrl && (
                              <span className="text-blue-700 font-semibold underline ml-2">
                                Learn More →
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <X className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Announcement
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ads">
            <Card>
              <CardHeader>
                <CardTitle>Google AdSense Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Publisher ID */}
                <div>
                  <Label htmlFor="publisherId">Publisher ID (ca-pub-XXXXXX)</Label>
                  <Input
                    id="publisherId"
                    value={googleAdsSettings.publisherId}
                    onChange={(e) => handleGoogleAdsChange('publisherId', e.target.value)}
                    placeholder="ca-pub-1234567890123456"
                    className="font-mono"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Your Google AdSense Publisher ID (found in AdSense dashboard)
                  </p>
                </div>

                {/* Header Ad Unit */}
                <div>
                  <Label htmlFor="headerAdUnit">Header Ad Unit (Leaderboard)</Label>
                  <Textarea
                    id="headerAdUnit"
                    value={googleAdsSettings.headerAdUnit}
                    onChange={(e) => handleGoogleAdsChange('headerAdUnit', e.target.value)}
                    placeholder='<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXX"
     data-ad-slot="XXXXXX"
     data-ad-format="auto"></ins>'
                    rows={6}
                    className="font-mono text-sm"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Paste your Google AdSense ad unit code for header (728x90 or responsive)
                  </p>
                </div>

                {/* Footer Ad Unit */}
                <div>
                  <Label htmlFor="footerAdUnit">Footer Ad Unit (Banner)</Label>
                  <Textarea
                    id="footerAdUnit"
                    value={googleAdsSettings.footerAdUnit}
                    onChange={(e) => handleGoogleAdsChange('footerAdUnit', e.target.value)}
                    placeholder='<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXX"
     data-ad-slot="XXXXXX"
     data-ad-format="auto"></ins>'
                    rows={6}
                    className="font-mono text-sm"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Paste your Google AdSense ad unit code for footer (728x90 or responsive)
                  </p>
                </div>

                {/* Sidebar Ad Unit */}
                <div>
                  <Label htmlFor="sidebarAdUnit">Sidebar Ad Unit (Rectangle)</Label>
                  <Textarea
                    id="sidebarAdUnit"
                    value={googleAdsSettings.sidebarAdUnit}
                    onChange={(e) => handleGoogleAdsChange('sidebarAdUnit', e.target.value)}
                    placeholder='<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXX"
     data-ad-slot="XXXXXX"
     data-ad-format="auto"></ins>'
                    rows={6}
                    className="font-mono text-sm"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Paste your Google AdSense ad unit code for sidebars (300x250 or responsive)
                  </p>
                </div>

                {/* Enable/Disable Toggle */}
                <div className="flex items-center space-x-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <input
                    type="checkbox"
                    id="adsEnabled"
                    checked={googleAdsSettings.isEnabled}
                    onChange={(e) => handleGoogleAdsChange('isEnabled', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="adsEnabled" className="text-sm font-medium">
                    Enable Google AdSense ads on all pages
                  </Label>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Important Instructions:</h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 list-disc list-inside">
                    <li>Get your ad units from Google AdSense dashboard</li>
                    <li>Make sure your site is approved by Google AdSense first</li>
                    <li>Paste the complete &lt;ins&gt; tag code for each ad placement</li>
                    <li>Check "Enable ads" only after adding valid ad unit codes</li>
                    <li>Changes will apply immediately across all pages</li>
                  </ul>
                </div>

                <Button onClick={handleSaveGoogleAds} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Google AdSense Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Site Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Site Information</h3>
                  
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={appSettings.siteName}
                      onChange={(e) => handleAppSettingsChange('siteName', e.target.value)}
                      placeholder="Your site name"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      This will appear in the browser title and header
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={appSettings.siteDescription}
                      onChange={(e) => handleAppSettingsChange('siteDescription', e.target.value)}
                      placeholder="Describe your website"
                      rows={3}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Used for SEO meta description and social media sharing
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={appSettings.contactEmail}
                      onChange={(e) => handleAppSettingsChange('contactEmail', e.target.value)}
                      placeholder="your-email@domain.com"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Main contact email for support and inquiries
                    </p>
                  </div>
                </div>

                {/* Privacy & Cookie Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Privacy & Cookies</h3>
                  
                  <div className="flex items-center space-x-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <input
                      type="checkbox"
                      id="cookieConsent"
                      checked={appSettings.cookieConsent}
                      onChange={(e) => handleAppSettingsChange('cookieConsent', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="cookieConsent" className="text-sm font-medium">
                      Show cookie consent banner for GDPR compliance
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <input
                      type="checkbox"
                      id="analyticsEnabled"
                      checked={appSettings.analyticsEnabled}
                      onChange={(e) => handleAppSettingsChange('analyticsEnabled', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="analyticsEnabled" className="text-sm font-medium">
                      Enable Google Analytics tracking
                    </Label>
                  </div>
                </div>

                {/* Performance Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Performance</h3>
                  
                  <div>
                    <Label htmlFor="maxFileSize">Maximum File Upload Size (MB)</Label>
                    <Input
                      id="maxFileSize"
                      type="number"
                      value={appSettings.maxFileSize}
                      onChange={(e) => handleAppSettingsChange('maxFileSize', parseInt(e.target.value))}
                      min="1"
                      max="100"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Maximum size for image uploads (currently set to {appSettings.maxFileSize}MB)
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <input
                      type="checkbox"
                      id="imageCompression"
                      checked={appSettings.imageCompression}
                      onChange={(e) => handleAppSettingsChange('imageCompression', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="imageCompression" className="text-sm font-medium">
                      Enable automatic image compression for better performance
                    </Label>
                  </div>
                </div>

                {/* Theme & Appearance */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Appearance</h3>
                  
                  <div>
                    <Label htmlFor="defaultTheme">Default Theme</Label>
                    <Select 
                      value={appSettings.defaultTheme} 
                      onValueChange={(value) => handleAppSettingsChange('defaultTheme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light Mode</SelectItem>
                        <SelectItem value="dark">Dark Mode</SelectItem>
                        <SelectItem value="system">Follow System</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500 mt-1">
                      Default theme for new visitors
                    </p>
                  </div>
                </div>

                {/* Backup & Export */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Data Management</h3>
                  
                  <div className="flex space-x-4">
                    <Button variant="outline" className="flex-1" onClick={handleExportSettings}>
                      Export Settings
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Import Settings
                    </Button>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                    <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Danger Zone</h4>
                    <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                      These actions cannot be undone. Please be careful.
                    </p>
                    <Button variant="destructive" size="sm" onClick={handleResetSettings}>
                      Reset All Settings
                    </Button>
                  </div>
                </div>

                <Button className="w-full" onClick={handleSaveAppSettings}>
                  <Save className="w-4 h-4 mr-2" />
                  Save All Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}