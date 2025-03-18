export type JwtPayload = {
    sub: number,
    email: string,
    role?: string,
    birthday?: string
}