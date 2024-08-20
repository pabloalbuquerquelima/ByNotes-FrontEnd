import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import { Container, Form, Background } from "./styles";
import { Link } from "react-router-dom";

import { Input } from "../../componentes/Input";
import { Button } from "../../componentes/Button";
import ByNotes from "../../assets/ByNotes-icon.png";
import {FiMail, FiLock} from 'react-icons/fi';

export function SingIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useAuth();

    function handleSignIn(e){
        e.preventDefault();
        signIn({ email, password })
    }

    return (
        <Container>
            <Form>
                <img src={ByNotes} alt="ByNotes icone" />
                <h1>ByNotes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>

                <h2>Faça seu login</h2>

                <Input
                placeholder= "Email"
                type='text'
                icon={FiMail}
                onChange={e => setEmail(e.target.value)}
                />

                <Input
                placeholder= "Senha"
                type='password'
                icon={FiLock}
                onChange={e => setPassword(e.target.value)}
                />

                <Button title='Entrar' onClick={handleSignIn}></Button>


                <Link to='/register'>Criar conta</Link>
            </Form>

            <Background alt='ByNotes logo'></Background>
        </Container>
    )
}