import { mockCaseStudies, mockTestimonials, mockMentorshipSessions } from './mockData';

// API Base URL from environment variable with fallback
// Using type assertion to handle import.meta.env safely
const getApiBaseUrl = (): string => {
  try {
    return (import.meta as any).env?.VITE_API_BASE || 'https://srvr.amgad.design/api';
  } catch {
    return 'https://srvr.amgad.design/api';
  }
};

const API_BASE_URL = getApiBaseUrl();

// Check if we're in development mode (localhost)
const isDevelopment = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Flag to track if API is available
let apiAvailable = !isDevelopment;

// Log development mode status once
if (isDevelopment && typeof window !== 'undefined') {
  console.log(
    '%c🔧 Development Mode',
    'background: #f59e0b; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
    '\nUsing mock data. Deploy to production to use live API at https://srvr.amgad.design/api'
  );
}

export interface CaseStudy {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  coverImage: string;
  caseStudyImage: string;
  problemStatement: string;
  myRole: string;
  keyMetrics: Array<{
    metric: string;
    value: string;
    description?: string;
  }> | Record<string, number>;
  prototypeLink?: string;
  videoLink?: string;
  tags?: string[];
  isFeatured: boolean;
  createdAt?: string;
}

export interface Testimonial {
  _id?: string;
  id?: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  clientCompany?: string;
  authorImage?: string;
  authorLinkedIn?: string;
  rating?: number;
  projectName?: string;
  testimonialType?: 'client' | 'peer' | 'manager' | 'Client' | 'Mentee' | 'Colleague' | 'Student';
  isFeatured?: boolean;
  createdAt?: string;
}

export interface Mentorship {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  sessionType?: 'one-on-one' | 'group' | 'course' | 'workshop';
  targetAudience: string;
  description: string;
  whatToExpect?: string[];
  preparationRequired?: string;
  duration: string;
  price: number;
  offerPrice?: number;
  offerEndDate?: string;
  currency?: string;
  bookingLink: string;
  testimonials?: Array<{
    author: string;
    quote: string;
  }>;
  isActive?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
}

export interface Course {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  price?: number;
  enrollmentLink?: string;
  isFeatured?: boolean;
  createdAt?: string;
}

export interface YouTubeVideo {
  _id?: string;
  id?: string;
  title: string;
  videoId: string;
  description?: string;
  thumbnailUrl?: string;
  isFeatured?: boolean;
  createdAt?: string;
}

/**
 * Handle API errors and provide user-friendly messages
 */
function handleApiError(error: any, defaultMessage: string): never {
  const message = error?.response?.data?.message || error?.message || defaultMessage;
  console.error('API Error:', message, error);
  throw new Error(message);
}

/**
 * Simulate network delay for mock data
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generic fetch function with error handling and fallback to mock data
 */
async function apiFetch<T>(url: string, options?: RequestInit, fallback?: () => T): Promise<T> {
  // If we're in development or API is known to be unavailable, use fallback immediately
  if (isDevelopment && fallback) {
    console.log(`[DEV MODE] Using mock data for: ${url}`);
    await delay(300); // Simulate network delay
    return fallback();
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    apiAvailable = true;
    return response.json();
  } catch (error: any) {
    // Don't log CORS errors as warnings in development - they're expected
    if (!isDevelopment) {
      console.warn(`API request failed for ${url}:`, error.message);
    }
    
    // If we have a fallback, use it
    if (fallback) {
      if (!isDevelopment) {
        console.log(`Using fallback data for: ${url}`);
      }
      apiAvailable = false;
      await delay(300); // Simulate network delay
      return fallback();
    }
    
    // Otherwise throw the error
    handleApiError(error, 'Network request failed');
  }
}

/**
 * Public API methods for frontend consumption with automatic fallback to mock data
 */
