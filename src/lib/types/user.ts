// User-related types for the Horse Racing Game

// Role group interface for user permissions
export interface RoleGroup {
  key: string
  roles: string[]
}

// Extended user interface with role groups
export interface AppUser {
  id: string
  firstName: string
  lastName: string
  email: string
  isAuthorized: boolean
  roleGroups: RoleGroup[]
  createdAt: Date
  updatedAt: Date
}

// User authentication state
export interface UserAuthState {
  user: AppUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// User permissions helper
export interface UserPermissions {
  hasRole: (role: string) => boolean
  hasAnyRole: (roles: string[]) => boolean
  hasAllRoles: (roles: string[]) => boolean
  getRoleGroups: () => RoleGroup[]
}
