export interface User {
  first_name: string
  last_name: string
  has_seen_onboarding: boolean
  id: string
  created_at: string
  updated_at: string
}

export interface UserCreateRequest {
  first_name: string
  last_name: string
}

export interface UserCreateResponse extends User {}
