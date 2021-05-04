import IAuth, { IAuthLog } from "@/models/auth.model";
import Listing from "@/utils/listing";

export default interface IAuthRepository {
    get(id: string, only: string[]): Promise<IAuth>;
    listByUserID(id: string): Promise<IAuth[]>;
    listLogByUserID(opts: Listing): Promise<IAuthLog[]>;
    create(user: IAuth, only: string[]): Promise<IAuth>;
    update(user: IAuth, only: string[]): Promise<void>;
    delete(id: string): Promise<void>;
}