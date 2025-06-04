# Google AdSense Setup Guide for ImageCraft Lite

## Overview
This guide will help you integrate Google AdSense with ImageCraft Lite to monetize your image editing application.

## Prerequisites
- A Google AdSense account (apply at https://www.google.com/adsense/)
- Domain ownership verification
- Valid content and traffic requirements met

## Step 1: AdSense Application
1. Visit https://www.google.com/adsense/
2. Sign up with your Google account
3. Add your website domain
4. Select your country/region
5. Choose whether you want AdSense to make ads that perform well on your site

## Step 2: Add AdSense Code to Your Site

### Method 1: Auto Ads (Recommended)
1. In your AdSense account, go to "Ads" > "By site"
2. Click "Get code" next to your site
3. Copy the AdSense code
4. Add it to your HTML head section

### Method 2: Manual Ad Placement
The application already includes ad placeholders in strategic locations:

#### Header Banner Ad
- Location: Top of every page
- Size: 970x90 Large Leaderboard
- Component: `<AdPlaceholder size="leaderboard" />`

#### Sidebar Ads
- Location: Left and right sidebars in image editor
- Size: 300x250 Medium Rectangle
- Component: `<AdPlaceholder size="rectangle" />`

#### Content Ads
- Location: Between content sections
- Size: 728x90 Leaderboard
- Component: `<AdPlaceholder size="banner" />`

## Step 3: Replace Ad Placeholders with Real Ads

### Update Environment Variables
Add your AdSense Publisher ID to your environment:
```bash
VITE_ADSENSE_CLIENT_ID=ca-pub-YOUR_PUBLISHER_ID
```

### Update Ad Components
Replace `<AdPlaceholder>` components with `<AdUnit>` components:

```tsx
// Replace this:
<AdPlaceholder size="banner" label="Header Advertisement" />

// With this:
<AdUnit 
  adSlot="1234567890"
  adFormat="auto"
  style={{ display: 'block', width: '728px', height: '90px' }}
/>
```

## Step 4: Configure Ad Units

### Create Ad Units in AdSense
1. Go to "Ads" > "By ad unit"
2. Click "Create ad unit"
3. Choose ad type (Display, In-feed, In-article, etc.)
4. Configure size and styling
5. Copy the ad unit code

### Ad Unit Placement Strategy
- **Header**: Large Leaderboard (970x90) for maximum visibility
- **Sidebar**: Medium Rectangle (300x250) for content complement
- **Content**: Banner (728x90) between sections
- **Footer**: Banner (728x90) at page bottom

## Step 5: Cookie Consent Implementation
The application includes GDPR-compliant cookie consent:

### Features Included:
- Cookie consent banner
- Granular consent options (Necessary, Analytics, Advertising, Functional)
- Cookie preferences management
- Local storage of consent choices

### AdSense Compliance:
- Advertising cookies only load after user consent
- Analytics tracking respects user preferences
- Consent can be withdrawn at any time

## Step 6: Privacy Policy Updates
Ensure your Privacy Policy includes:

### Required Sections:
- **Data Collection**: What data is collected
- **Cookie Usage**: How cookies are used
- **Third-Party Services**: Google AdSense disclosure
- **User Rights**: How to manage preferences
- **Contact Information**: How to reach you

### AdSense-Specific Language:
```
We use Google AdSense to display advertisements. Google may use cookies 
to serve ads based on your prior visits to our website or other websites. 
You may opt out of personalized advertising by visiting Google's 
Ads Settings page.
```

## Step 7: Content Guidelines Compliance

### Ensure Your Content:
- Is original and valuable
- Follows Google's content policies
- Has sufficient text content (not just images)
- Provides clear navigation
- Has a professional appearance

### Avoid:
- Copyrighted content without permission
- Adult or inappropriate content
- Misleading or deceptive content
- Excessive ads relative to content

## Step 8: Technical Requirements

### Page Speed Optimization:
- Images are optimized and compressed
- Lazy loading implemented
- Minimal JavaScript for core functionality
- CSS minification and optimization

### Mobile Responsiveness:
- All ad placements work on mobile devices
- Responsive design adapts to screen sizes
- Touch-friendly interface elements

### SEO Best Practices:
- Proper heading structure (H1, H2, H3)
- Meta descriptions and titles
- Clean URL structure
- Internal linking strategy

## Step 9: Testing and Validation

### Before Going Live:
1. Test all ad placements in different browsers
2. Verify mobile responsiveness
3. Check page load speeds
4. Validate cookie consent functionality
5. Review Privacy Policy completeness

### AdSense Review Process:
- Google will review your site (usually 1-14 days)
- Ensure compliance during review period
- Address any policy violations promptly
- Monitor AdSense dashboard for approval status

## Step 10: Post-Approval Optimization

### Monitor Performance:
- Track ad revenue in AdSense dashboard
- Analyze click-through rates
- Monitor page speed impact
- A/B test ad placements

### Optimization Strategies:
- Experiment with ad sizes and positions
- Use responsive ad units
- Enable Auto ads for additional revenue
- Monitor and adjust for user experience

## Troubleshooting Common Issues

### Ad Not Showing:
- Verify AdSense approval status
- Check ad unit code implementation
- Ensure domain is approved in AdSense
- Verify no ad blockers affecting testing

### Policy Violations:
- Review Google AdSense policies
- Remove problematic content
- Update Privacy Policy if needed
- Appeal policy decisions if appropriate

### Low Performance:
- Optimize ad placements
- Improve content quality
- Increase website traffic
- Consider responsive ad units

## Additional Resources
- [Google AdSense Help Center](https://support.google.com/adsense/)
- [AdSense Policies](https://support.google.com/adsense/answer/48182)
- [Web Vitals for AdSense](https://support.google.com/adsense/answer/9996308)

## Support
For technical support with ImageCraft Lite AdSense integration:
- Email: animateme.productions@gmail.com
- Subject: AdSense Integration Support