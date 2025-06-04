import { Sparkles, Image as ImageIcon, Link as LinkIcon, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAnnouncementSettings, type AnnouncementSettings } from '@/lib/announcement-store';

export function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<AnnouncementSettings>({
    type: 'text',
    title: '',
    content: '',
    linkUrl: '',
    imageUrl: '',
    isActive: false
  });

  useEffect(() => {
    const loadAnnouncement = async () => {
      try {
        const settings = await getAnnouncementSettings();
        setAnnouncement(settings);
      } catch (error) {
        console.error('Error loading announcement:', error);
      }
    };

    loadAnnouncement();

    const handleAnnouncementUpdate = (event: CustomEvent<AnnouncementSettings>) => {
      setAnnouncement(event.detail);
    };

    window.addEventListener('announcementUpdated', handleAnnouncementUpdate as EventListener);

    return () => {
      window.removeEventListener('announcementUpdated', handleAnnouncementUpdate as EventListener);
    };
  }, []);

  if (!announcement.isActive) return null;

  const renderAnnouncementIcon = () => {
    switch (announcement.type) {
      case 'image':
      case 'gif':
        return announcement.imageUrl && announcement.imageUrl.trim() !== '' ? (
          <div className="w-12 h-9 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <img 
              src={announcement.imageUrl} 
              alt="Announcement" 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Failed to load announcement image:', announcement.imageUrl);
                const target = e.currentTarget;
                target.style.display = 'none';
                // Show fallback icon
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>`;
                }
              }}
              onLoad={() => {
                console.log('Announcement image loaded successfully:', announcement.imageUrl);
              }}
            />
          </div>
        ) : (
          <div className="w-12 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <ImageIcon className="text-white w-5 h-5" />
          </div>
        );
      case 'link':
        return (
          <div className="w-12 h-9 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
            <LinkIcon className="text-white w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="text-white w-5 h-5" />
          </div>
        );
    }
  };

  const renderAnnouncementContent = () => {
    return (
      <div>
        <p className="text-gray-800 font-medium">
          {announcement.title && (
            <span className="font-bold">{announcement.title} </span>
          )}
          {announcement.content}
          {announcement.linkUrl && (
            <a 
              href={announcement.linkUrl} 
              className="text-blue-700 hover:text-blue-800 font-semibold underline ml-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More →
            </a>
          )}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-r from-orange-400 to-yellow-400 px-4 py-3 relative">
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            {renderAnnouncementIcon()}
            {renderAnnouncementContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
