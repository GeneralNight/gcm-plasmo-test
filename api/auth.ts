import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import storage from "~background";
import { RouterKeys } from "~routes";

export const login = async (authParams: {email:string, password:string}) => {
    if(!authParams || !authParams.email.length || !authParams.password.length) {
        throw new Error('Auth parameters invalid')
    }

    const auth = getAuth();

    try {
        const user = (await signInWithEmailAndPassword(auth, authParams.email, authParams.password)).user
        storage.set("user",user)
        return "success"
    } catch (error) {
        return error
    }       
}

export const logout = async () => {
    try {
        const auth = getAuth();
        await signOut(auth)
        storage.set("currentRoute",RouterKeys.LOGIN)
    } catch (error) {
        storage.set("currentRoute",RouterKeys.ISSUE)
    }
}

export const recoveryPassword = async (email:string) => {
    try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email)    
    } catch (error) {
        throw new Error("Failed to send email! Try Again")
    }
    
    
}