export const api = {
  /**
   * Get all case studies or filter by featured status
   */
  async getCaseStudies(featured?: boolean): Promise<CaseStudy[]> {
    const url = featured ? '/case-studies?featured=true' : '/case-studies';
    return apiFetch<CaseStudy[]>(url, undefined, () => {
      if (featured) {
        return mockCaseStudies.filter(cs => cs.isFeatured);
      }
      return mockCaseStudies;
    });
  },

  /**
   * Get a single case study by slug
   */
  async getCaseStudy(slug: string): Promise<CaseStudy> {
    return apiFetch<CaseStudy>(`/case-studies/${slug}`, undefined, () => {
      const caseStudy = mockCaseStudies.find(cs => cs.slug === slug);
      if (!caseStudy) throw new Error('Case study not found');
      return caseStudy;
    });
  },

  /**
   * Get all testimonials or filter by featured status
   */
  async getTestimonials(featured?: boolean): Promise<Testimonial[]> {
    const url = featured ? '/testimonials?featured=true' : '/testimonials';
    return apiFetch<Testimonial[]>(url, undefined, () => {
      if (featured) {
        return mockTestimonials.filter(t => t.isFeatured);
      }
      return mockTestimonials;
    });
  },

  /**
   * Get a single testimonial by ID
   */
  async getTestimonial(id: string): Promise<Testimonial> {
    return apiFetch<Testimonial>(`/testimonials/${id}`, undefined, () => {
      const testimonial = mockTestimonials.find(t => t._id === id);
      if (!testimonial) throw new Error('Testimonial not found');
      return testimonial;
    });
  },

  /**
   * Get all mentorship sessions or filter by featured status
   */
  async getMentorshipSessions(featured?: boolean): Promise<Mentorship[]> {
    const url = featured ? '/mentorship?featured=true' : '/mentorship';
    return apiFetch<Mentorship[]>(url, undefined, () => {
      if (featured) {
        return mockMentorshipSessions.filter(m => m.isFeatured);
      }
      return mockMentorshipSessions;
    });
  },

  /**
   * Get a single mentorship session by slug
   */
  async getMentorshipSession(slug: string): Promise<Mentorship> {
    return apiFetch<Mentorship>(`/mentorship/${slug}`, undefined, () => {
      const session = mockMentorshipSessions.find(m => m.slug === slug);
      if (!session) throw new Error('Mentorship session not found');
      return session;
    });
  },

  /**
   * Get all courses or filter by featured status
   */
  async getCourses(featured?: boolean): Promise<Course[]> {
    const url = featured ? '/courses?featured=true' : '/courses';
    return apiFetch<Course[]>(url, undefined, () => []);
  },

  /**
   * Get a single course by slug
   */
  async getCourse(slug: string): Promise<Course> {
    return apiFetch<Course>(`/courses/${slug}`, undefined, () => {
      throw new Error('Course not found');
    });
  },

  /**
   * Get all YouTube videos
   */
  async getYouTubeVideos(): Promise<YouTubeVideo[]> {
    return apiFetch<YouTubeVideo[]>('/youtube', undefined, () => []);
  },

  /**
   * Submit contact form (if endpoint exists)
   */
  async submitContact(data: {
    name: string;
    email: string;
    message: string;
    subject?: string;
  }): Promise<{ message: string }> {
    return apiFetch<{ message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }, () => {
      // Mock success response
      console.log('Contact form submitted (mock):', data);
      return { message: 'Thank you for your message! I will get back to you soon.' };
    });
  },

  /**
   * Check if API is available
   */
  isApiAvailable(): boolean {
    return apiAvailable;
  },

  /**
   * Check if running in development mode
   */
  isDevelopment(): boolean {
    return isDevelopment;
  },
};

/**
 * Admin API methods (require authentication)
 */
export const adminApi = {
  /**
   * Set JWT token for authenticated requests
   */
  setAuthToken(token: string) {
    // Store token in localStorage or memory
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  },

  /**
   * Get stored auth token
   */
  getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  },

  /**
   * Clear auth token
   */
  clearAuthToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  },

  /**
   * Login and get JWT token
   */
  async login(email: string, password: string): Promise<{
    _id: string;
    name: string;
    email: string;
    token: string;
    isAdmin: boolean;
  }> {
    const response = await apiFetch<{
      _id: string;
      name: string;
      email: string;
      token: string;
      isAdmin: boolean;
    }>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Store token after successful login
    this.setAuthToken(response.token);
    return response;
  },

  /**
   * Generic authenticated request
   */
  async authenticatedRequest<T>(url: string, options?: RequestInit): Promise<T> {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error('No authentication token found. Please login.');
    }

    return apiFetch<T>(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Case Studies Management
  async createCaseStudy(data: Partial<CaseStudy>): Promise<CaseStudy> {
    return this.authenticatedRequest<CaseStudy>('/case-studies', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateCaseStudy(slug: string, data: Partial<CaseStudy>): Promise<CaseStudy> {
    return this.authenticatedRequest<CaseStudy>(`/case-studies/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteCaseStudy(slug: string): Promise<{ message: string }> {
    return this.authenticatedRequest<{ message: string }>(`/case-studies/${slug}`, {
      method: 'DELETE',
    });
  },

  // Testimonials Management
  async createTestimonial(data: Partial<Testimonial>): Promise<Testimonial> {
    return this.authenticatedRequest<Testimonial>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateTestimonial(id: string, data: Partial<Testimonial>): Promise<Testimonial> {
    return this.authenticatedRequest<Testimonial>(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteTestimonial(id: string): Promise<{ message: string }> {
    return this.authenticatedRequest<{ message: string }>(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  },

  // Mentorship Management
  async createMentorship(data: Partial<Mentorship>): Promise<Mentorship> {
    return this.authenticatedRequest<Mentorship>('/mentorship', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateMentorship(slug: string, data: Partial<Mentorship>): Promise<Mentorship> {
    return this.authenticatedRequest<Mentorship>(`/mentorship/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteMentorship(slug: string): Promise<{ message: string }> {
    return this.authenticatedRequest<{ message: string }>(`/mentorship/${slug}`, {
      method: 'DELETE',
    });
  },

  // Courses Management
  async createCourse(data: Partial<Course>): Promise<Course> {
    return this.authenticatedRequest<Course>('/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateCourse(slug: string, data: Partial<Course>): Promise<Course> {
    return this.authenticatedRequest<Course>(`/courses/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteCourse(slug: string): Promise<{ message: string }> {
    return this.authenticatedRequest<{ message: string }>(`/courses/${slug}`, {
      method: 'DELETE',
    });
  },

  // YouTube Videos Management
  async createYouTubeVideo(data: Partial<YouTubeVideo>): Promise<YouTubeVideo> {
    return this.authenticatedRequest<YouTubeVideo>('/youtube', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateYouTubeVideo(videoId: string, data: Partial<YouTubeVideo>): Promise<YouTubeVideo> {
    return this.authenticatedRequest<YouTubeVideo>(`/youtube/${videoId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteYouTubeVideo(videoId: string): Promise<{ message: string }> {
    return this.authenticatedRequest<{ message: string }>(`/youtube/${videoId}`, {
      method: 'DELETE',
    });
  },
};

export default api;
