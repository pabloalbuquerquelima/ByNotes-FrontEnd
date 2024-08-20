import { Routes, Route, Navigate } from 'react-router-dom';


import { SingIn } from '../pages/SignIn'
import { SingUp } from '../pages/SignUp'

export function AuthRoutes(){

    const user = localStorage.getItem('@by-notes:token');

    return(
        <Routes>

            <Route path='/' element={<SingIn/>}/>
           { !user && <Route path='/register' element={<Navigate to='/'/>}/> }

        </Routes>

    )
}