import IUser from "@/models/user.model";
import Listing, { ListingResult } from "@/utils/listing";

export default interface IUserRepository {
    get(id: string, only: string[]): Promise<IUser>;
    getByEmail(email: string, only: string[]): Promise<IUser>;
    list(opts: Listing, only: string[]): Promise<ListingResult<IUser[]>>;
    create(user: IUser, only: string[]): Promise<IUser>;
    update(user: IUser, only: string[]): Promise<void>;
    delete(id: string): Promise<void>;
}
