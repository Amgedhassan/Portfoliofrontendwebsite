import { CaseStudy, Testimonial, Mentorship, adminApi } from './api';

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

// Auth token management
const TOKEN_KEY = 'dashboard_auth_token';

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    adminApi.clearAuthToken();
  },
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
};

// API helper with auth headers
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = authStorage.getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    authStorage.removeToken();
    window.location.href = '/dashboard/login';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

export const dashboardApi = {
  // Authentication
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    try {
      const response = await adminApi.login(email, password);
      authStorage.setToken(response.token);
      return {
        token: response.token,
        user: {
          email: response.email,
          name: response.name,
          role: response.isAdmin ? 'admin' : 'user',
        },
      };
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  },

  async logout() {
    authStorage.removeToken();
  },

  // Case Studies / Projects
  async getAllCaseStudies(): Promise<CaseStudy[]> {
    return apiRequest<CaseStudy[]>('/case-studies');
  },

  async createCaseStudy(data: Partial<CaseStudy>): Promise<CaseStudy> {
    return adminApi.createCaseStudy(data);
  },

  async updateCaseStudy(slugOrId: string, data: Partial<CaseStudy>): Promise<CaseStudy> {
    const slug = data.slug || slugOrId;
    return adminApi.updateCaseStudy(slug, data);
  },

  async deleteCaseStudy(slugOrId: string): Promise<void> {
    await adminApi.deleteCaseStudy(slugOrId);
  },

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return apiRequest<Testimonial[]>('/testimonials');
  },

  async createTestimonial(data: Partial<Testimonial>): Promise<Testimonial> {
    return adminApi.createTestimonial(data);
  },

  async updateTestimonial(id: string, data: Partial<Testimonial>): Promise<Testimonial> {
    return adminApi.updateTestimonial(id, data);
  },

  async deleteTestimonial(id: string): Promise<void> {
    await adminApi.deleteTestimonial(id);
  },

  // Mentorship Sessions
  async getAllMentorshipSessions(): Promise<Mentorship[]> {
    return apiRequest<Mentorship[]>('/mentorship');
  },

  async createMentorshipSession(data: Partial<Mentorship>): Promise<Mentorship> {
    return adminApi.createMentorship(data);
  },

  async updateMentorshipSession(slugOrId: string, data: Partial<Mentorship>): Promise<Mentorship> {
    const slug = data.slug || slugOrId;
    return adminApi.updateMentorship(slug, data);
  },

  async deleteMentorshipSession(slugOrId: string): Promise<void> {
    await adminApi.deleteMentorship(slugOrId);
  },

  // Dashboard Stats
  async getDashboardStats(): Promise<{
    totalProjects: number;
    totalTestimonials: number;
    totalMentorshipSessions: number;
    featuredProjects: number;
    featuredTestimonials: number;
    featuredSessions: number;
  }> {
    try {
      const [projects, testimonials, mentorship] = await Promise.all([
        apiRequest<CaseStudy[]>('/case-studies'),
        apiRequest<Testimonial[]>('/testimonials'),
        apiRequest<Mentorship[]>('/mentorship'),
      ]);

      return {
        totalProjects: projects.length,
        totalTestimonials: testimonials.length,
        totalMentorshipSessions: mentorship.length,
        featuredProjects: projects.filter(p => p.isFeatured).length,
        featuredTestimonials: testimonials.filter(t => t.isFeatured).length,
        featuredSessions: mentorship.filter(m => m.isFeatured).length,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        totalProjects: 0,
        totalTestimonials: 0,
        totalMentorshipSessions: 0,
        featuredProjects: 0,
        featuredTestimonials: 0,
        featuredSessions: 0,
      };
    }
  },
};
