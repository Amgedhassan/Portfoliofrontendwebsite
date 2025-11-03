# 🎛️ Dashboard Guide

Complete guide to using the portfolio dashboard for content management.

---

## 🔐 Access

**Login URL**: `https://amgad.design/dashboard/login`

**Authentication**: JWT-based authentication with backend API

---

## 📊 Features

### 1. Dashboard Overview
- Quick stats (projects, testimonials, sessions)
- Recent activity
- System status

**URL**: `/dashboard`

---

### 2. Projects Management

Manage your case studies and portfolio work.

**URL**: `/dashboard/projects`

#### Add New Project
1. Click "Add New Project"
2. Fill in project details:
   - Title
   - Client name
   - Year
   - Category
   - Description
   - Challenge
   - Solution
   - Results
   - Technologies
   - Images (URLs)
   - Behance URL (optional)
3. Click "Save Project"

#### Edit Project
1. Click "Edit" on any project
2. Update fields
3. Click "Update Project"

#### Delete Project
1. Click "Delete" on any project
2. Confirm deletion

**Fields**:
- **Title**: Project name
- **Client**: Client/company name
- **Year**: Project year
- **Category**: Design category (UI/UX, Branding, etc.)
- **Description**: Brief overview
- **Challenge**: Problem statement
- **Solution**: How you solved it
- **Results**: Outcomes and metrics
- **Technologies**: Tools used (comma-separated)
- **Images**: Image URLs (one per line)
- **Behance URL**: Link to Behance project

---

### 3. Testimonials Management

Manage client testimonials and reviews.

**URL**: `/dashboard/testimonials`

#### Add New Testimonial
1. Click "Add New Testimonial"
2. Fill in:
   - Client name
   - Position/role
   - Company
   - Content (testimonial text)
   - Rating (1-5 stars)
   - Avatar URL (optional)
3. Click "Save Testimonial"

#### Edit/Delete
Same process as projects.

---

### 4. Mentorship Sessions

Manage your mentorship and coaching offerings.

**URL**: `/dashboard/mentorship`

#### Add New Session
1. Click "Add New Session"
2. Fill in:
   - Title
   - Category (Career, Portfolio, Skills)
   - Duration
   - Price
   - Description
   - Features (one per line)
   - Includes (what's included)
3. Click "Save Session"

---

## 🖼️ Image Handling

### Image URLs

All images use URLs (no upload system currently).

**Recommended**:
- Host on Imgur, Cloudinary, or similar
- Use HTTPS URLs
- Optimize images before uploading

**Fallback**:
- Broken images show placeholder
- No layout shift from missing images
- Error handling built-in

### Image Guidelines

**Project Images**:
- Size: 1200x800px recommended
- Format: JPG or PNG
- Quality: 85%
- Max file size: 500 KB

**Testimonial Avatars**:
- Size: 200x200px
- Format: JPG or PNG
- Circular crop recommended

---

## 🔒 Security

### Authentication

- JWT tokens stored in localStorage
- Auto-logout on token expiration
- Protected routes redirect to login

### API Integration

- All requests authenticated
- CORS configured
- Rate limiting on backend

---

## 🐛 Troubleshooting

### Can't Login

1. Check API URL in `.env`
2. Verify credentials with backend admin
3. Check browser console for errors
4. Clear localStorage and try again

### Images Not Showing

1. Verify URL is accessible
2. Check HTTPS (not HTTP)
3. Check CORS headers
4. Use ImageWithFallback component

### Changes Not Saving

1. Check network tab for API errors
2. Verify authentication token
3. Check required fields
4. Review backend logs

---

## 📝 Best Practices

### Content

- **Be specific**: Use real project data
- **Use metrics**: Quantify results
- **Proofread**: Check for typos
- **Update regularly**: Keep portfolio fresh

### Images

- **Optimize**: Compress images
- **Consistent**: Same aspect ratios
- **Professional**: High-quality screenshots
- **Accessible**: Alt text in code

### SEO

- **Keywords**: Use relevant terms
- **Descriptions**: Clear and concise
- **Links**: Valid Behance/external URLs

---

## 🎯 Workflow

### Adding a New Project

1. Prepare project assets
2. Upload images to hosting
3. Login to dashboard
4. Add new project
5. Fill all fields
6. Save and preview
7. Check live site

### Regular Maintenance

- **Weekly**: Review and update content
- **Monthly**: Add new projects
- **Quarterly**: Update testimonials
- **Yearly**: Refresh mentorship offerings

---

## 🚀 Tips

- Use keyboard shortcuts (Ctrl+S to save forms)
- Preview changes before publishing
- Keep backup of important content
- Test on different devices
- Monitor analytics for popular content

---

## 📞 Support

If you encounter issues:

1. Check browser console (F12)
2. Check network requests
3. Verify API connection
4. Review backend logs
5. Clear cache and try again

---

**Dashboard is production-ready and connected to your live API!** 🎉
