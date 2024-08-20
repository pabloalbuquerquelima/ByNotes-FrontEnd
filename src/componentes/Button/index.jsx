import { Container } from "./styles.js";

export function Button({title, loading, onClick, ...rest}) { //..rest é todo o resto das propiedades

    return (
    <Container 
    
    type='button' 
    onClick={onClick}
    disabled={loading}
    {...rest}>
        
        {loading ? 'Carregando...' : title}
        
    </Container>
    )
}