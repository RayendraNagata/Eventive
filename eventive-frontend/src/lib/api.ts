import api from './axios';

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (data: {
    email: string;
    password: string;
    name: string;
    organizationName?: string;
  }) => api.post('/auth/register', data),
  
  refreshToken: (refreshToken: string) =>
    api.post('/auth/refresh', { refreshToken }),
};

export const userAPI = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data: { name?: string; avatar?: string }) =>
    api.patch('/users/me', data),
  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }) => api.patch('/users/change-password', data),
};

export const eventAPI = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) => api.get('/events', { params }),
  
  getById: (id: string) => api.get(`/events/${id}`),
  create: (data: unknown) => api.post('/events', data),
  update: (id: string, data: unknown) => api.patch(`/events/${id}`, data),
  delete: (id: string) => api.delete(`/events/${id}`),
};

export const ticketAPI = {
  getByEvent: (eventId: string) => api.get(`/events/${eventId}/tickets`),
  validate: (eventId: string, ticketNumber: string) =>
    api.get(`/events/${eventId}/tickets/validate/${ticketNumber}`),
};

export const analyticsAPI = {
  getEventAnalytics: (eventId: string) =>
    api.get(`/analytics/events/${eventId}`),
  getOrganizationAnalytics: () =>
    api.get('/analytics/organization'),
};
