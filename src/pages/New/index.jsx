import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Container, Form } from "./styles";
import { Header } from '../../componentes/Header/index.jsx';
import { Input } from "../../componentes/Input";
import { Textarea } from "../../componentes/Textarea/index.jsx";
import { NoteItem } from "../../componentes/NoteItem/index.jsx";
import { Section } from '../../componentes/Section/index.jsx';
import { Button } from "../../componentes/Button";
import { ButtonText } from '../../componentes/ButtonText/index.jsx';
import { api } from "../../services/api.js";

export function New(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState('');

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');

    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
    }

    function handleAddLink(){
        setLinks(prevState => [...prevState, newLink]);
        setNewLink('');
    }

    function handleAddTag(){
        setTags(prevState => [...prevState, newTag]);
        setNewTag('');
    }

    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted))
    }

    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    async function handleNewNote(){
        if(!title){
            return alert ("Digite um título para a nota.")
        }

        if(newTag) {
            return alert ('Você deixou uma Tag no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.')
        }
        if(newLink) {
            return alert ('Você deixou um Link no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.')
        }

        await api.post("/notes", {
            title,
            description,
            tags,
            links
        });

        alert('Nota criada com sucesso!');
        navigate(-1);
    } 
    return(
        <Container>
            <Header></Header>

            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>

                        <ButtonText 
                        title={'Voltar'}
                        onClick={handleBack}
                        />
                    </header>

                    <Input placeholder='Título' 
                    onChange={e =>setTitle(e.target.value)}
                    />

                    <Textarea placeholder='Escreva sua nota...'
                    onChange={e =>setDescription(e.target.value)}/>

                    <Section title='Links úteis'>
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                key={String(index)}
                                value={link}
                                onClick={() => handleRemoveLink(link)}
                                />
                            ))
                        }

                        <NoteItem 
                        isNew 
                        placeholder='Novo Link'
                        value={newLink}
                        onChange={e => setNewLink(e.target.value)}
                        onClick={handleAddLink}
                        />
                    </Section>
                    
                    <Section title='Marcadores'>
                        <div className="tags">
                            {
                                tags.map(( tag, index ) => (
                                    <NoteItem 
                                    key={String(index)}
                                    value={tag}
                                    onClick={() => handleRemoveTag(tag)}
                                    />
                                ))

                            }

                        <NoteItem 
                        isNew
                        placeholder='Nova tag'
                        value={newTag}
                        onChange={e => setNewTag(e.target.value)}
                        onClick={handleAddTag}
                        />
                        </div>
                    </Section>

                    <Button 
                    onClick={handleNewNote}
                    title='Salvar'
                    />
                </Form>
            </main>
        </Container>
    )
}