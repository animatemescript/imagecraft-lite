# Deployment Guide

## Overview
This guide covers deployment options for ImageCraft Lite on various platforms.

## Replit Deployment (Primary)

### Prerequisites
- Replit account
- PostgreSQL database provisioned

### Steps
1. Import project to Replit
2. Install dependencies automatically
3. Configure environment variables in Secrets tab:
   ```
   DATABASE_URL=your_database_url
   SESSION_SECRET=generate_secure_random_string
   ```
4. Click Deploy button
5. Your app will be available at `https://your-repl-name.username.replit.app`

## Netlify Deployment (Static Frontend)

### Prerequisites
- Netlify account
- GitHub repository connected

### Build Configuration
```yaml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Steps
1. Connect GitHub repository to Netlify
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Configure environment variables in Netlify dashboard
4. Deploy automatically on git push

## GitHub Actions (CI/CD)

### Workflow File (.github/workflows/deploy.yml)
```yaml
name: Deploy ImageCraft Lite

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
      
    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      with:
        args: deploy --prod --dir=dist
      env:
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

## Database Setup

### Production Database
1. Use PostgreSQL hosting service (Neon, Supabase, etc.)
2. Run migrations:
   ```bash
   npm run db:push
   ```
3. Update DATABASE_URL in environment variables

### Environment Variables
Required for production:
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secure random string for sessions
- `NODE_ENV`: Set to 'production'

## Performance Optimization

### Build Optimization
- Code splitting enabled by default
- Asset optimization through Vite
- Tree shaking for unused code elimination

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] HTTPS enabled
- [ ] Error monitoring setup
- [ ] Analytics configured
- [ ] AdSense integration tested

## Monitoring

### Error Tracking
Consider integrating:
- Sentry for error monitoring
- LogRocket for session replay
- Google Analytics for user tracking

### Performance Monitoring
- Lighthouse scores
- Core Web Vitals
- Database query performance

## Security

### Production Security
- HTTPS enforced
- Secure session configuration
- CSRF protection enabled
- Input validation on all endpoints
- Rate limiting implemented

### Admin Panel Security
- Complex password requirements
- Session timeout (24 hours)
- Secure cookie settings
- Login attempt monitoring

## Troubleshooting

### Common Issues
1. **Database Connection**: Check DATABASE_URL format
2. **Build Failures**: Verify Node.js version compatibility
3. **Asset Loading**: Ensure correct base path configuration
4. **Admin Access**: Verify credentials and session storage

### Support
For deployment issues:
- Check application logs
- Verify environment variables
- Test database connectivity
- Contact support at animateme.productions@gmail.com