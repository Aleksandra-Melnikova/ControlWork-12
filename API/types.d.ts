export interface UserFields {
    email: string;
    password: string;
    token: string;
    role: string;
    image: string;
    displayName: string;
    googleID: string;
}
export interface PhotoWithoutID {
    user: string,
    title: string,
    image: string
}
