export enum RouterKeys {
    LOGIN = 'login',
    RECOVERY_PASSWORD = 'recoveryPassword',
    ISSUE = 'issue',
    INCIDENTS = 'incidents',
}

type RouteMap = {
    [k:string] : {
        url: string;
        onlyAuthenticated: boolean;
    }
}

const routes: RouteMap = {
    [RouterKeys.LOGIN]: {
        url: "./tabs/Login.html",
        onlyAuthenticated: false
    },
    [RouterKeys.RECOVERY_PASSWORD]: {
        url: "./tabs/RecoveryPassword.html",
        onlyAuthenticated: false
    },
    [RouterKeys.ISSUE]: {
        url: "./tabs/Issue.html",
        onlyAuthenticated: false
    },
    [RouterKeys.INCIDENTS]: {
        url: "./tabs/Incidents.html",
        onlyAuthenticated: true
    },
}

export default routes