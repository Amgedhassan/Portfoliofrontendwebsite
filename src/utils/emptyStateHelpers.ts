/**
 * Utility functions for handling empty states throughout the application
 */

// Check if an array is empty or undefined
export const isEmpty = (data: any[] | null | undefined): boolean => {
  return !data || data.length === 0;
};

// Check if a specific category or section has data
export const hasData = (data: any[] | null | undefined): boolean => {
  return data && data.length > 0;
};

// Get the count of items in a collection
export const getCount = (data: any[] | null | undefined): number => {
  return data ? data.length : 0;
};

// Filter out empty categories from an object
export const filterEmptyCategories = <T extends Record<string, any[]>>(
  categories: T
): Partial<T> => {
  return Object.entries(categories).reduce((acc, [key, value]) => {
    if (hasData(value)) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};

// Get empty state message based on context
export const getEmptyStateMessage = (
  context: string
): { title: string; description: string } => {
  const messages: Record<string, { title: string; description: string }> = {
    projects: {
      title: "No Projects Yet",
      description: "New case studies and projects will appear here soon.",
    },
    testimonials: {
      title: "No Testimonials Yet",
      description: "Client feedback and testimonials will be showcased here.",
    },
    mentorship: {
      title: "No Mentorship Sessions",
      description: "Mentorship opportunities will be available soon.",
    },
    "case-studies": {
      title: "Coming Soon",
      description: "Detailed case studies are currently being prepared.",
    },
    "work-in-progress": {
      title: "Work in Progress",
      description: "This section is being actively developed. Stay tuned!",
    },
    search: {
      title: "No Results Found",
      description: "Try adjusting your search criteria or browse all items.",
    },
    default: {
      title: "Coming Soon",
      description: "This section is currently being crafted. Check back soon for updates.",
    },
  };

  return messages[context] || messages.default;
};

// Check if API data is still loading or empty
export const shouldShowEmptyState = (
  data: any[] | null | undefined,
  isLoading: boolean
): boolean => {
  return !isLoading && isEmpty(data);
};
