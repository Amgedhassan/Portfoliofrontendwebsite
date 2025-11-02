# Empty State Component Usage Guide

This guide shows you how to use the EmptyState components throughout your portfolio website to handle empty categories and sections gracefully.

## Components Available

1. **EmptyState** - Full-featured empty state with icon, title, description, and animations
2. **EmptyStateGrid** - Bento-grid style empty state with dashed borders
3. **EmptyStateInline** - Compact inline version for smaller spaces

## Basic Usage

### 1. Full EmptyState

```tsx
import { EmptyState } from './components/EmptyState';
import { Briefcase } from 'lucide-react';
import { shouldShowEmptyState } from './utils/emptyStateHelpers';

// In your component:
{shouldShowEmptyState(projects, loading) ? (
  <EmptyState
    icon={Briefcase}
    title="No Projects Yet"
    description="New case studies and projects will appear here soon."
    variant="coming-soon"
  />
) : (
  // Your content here
)}
```

### 2. Grid EmptyState (for Bento layouts)

```tsx
import { EmptyStateGrid } from './components/EmptyState';
import { Image } from 'lucide-react';

<EmptyStateGrid
  icon={Image}
  title="Coming Soon"
  description="New content is on the way"
  className="min-h-[300px]"
/>
```

### 3. Inline EmptyState (compact)

```tsx
import { EmptyStateInline } from './components/EmptyState';
import { Star } from 'lucide-react';

<EmptyStateInline
  icon={Star}
  title="No testimonials yet"
  description="Client feedback will appear here"
/>
```

## Variants

The `EmptyState` component supports three variants:

- `coming-soon` (default) - Shows animated dots, indicates content is being prepared
- `no-data` - Neutral state for when data doesn't exist yet
- `empty` - For when a filter or search returns no results

## Helper Functions

The `emptyStateHelpers` utility provides helpful functions:

```tsx
import {
  isEmpty,
  hasData,
  shouldShowEmptyState,
  getEmptyStateMessage,
} from './utils/emptyStateHelpers';

// Check if data is empty
if (isEmpty(projects)) {
  // Show empty state
}

// Check if data exists
if (hasData(testimonials)) {
  // Render content
}

// Combined check with loading state
if (shouldShowEmptyState(sessions, loading)) {
  // Show empty state
}

// Get contextual messages
const { title, description } = getEmptyStateMessage('projects');
```

## Integration Examples

### Projects/Work Page

```tsx
{loading ? (
  // Loading skeletons
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="aspect-[4/3] bg-neutral-100 rounded-2xl animate-pulse" />
    ))}
  </div>
) : shouldShowEmptyState(filteredProjects, loading) ? (
  <EmptyState
    icon={Briefcase}
    title="No Projects Yet"
    description="New case studies and projects will be showcased here soon."
    variant="coming-soon"
  />
) : (
  // Render projects grid
)}
```

### Mentorship Sessions

```tsx
{loading ? (
  // Loading state
) : shouldShowEmptyState(sessions, loading) ? (
  <EmptyState
    icon={GraduationCap}
    title="Mentorship Sessions Coming Soon"
    description="I'm preparing personalized mentorship offerings."
    variant="coming-soon"
  />
) : (
  // Render sessions
)}
```

### Testimonials Section

```tsx
{isEmpty(testimonials) ? (
  <EmptyStateInline
    icon={MessageSquare}
    title="No testimonials yet"
    description="Client feedback will be featured here"
  />
) : (
  // Render testimonials
)}
```

### Search Results

```tsx
{isEmpty(searchResults) && searchQuery ? (
  <EmptyState
    icon={Search}
    title="No Results Found"
    description="Try adjusting your search criteria or browse all items."
    variant="empty"
  />
) : (
  // Render results
)}
```

## Customization

### Custom Styling

```tsx
<EmptyState
  icon={Icon}
  title="Custom Title"
  description="Custom description"
  className="my-8 max-w-2xl mx-auto" // Add custom classes
/>
```

### Custom Icons

Use any Lucide React icon:

```tsx
import { 
  Briefcase,      // Projects
  GraduationCap,  // Mentorship
  MessageSquare,  // Testimonials
  FileText,       // Blog posts
  Image,          // Gallery
  Star,           // Reviews
  Calendar,       // Events
  Award,          // Achievements
} from 'lucide-react';
```

## Best Practices

1. **Always handle loading states first** - Show loading skeletons before checking for empty data
2. **Use appropriate variants** - Choose the variant that matches the context
3. **Provide helpful descriptions** - Tell users what to expect or when content will be available
4. **Match the design system** - The components already match your Swiss Minimalist aesthetic
5. **Use semantic icons** - Choose icons that clearly represent the content type
6. **Consider the context** - Use full EmptyState for main content, Grid for bento layouts, Inline for sidebars

## Context-Specific Messages

The helper provides predefined messages for common contexts:

- `projects` - For case studies and work
- `testimonials` - For client feedback
- `mentorship` - For mentorship sessions
- `case-studies` - For detailed case studies
- `search` - For search results
- `default` - Generic coming soon message

Example:
```tsx
const { title, description } = getEmptyStateMessage('projects');

<EmptyState
  icon={Briefcase}
  title={title}
  description={description}
  variant="coming-soon"
/>
```
