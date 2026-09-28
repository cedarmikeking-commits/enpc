declare global {
    declare interface Fn<T = any> {
        (...arg: T[]): T
    }
    declare interface IResponse<T = any> {
        code: string
        data: T extends any ? T : T & any
    }
    export type ResPage<T> = {
        records: T[]
        total: number
        size?: number
        pages?: number
    }
    export type PageParams = {
        size: number;
        current: number;
    }
}
export interface User {
    id: string;
    name: string;
    email: string;
    avatar_url?: string;
    department?: string;
    position?: string;
    user_type?: string;
    password_hash?: string;
    created_at: string;
    updated_at?: string;
}

export interface Application {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    category: string;
    url: string;
    sort_order: number;
    platform_type: 'management' | 'work';
    created_at: string;
}

export interface Notification {
    id: string;
    user_id: string;
    title: string;
    content: string;
    is_read: boolean;
    created_at: string;
}

export interface SystemStatus {
    status: string;
    online_users: number;
    version: string;
}
