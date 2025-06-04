# ImageCraft Lite

A professional web-based image editor with comprehensive editing tools, admin panel with Google AdSense management system, and deployment-ready structure for production use.

![ImageCraft Lite](./generated-icon.png)

## Features

### 🎨 Image Editing
- **Advanced Filters**: Brightness, contrast, saturation, grayscale, invert
- **Transform Tools**: Rotate, flip, mirror operations
- **Resize & Export**: Multiple format support (JPEG, PNG, WebP) with quality control
- **File Support**: Up to 50MB file uploads
- **Real-time Preview**: Instant visual feedback

### 🔐 Admin Panel
- **Secure Authentication**: Complex password protection
- **Google AdSense Management**: Real ad unit integration
- **Announcement System**: Dynamic content management
- **Settings Control**: Site-wide configuration

### 💰 Monetization Ready
- **Strategic Ad Placement**: Header, footer, sidebar positions
- **Google AdSense Integration**: Ready for approval
- **Cookie Consent**: GDPR compliance

### 🗄️ Database Integration
- **PostgreSQL Backend**: Persistent data storage
- **User Management**: Account system ready
- **Announcement Storage**: Dynamic content delivery

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL + Drizzle ORM
- **Deployment**: Replit + Netlify ready

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Environment variables configured

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/imagecraft-lite.git
cd imagecraft-lite
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy and configure your environment
cp .env.example .env
```

4. Set up database:
```bash
npm run db:push
```

5. Start development server:
```bash
npm run dev
```

## Admin Access

Access the admin panel at `/admin-login`

**Default Credentials:**
- Username: `admin`
- Password: `ImageCraft@2025#Secure!`

## Project Structure

```
imagecraft-lite/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── contexts/       # React contexts
│   │   └── types/          # TypeScript type definitions
├── server/                 # Backend Express application
│   ├── db.ts              # Database configuration
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data access layer
│   └── index.ts           # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema definitions
└── attached_assets/       # Static assets and images
```

## Deployment

### Replit Deployment
1. Push to Replit
2. Configure environment variables
3. Deploy using Replit Deployments

### Netlify Deployment
1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
- Connect GitHub repository
- Set build command: `npm run build`
- Set publish directory: `dist`

## Environment Variables

```env
DATABASE_URL=postgresql://...
PGDATABASE=...
PGHOST=...
PGPASSWORD=...
PGPORT=...
PGUSER=...
```

## Google AdSense Setup

1. Access admin panel at `/admin-login`
2. Go to "Google Ads" tab
3. Enter your AdSense Publisher ID
4. Add ad unit codes for different positions
5. Enable ads across the site

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Email: animateme.productions@gmail.com
- Create an issue on GitHub

---

Made with ❤️ for professional image editing