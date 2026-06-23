// api/users.ts
import { get, patch, del, post } from './client';

// Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'FARMER' | 'DEALER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
  createdAt: string;
  updatedAt: string;
  dealer?: any;
  orders?: any[];
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  pendingUsers: number;
  farmers: number;
  dealers: number;
  admins: number;
  newUsersThisMonth: number;
  growth: number;
}

export interface UserListResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UpdateRoleDto {
  role: 'FARMER' | 'DEALER' | 'ADMIN';
}

export interface UpdateStatusDto {
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
}

// User API endpoints
export const userApi = {
  // Get all users with pagination and filters
  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: 'FARMER' | 'DEALER' | 'ADMIN';
    status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.role) queryParams.append('role', params.role);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const url = `/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return get<UserListResponse>(url);
  },

  // Get user statistics
  getStats: () => {
    return get<UserStats>('/users/stats');
  },

  // Get pending users
  getPending: () => {
    return get<User[]>('/users/pending');
  },

  // Search users
  search: (query: string) => {
    return get<User[]>(`/users/search?q=${encodeURIComponent(query)}`);
  },

  // Get users by role
  getByRole: (role: 'FARMER' | 'DEALER' | 'ADMIN') => {
    return get<User[]>(`/users/role/${role}`);
  },

  // Get a single user by ID
  getById: (id: string) => {
    return get<User>(`/users/${id}`);
  },

  // Get user activity
  getActivity: (id: string, limit?: number) => {
    const url = `/users/${id}/activity${limit ? `?limit=${limit}` : ''}`;
    return get<any[]>(url);
  },

  // Update user role
  updateRole: (id: string, role: 'FARMER' | 'DEALER' | 'ADMIN') => {
    return patch<User>(`/users/${id}/role`, { role });
  },

  // Update user status
  updateStatus: (id: string, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING') => {
    return patch<User>(`/users/${id}/status`, { status });
  },

  // Delete user
  delete: (id: string) => {
    return del<{ message: string }>(`/users/${id}`);
  },
};

// Default export for convenience
export default userApi;