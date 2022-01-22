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

export interface Error {
    statusCode: number,
    message: string | MessageObject,
}