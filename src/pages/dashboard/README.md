# Dashboard Guide

## Overview

The dashboard is a comprehensive content management system for your portfolio website with full CRUD (Create, Read, Update, Delete) operations for all content types.

## Features

### 🔐 Authentication
- **Login Page** (`/dashboard/login`)
  - Real backend authentication with JWT tokens
  - Demo mode for testing (credentials shown on login page)
  - Session persistence
  - Automatic redirect to login if not authenticated

### 📊 Dashboard Overview (`/dashboard`)
- Real-time statistics for all content types
- Total and featured counts
- Quick action buttons to create new content
- Direct links to manage each content type

### 📁 Content Management

#### Projects / Case Studies (`/dashboard/projects`)
**List View:**
- Search functionality by title or tags
- View, Edit, Delete actions for each project
- Visual preview with cover images
- Featured badge indicators
- Quick links to view projects on the public site

**Create/Edit (`/dashboard/projects/new` or `/dashboard/projects/edit/:id`):**
- Title, slug, and descriptions
- Cover and case study images
- Problem statement and role
- Key metrics (multiple, with descriptions)
- Tags (multiple)
- Additional links (prototype, video)
- Featured toggle
- Full form validation

#### Testimonials (`/dashboard/testimonials`)
**List View:**
- Search by author name, quote, or type
- Color-coded by testimonial type (Client, Mentee, Colleague, Student)
- Author profile pictures
- Featured badge indicators
- Edit and Delete actions

**Create/Edit (`/dashboard/testimonials/new` or `/dashboard/testimonials/edit/:id`):**
- Quote text
- Author information (name, title, company)
- Author image and LinkedIn
- Testimonial type selector
- Related project name
- Rating (1-5)
- Featured toggle

#### Mentorship Sessions (`/dashboard/mentorship`)
**List View:**
- Search by title or audience
- Filter by session type (All, 1:1, Workshop, Course, Group)
- Active/Inactive status badges
- Sale indicators for special offers
- Price and duration display
- Edit and Delete actions

**Create/Edit (`/dashboard/mentorship/new` or `/dashboard/mentorship/edit/:id`):**
- Title, slug, and type
- Target audience and description
- What to expect (multiple items)
- Duration and preparation requirements
- Pricing (regular + offer with end date)
- Booking link
- Optional testimonials for the session
- Active and Featured toggles

## 🎭 Demo Mode

### Accessing Demo Mode
**Credentials:**
- Email: `demo@amgad.design`
- Password: `demo123`

### Demo Mode Features:
- ✅ Full CRUD operations work in browser
- ✅ All changes stored in memory
- ✅ Visual indicator shows demo mode is active
- ✅ Perfect for testing and demonstrations
- ⚠️ All changes reset on logout
- ⚠️ No data persists to backend

### Demo Mode Indicator
A badge appears in the sidebar showing "DEMO MODE" with an animated icon when in demo mode.

## 🔑 Production Mode

### Authentication
Use your real credentials to access the production backend at `https://srvr.amgad.design/api`

### Features:
- ✅ Full JWT authentication
- ✅ All changes persist to database
- ✅ Secure API endpoints
- ✅ Automatic token refresh
- ✅ 401 handling with redirect to login

## 🎨 Design Features

### Cyberpunk Theme
- Neon color palette (cyan, purple, pink)
- Tech corners on all cards
- Animated scan lines
- Grid backgrounds
- Glitch text effects
- Monospace fonts for tech aesthetic

### User Experience
- Loading states with animated spinners
- Toast notifications for all actions
- Confirmation dialogs for deletions
- Form validation with helpful error messages
- Responsive design for all screen sizes
- Smooth animations and transitions

## 📝 Quick Actions

From any page, you can:
- View the public site (VIEW_SITE button)
- Logout (LOGOUT button)
- Access all sections via sidebar navigation
- Toggle sidebar visibility

## 🛡️ Security

### Protected Routes
All dashboard routes require authentication. Attempting to access without logging in redirects to the login page.

### Token Management
- JWT tokens stored securely in localStorage
- Automatic injection into API requests
- Token validation on each protected route
- Logout clears all auth data

## 🚀 API Integration

### Development Mode (localhost)
- Automatically uses mock data
- No API calls made to prevent CORS errors
- "Development Mode" indicator visible

### Production Mode
- Connects to `https://srvr.amgad.design/api`
- Real-time data synchronization
- Full backend CRUD operations

## 📱 Responsive Design

The dashboard is fully responsive:
- Desktop: Full sidebar + main content
- Tablet: Collapsible sidebar
- Mobile: Hamburger menu navigation

## 🎯 Tips for Use

1. **Demo Mode for Testing**: Use demo credentials to test all features without affecting production data
2. **Featured Content**: Toggle "Featured" to control what appears on homepage
3. **Slugs**: Use URL-friendly slugs (lowercase, hyphens instead of spaces)
4. **Images**: Provide full URLs for all images
5. **Required Fields**: All required fields marked with * must be filled
6. **Search & Filter**: Use search and filters to quickly find content

## 🔄 Workflow

### Creating New Content
1. Navigate to content type (Projects, Testimonials, or Mentorship)
2. Click "NEW_[TYPE]" button
3. Fill in all required fields
4. Add optional fields as needed
5. Toggle featured status if needed
6. Click "CREATE_[TYPE]"
7. Success toast confirms creation
8. Redirected to list view

### Editing Content
1. From list view, click "EDIT" button
2. Form pre-populated with existing data
3. Modify any fields
4. Click "UPDATE_[TYPE]"
5. Success toast confirms update
6. Redirected to list view

### Deleting Content
1. From list view, click "DELETE" button
2. Confirmation dialog appears
3. Click "CONFIRM_DELETE"
4. Content removed from database
5. Success toast confirms deletion
6. List updates automatically

## 🎨 Color Coding

- **Primary (Cyan)**: Main actions, navigation, general UI
- **Secondary (Purple)**: Supporting elements, alternative actions
- **Accent (Pink)**: Warnings, featured items, special states
- **Success (Cyan)**: Successful operations
- **Error (Pink)**: Failed operations, deletions

## 💡 Best Practices

1. **Use Featured Sparingly**: Only mark best work as featured
2. **Complete All Fields**: Even optional fields improve content quality
3. **Test in Demo Mode**: Try changes in demo mode first
4. **Regular Updates**: Keep testimonials and metrics up to date
5. **Consistent Slugs**: Use consistent naming for slugs
6. **High-Quality Images**: Use professional images for better presentation

## 🐛 Troubleshooting

### Can't Login
- Check credentials are correct
- Try demo mode to verify system is working
- Clear browser cache/localStorage
- Check network connection

### Changes Not Saving
- Verify you're not in demo mode
- Check required fields are filled
- Look for validation errors
- Check network tab for API errors

### Images Not Loading
- Verify image URLs are correct and accessible
- Check CORS settings if using external images
- Try uploading to image hosting service

### Session Expired
- Login again to refresh token
- System automatically redirects to login
- Your work is saved up to last successful save

## 📞 Support

For backend API issues or questions about production deployment, contact your backend administrator.

For frontend dashboard issues, check browser console for errors and ensure all dependencies are installed.
