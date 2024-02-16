// user.model.ts

export interface IUser {
    username: string;
    userlastname: string;
    email: string;
    password: string;
    passwordconf: string;
    google_uid: string;
    roles:string[];
}  