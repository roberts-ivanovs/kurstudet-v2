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

export interface UserLogin {
    expiry: string,
    token: string,
    user: User,
}

export interface Groups {
    // TODO
}

export interface Permissions {
    // TODO
}
