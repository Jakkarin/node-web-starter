export default interface IUser {
    id: string;
    username: string;
    display_name: string;
    email: string;
    password: string;
    created_at: Date | string;
    updated_at: Date | string;
}