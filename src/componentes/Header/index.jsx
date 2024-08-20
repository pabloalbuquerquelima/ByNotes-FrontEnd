import { Container, Profile, Logout } from "./styles";
import { RiShutDownLine } from 'react-icons/ri';
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api.js";
import { useNavigate } from "react-router-dom";

export function Header() {
    const { user, signOut } = useAuth();
    const navigation = useNavigate();

    function handleSignOut(){

        navigation('/');
        signOut();
    }

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : defaultAvatar;

    return (
        <Container>

            <Profile to='/profile'>
                
                <img src={avatarUrl} alt="Foto do usuário" />

                <div>
                    <span>Bem-vindo!</span>
                    <strong>{user.name}</strong>
                </div>

            </Profile>

            <Logout onClick={handleSignOut}>
                <RiShutDownLine />
            </Logout>

        </Container>
    )
}