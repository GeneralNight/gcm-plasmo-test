import { Storage } from "@plasmohq/storage";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import routes, { RouterKeys } from "~routes";

const storage = new Storage()

const firebaseConfig = {
    apiKey: "AIzaSyCtHK4LwrC8gQi8jEGcPPegGbN7VOjNfhQ",
    authDomain: "sid-rastreamento.firebaseapp.com",
    projectId: "sid-rastreamento",
    storageBucket: "sid-rastreamento.appspot.com",
    messagingSenderId: "18277878324",
    appId: "1:18277878324:web:b73533b53019d317c91861"
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
onAuthStateChanged(auth,async (user)=>{
    const routeName = await storage.get("currentRoute")
    if(user &&  routeName === RouterKeys.LOGIN) {
        storage.set("currentRoute",RouterKeys.INCIDENTS)
    } else if(!user && (!routes[routeName] || routes[routeName].onlyAuthenticated)) {
        storage.set("currentRoute",RouterKeys.LOGIN)
    }
    
})

export default storage