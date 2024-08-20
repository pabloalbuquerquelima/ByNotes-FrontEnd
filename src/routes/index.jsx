import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth"

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Router(){
    const {user} = useAuth()

    return(
        <BrowserRouter>

            {user ? <AppRoutes/> : <AuthRoutes/>}
            
        </BrowserRouter>
    )
}