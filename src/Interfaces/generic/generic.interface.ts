interface MessageObject {
    property: string;
    children: [];
    constraint: {
        isNotEmpty?: string;
        isString?: string;
        isObject?: string;
        isIn?: string;
    };
}
export interface Pagination{
    total: number
    page: number,
    pages: number,
    limit: number
}

export interface Error {
    statusCode: number,
    message: string | MessageObject,
}
