export interface User{
    id: string;
    email: string;
    photoURL: any;
    name?: string;
    lastName?: string;
    displayName: string;
    birthday?: string;
    gender?: string;
    inGame?:boolean;
    inGameLink?: string;
}