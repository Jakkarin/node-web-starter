export default interface IAuth {
    id: string;
    user_id: string;
    access_id: string;
    refresh_id: string;
    expired_at: string;
    created_at: string;
    updated_at: string;
}

export interface IAuthLog {
    user_id: string;
    ip_address: string;
    user_agent: string;
    created_at: string;
}