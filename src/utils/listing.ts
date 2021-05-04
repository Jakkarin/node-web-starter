interface ListingWhere {
    [_: string]: {
        contains?: string,
        in?: any[],
        notIn?: any[],
        notEqual?: any,
    } | any;
}

interface ListingOrder {
    [_: string]: boolean;
}

export interface ListingResult<T = any> {
    data: T;
    total: number;
}

export default interface Listing {
    limit?: number,
    offset?: number,
    order?: ListingOrder;
    where?: ListingWhere[];
}