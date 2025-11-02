import { CaseStudy, Testimonial, Mentorship, adminApi } from './api';
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

// Demo mode configuration
const DEMO_CREDENTIALS = {
  email: 'demo@amgad.design',
  password: 'demo123',
};

const DEMO_TOKEN = 'DEMO_MODE_TOKEN_12345';

// Auth token management
const TOKEN_KEY = 'dashboard_auth_token';
const DEMO_MODE_KEY = 'dashboard_demo_mode';

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(DEMO_MODE_KEY);
    adminApi.clearAuthToken();
  },
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
  isDemoMode: () => localStorage.getItem(DEMO_MODE_KEY) === 'true',
  setDemoMode: (isDemo: boolean) => localStorage.setItem(DEMO_MODE_KEY, isDemo.toString()),
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

// Mock data storage for demo mode
let demoProjects = [...mockCaseStudies];
let demoTestimonials = [...mockTestimonials];
let demoMentorship = [...mockMentorshipSessions];

export const dashboardApi = {
  // Authentication
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    // Check for demo credentials
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      authStorage.setToken(DEMO_TOKEN);
      authStorage.setDemoMode(true);
      return {
        token: DEMO_TOKEN,
        user: {
          email: DEMO_CREDENTIALS.email,
          name: 'Demo User',
          role: 'admin',
        },
      };
    }

    // Real API login using the adminApi
    authStorage.setDemoMode(false);
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
    // Reset demo data on logout
    if (authStorage.isDemoMode()) {
      demoProjects = [...mockCaseStudies];
      demoTestimonials = [...mockTestimonials];
      demoMentorship = [...mockMentorshipSessions];
    }
    authStorage.removeToken();
  },

  // Case Studies / Projects
  async getAllCaseStudies(): Promise<CaseStudy[]> {
    if (authStorage.isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      return demoProjects;
    }
    return apiRequest<CaseStudy[]>('/case-studies');
  },

  async createCaseStudy(data: Partial<CaseStudy>): Promise<CaseStudy> {
    if (authStorage.isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newProject: CaseStudy = {
        _id: `demo-${Date.now()}`,
        title: data.title || '',
        slug: data.slug || '',
        coverImage: data.coverImage || '',
        caseStudyImage: data.caseStudyImage || '',
        problemStatement: data.problemStatement || '',
        myRole: data.myRole || '',
        keyMetrics: data.keyMetrics || [],
        tags: data.tags || [],
        isFeatured: data.isFeatured || false,
        createdAt: new Date().toISOString(),
      };
      demoProjects.push(newProject);
      return newProject;
    }
    return adminApi.createCaseStudy(data);
  },

  async updateCaseStudy(slugOrId: string, data: Partial<CaseStudy>): Promise<CaseStudy> {
    if (authStorage.isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = demoProjects.findIndex(p => p._id === slugOrId || p.slug === slugOrId);
      if (index !== -1) {
        demoProjects[index] = { ...demoProjects[index], ...data };
        return demoProjects[index];
      }
      throw new Error('Project not found');
    }
    // Use slug for real API
    const slug = data.slug || slugOrId;
    return adminApi.updateCaseStudy(slug, data);
  },

  async deleteCaseStudy(slugOrId: string): Promise<void> {
    if (authStorage.isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      demoProjects = demoProjects.filter(p => p._id !== slugOrId && p.slug !== slugOrId);
      return;
    }
    await adminApi.deleteCaseStudy(slugOrId);
  },

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    if (authStorage.isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return demoTestimonials;
    }
    return apiRequest<Testimonial[]>('/testimonials');
  },

  async createTestimonial(data: Partial<Testimonial>): Promise<Testimonial> {
    if (authStorage.isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newTestimonial: Testimonial = {
        _id: `demo-${Date.now()}`,
        quote: data.quote || '',
        authorName: data.authorName || '',
        authorTitle: data.authorTitle || '',
        clientCompany: data.clientCompany,
        authorImage: data.authorImage,
        rating: data.rating || 5,
        projectName: data.projectName,
        testimonialType: data.testimonialType || 'Client',
        isFeatured: data.isFeatured || false,
        createdAt: new Date().toISOString(),
      };
      demoTestimonials.push(newTestimonial);
      return newTestimonial;
    }
    return adminApi.createTestimonial(data);
  },

  async updateTestimonial(id: string, data: Partial<Testimonial>): Promise<Testimonial> {
    if (authStorage.isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = demoTestimonials.findIndex(t => t._id === id);
      if (index !== -1) {
        demoTestimonials[index] = { ...demoTestimonials[index], ...data };
        return demoTestimonials[index];
      }
      throw new Error('Testimonial not found');
    }
    return adminApi.updateTestimonial(id, data);
  },

  async deleteTestimonial(id: string): Promise<void> {
    if (authStorage.isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      demoTestimonials = demoTestimonials.filter(t => t._id !== id);
      return;
    }
    await adminApi.deleteTestimonial(id);
  },

  // Mentorship Sessions
  async getAllMentorshipSessions(): Promise<Mentorship[]> {
    if (authStorage.isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return demoMentorship;
    }
    return apiRequest<Mentorship[]>('/mentorship');
  },

  async createMentorshipSession(data: Partial<Mentorship>): Promise<Mentorship> {
    if (authStorage.isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newSession: Mentorship = {
        _id: `demo-${Date.now()}`,
        title: data.title || '',
        slug: data.slug || '',
        sessionType: data.sessionType || 'one-on-one',
        targetAudience: data.targetAudience || '',
        description: data.description || '',
        whatToExpect: data.whatToExpect || [],
        preparationRequired: data.preparationRequired,
        duration: data.duration || '60 minutes',
        price: data.price || 0,
        offerPrice: data.offerPrice,
        offerEndDate: data.offerEndDate,
        currency: data.currency || 'USD',
        bookingLink: data.bookingLink || '',
        testimonials: data.testimonials,
        isActive: data.isActive !== undefined ? data.isActive : true,
        isFeatured: data.isFeatured || false,
        createdAt: new Date().toISOString(),
      };
      demoMentorship.push(newSession);
      return newSession;
    }
    return adminApi.createMentorship(data);
  },

  async updateMentorshipSession(slugOrId: string, data: Partial<Mentorship>): Promise<Mentorship> {
    if (authStorage.isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = demoMentorship.findIndex(m => m._id === slugOrId || m.slug === slugOrId);
      if (index !== -1) {
        demoMentorship[index] = { ...demoMentorship[index], ...data };
        return demoMentorship[index];
      }
      throw new Error('Mentorship session not found');
    }
    // Use slug for real API
    const slug = data.slug || slugOrId;
    return adminApi.updateMentorship(slug, data);
  },

  async deleteMentorshipSession(slugOrId: string): Promise<void> {
    if (authStorage.isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      demoMentorship = demoMentorship.filter(m => m._id !== slugOrId && m.slug !== slugOrId);
      return;
    }
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
    if (authStorage.isDemoMode()) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        totalProjects: demoProjects.length,
        totalTestimonials: demoTestimonials.length,
        totalMentorshipSessions: demoMentorship.length,
        featuredProjects: demoProjects.filter(p => p.isFeatured).length,
        featuredTestimonials: demoTestimonials.filter(t => t.isFeatured).length,
        featuredSessions: demoMentorship.filter(m => m.isFeatured).length,
      };
    }
    
    // For real API, calculate stats from the data
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
