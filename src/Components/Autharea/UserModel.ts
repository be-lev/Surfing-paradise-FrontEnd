class UserModel {

    public firstName: string;
    public lastName: string;
    public username: string;
    public password: any;
    public token: string
    public uuid: string;
    public isLoggedIn: boolean;
    public isAdmin: boolean;
    // cant get this 2 off problem with new typescript 
    findIndex: any;
    splice: any;
}

export default UserModel;