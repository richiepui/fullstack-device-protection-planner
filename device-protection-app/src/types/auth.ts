export interface ILoginApiResponse {
    token: string;
    userId: string;
    username: string;
}

export interface IRegisterApiResponse {
    message: string;
}

export interface IVerifyJwtTokenResponse {
    message: string;
    data: {
        userId: string,
        username: string
    }
}

export interface ILoginRequest {
    username: string
    password: string
}
