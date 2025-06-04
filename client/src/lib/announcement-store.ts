import { apiRequest } from './queryClient';

interface AnnouncementSettings {
  type: 'text' | 'image' | 'gif' | 'link';
  title: string;
  content: string;
  linkUrl: string;
  imageUrl: string;
  isActive: boolean;
}

const defaultAnnouncement: AnnouncementSettings = {
  type: 'text',
  title: '',
  content: '',
  linkUrl: '',
  imageUrl: '',
  isActive: false
};

export const getAnnouncementSettings = async (): Promise<AnnouncementSettings> => {
  try {
    const response = await fetch('/api/announcements/active');
    if (response.ok) {
      const announcement = await response.json();
      if (announcement) {
        return {
          type: announcement.type,
          title: announcement.title,
          content: announcement.content,
          linkUrl: announcement.linkUrl,
          imageUrl: announcement.imageUrl,
          isActive: announcement.isActive,
        };
      }
    }
  } catch (error) {
    console.error('Failed to fetch announcement settings:', error);
  }
  
  return defaultAnnouncement;
};

export const saveAnnouncementSettings = async (settings: AnnouncementSettings): Promise<void> => {
  try {
    const response = await fetch('/api/announcements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error(`Failed to save announcement: ${response.statusText}`);
    }
    
    // Trigger custom event for UI updates
    window.dispatchEvent(new CustomEvent('announcementUpdated', {
      detail: settings
    }));
  } catch (error) {
    console.error('Failed to save announcement settings:', error);
    throw error;
  }
};

export type { AnnouncementSettings };