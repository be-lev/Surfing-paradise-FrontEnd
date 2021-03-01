export class Globals {
    public static vacationsUrl: string;
    public static authUrl: string;
    public static usersUrl: string;

    public static init() {
        if (process.env.NODE_ENV === "production") {
            Globals.vacationsUrl = ""; // needs to be update when we upload the project to production
        }
        else {
            Globals.vacationsUrl = " http://localhost:3001/api/vacations/"
            Globals.authUrl = " http://localhost:3001/api/auth/"
            Globals.usersUrl = " http://localhost:3001/api/users/"
        }
    }

}

Globals.init();