/**
 * Example implementations of EmptyState components
 * This file demonstrates various use cases for the EmptyState components
 * You can copy these patterns and adapt them to your needs
 */

import { EmptyState, EmptyStateGrid, EmptyStateInline } from './EmptyState';
import {
  Briefcase,
  MessageSquare,
  GraduationCap,
  FileText,
  Image as ImageIcon,
  Star,
  Calendar,
  Award,
  Search,
  Inbox,
  ShoppingCart,
  Heart,
  Bookmark,
  TrendingUp,
  Package,
  Users,
} from 'lucide-react';

// ============================================
// 1. PROJECTS / WORK PAGE
// ============================================
export function ProjectsEmptyState() {
  return (
    <EmptyState
      icon={Briefcase}
      title="No Projects Yet"
      description="New case studies and projects will be showcased here soon. Check back for updates on my latest work."
      variant="coming-soon"
    />
  );
}

// ============================================
// 2. FILTERED PROJECTS (No Results)
// ============================================
export function FilteredProjectsEmptyState() {
  return (
    <EmptyState
      icon={Search}
      title="No Projects Match Your Filter"
      description="Try selecting a different category to see more projects."
      variant="empty"
    />
  );
}

// ============================================
// 3. TESTIMONIALS SECTION
// ============================================
export function TestimonialsEmptyState() {
  return (
    <EmptyState
      icon={MessageSquare}
      title="Client Testimonials Coming Soon"
      description="Featured feedback from satisfied clients will be showcased here. Stay tuned!"
      variant="coming-soon"
    />
  );
}

// ============================================
// 4. TESTIMONIALS INLINE (Compact)
// ============================================
export function TestimonialsInlineEmptyState() {
  return (
    <EmptyStateInline
      icon={MessageSquare}
      title="No testimonials yet"
      description="Client feedback will be featured here"
    />
  );
}

// ============================================
// 5. MENTORSHIP SESSIONS
// ============================================
export function MentorshipEmptyState() {
  return (
    <EmptyState
      icon={GraduationCap}
      title="Mentorship Sessions Coming Soon"
      description="I'm preparing personalized mentorship offerings. Check back soon for 1:1 sessions, portfolio reviews, and career guidance opportunities."
      variant="coming-soon"
    />
  );
}

// ============================================
// 6. BLOG POSTS
// ============================================
export function BlogEmptyState() {
  return (
    <EmptyState
      icon={FileText}
      title="Articles Coming Soon"
      description="I'm working on insightful articles about design, UX, and product strategy. Subscribe to get notified!"
      variant="coming-soon"
    />
  );
}

// ============================================
// 7. GALLERY / IMAGES
// ============================================
export function GalleryEmptyState() {
  return (
    <EmptyState
      icon={ImageIcon}
      title="Gallery Coming Soon"
      description="A curated collection of design work and inspiration will be available here soon."
      variant="coming-soon"
    />
  );
}

// ============================================
// 8. BENTO GRID ITEM (Empty Cell)
// ============================================
export function BentoGridEmptyState() {
  return (
    <EmptyStateGrid
      icon={Package}
      title="Coming Soon"
      description="New content on the way"
      className="h-full"
    />
  );
}

// ============================================
// 9. SEARCH RESULTS (No Matches)
// ============================================
export function SearchEmptyState({ searchQuery }: { searchQuery: string }) {
  return (
    <EmptyState
      icon={Search}
      title="No Results Found"
      description={`No results found for "${searchQuery}". Try adjusting your search or browse all items.`}
      variant="empty"
    />
  );
}

// ============================================
// 10. FAVORITES / BOOKMARKS
// ============================================
export function FavoritesEmptyState() {
  return (
    <EmptyState
      icon={Heart}
      title="No Favorites Yet"
      description="Items you favorite will appear here for quick access."
      variant="no-data"
    />
  );
}

// ============================================
// 11. INBOX / MESSAGES
// ============================================
export function InboxEmptyState() {
  return (
    <EmptyState
      icon={Inbox}
      title="Inbox Empty"
      description="You're all caught up! No new messages at this time."
      variant="no-data"
    />
  );
}

// ============================================
// 12. ACHIEVEMENTS / AWARDS
// ============================================
export function AchievementsEmptyState() {
  return (
    <EmptyStateGrid
      icon={Award}
      title="Achievements"
      description="Recognition and awards will be displayed here"
    />
  );
}

// ============================================
// 13. UPCOMING EVENTS
// ============================================
export function EventsEmptyState() {
  return (
    <EmptyState
      icon={Calendar}
      title="No Upcoming Events"
      description="New workshops, talks, and events will be announced here. Check back soon!"
      variant="coming-soon"
    />
  );
}

// ============================================
// 14. ANALYTICS / STATS (No Data)
// ============================================
export function AnalyticsEmptyState() {
  return (
    <EmptyStateInline
      icon={TrendingUp}
      title="No data available yet"
      description="Statistics will appear once data is collected"
    />
  );
}

// ============================================
// 15. TEAM MEMBERS
// ============================================
export function TeamEmptyState() {
  return (
    <EmptyState
      icon={Users}
      title="Building the Team"
      description="Information about collaborators and team members will be shared here soon."
      variant="coming-soon"
    />
  );
}

// ============================================
// USAGE EXAMPLE IN A COMPONENT
// ============================================
export function ExampleUsageComponent() {
  const projects = []; // Your data
  const loading = false;
  const searchQuery = "design";

  return (
    <div className="space-y-12">
      {/* Example 1: Check if data is empty */}
      {projects.length === 0 && !loading && (
        <ProjectsEmptyState />
      )}

      {/* Example 2: Search results */}
      {projects.length === 0 && searchQuery && (
        <SearchEmptyState searchQuery={searchQuery} />
      )}

      {/* Example 3: Inline for sidebar */}
      <div className="w-64">
        <FavoritesEmptyState />
      </div>

      {/* Example 4: Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BentoGridEmptyState />
        <BentoGridEmptyState />
        <AchievementsEmptyState />
      </div>
    </div>
  );
}
