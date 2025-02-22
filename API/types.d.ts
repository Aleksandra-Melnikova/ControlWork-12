export interface UserFields {
    username: string;
    password: string;
    token: string;
    role: string;
    image: string;
    googleID: string;
}
export interface PhotoWithoutID {
    user: string,
    title: string,
    image: string | null;
}
