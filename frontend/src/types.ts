/* eslint-disable camelcase */
export interface User {
  id: number,
  last_login: string,
  is_superuser: boolean,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  is_staff: boolean,
  is_active: boolean,
  date_joined: string,
  groups: Array<Groups>,
  user_permissions: Array<Permissions>
}

export interface UserTokens {
  refresh: string,
  access: string,
}

export interface Groups {
  // TODO
}

export interface Permissions {
  // TODO
}

export enum TokenType {
  'access',
  'refresh',
}

export interface Token {
  token_type: TokenType,
  exp: number,
  jti: string
  user_id: number,
}

export interface RefreshToken {
  refresh: string
}
export interface AcessToken {
  access: string
}

export interface Institution {
  id: number,
  name: string,
  abbr: string,
  location: string,
  website: string,
  managers: Array<number>,
}

export enum Degrees {
  College,
  Bachelors,
  Masters,
  Doctors,
}

export enum LearningTypes {
  REAL_LIFE,
  DISTANT,
  EXTRAMURAL,
}

export interface Programme {
  id: number,
  name: string,
  institution: number,
  degree: Degrees,
  duration_years: number,
  faculty: string,
  learning_type: LearningTypes,
  full_time: string,
  budget_places: number,
  total_places: number,
  study_costs: number,
  study_language: string,
  website: string,
  description: string,
}

export interface FilterOptions<T> {
  value: T,
  label: string,
}
