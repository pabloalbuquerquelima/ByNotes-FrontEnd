import { Container } from "./styles";

export function Input({icon:Icon, value, onChange, ...rest}){
    return(
        <Container>
            {Icon && <Icon size={20}/>}
            <input 
            value={value}
            onChange={onChange}
            {...rest}/>
        </Container>
    )
}