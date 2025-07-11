export interface ILogin{
        email:string,
        password:string
};

export interface IRegister{
    name:string,
    email:string,
    phone:string,
    password:string,
    password_confirmation:string,
};

export interface IForgetPassword{
        email:string
};

export interface IResetPassword{
       password:string,
};


export interface IContactUs{
    full_name: string,
    subject: string,
    message: string,
}


export interface IDialog{
    title: string,
    message: string,
    buttonText: string,
    route: string,
}



