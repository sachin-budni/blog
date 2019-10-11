export class Auth {

}

export class Signup {
    email: string;
    firstName?: string;
    lastName?: string;
    mobileNo: string;
    password: string;
}

export class Login{
    email: string;
    password: string;
}

export class CurrentUser {
    uid:string;
    name: string;
    photo:string;
    mobileNo?:string;
    email:string
    profile:string;
    verify:boolean;
}