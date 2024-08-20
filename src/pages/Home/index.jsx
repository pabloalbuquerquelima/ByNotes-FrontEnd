import { FiPlus } from 'react-icons/fi'
import { Input } from '../../componentes/Input/index.jsx'
import { Section } from '../../componentes/Section/index.jsx'
import { Note } from '../../componentes/Note/index.jsx' 
import { Container, Brand, Menu, Search, Content, NewNote } from './styles.js'
import { ButtonText } from '../../componentes/ButtonText/index.jsx'
import { Header } from '../../componentes/Header/index.jsx'
import { useNavigate } from 'react-router-dom'

import { api } from '../../services/api.js'
import { useState } from 'react'
import { useEffect } from 'react'

export function Home() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);

  const navigate = useNavigate();

  function handleTagsSelected(tagName){
    if( tagName === "all" ){
      return setTagsSelected([]);
    }
    const alreadySelected = tagsSelected.includes(tagName);

    if(alreadySelected) {
      const filteredTags = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filteredTags);
    } else{
      setTagsSelected(prevState => [...prevState, tagName]);
    }
  }

  function handleDetails(id){
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get('/tags');
      setTags(response.data);
    }

    fetchTags();
  },[])

  useEffect(()=> {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      setNotes(response.data);
    }
    fetchNotes();
  },[tagsSelected,search])
    return (
      <Container>
        <Brand>
          <h1>ByNotes</h1>
        </Brand>
  
        <Header />
  
        <Menu>
        <li>
          <ButtonText 
            title="Todos" 
            onClick={() => handleTagsSelected("all")}
            $isactive={tagsSelected.length === 0} 
            />
        </li>
          {
            tags && tags.map(tag => (
              <li 
              key={String(tag.id)}>

                <ButtonText 
                title={tag.name} 
                onClick={() => handleTagsSelected(tag.name)}
                $isactive={tagsSelected.includes(tag.name)} 
                />
              </li>

            ))
          }
        </Menu>
  
        <Search>
          <Input 
          placeholder="Pesquisar pelo título" 
          onChange={(e) => setSearch(e.target.value)}
          />
        </Search>
  
        <Content>
          <Section title="Minhas notas">
            {
              notes.map(note =>(
            <Note 
            key={String(note.id)}
            data={note}
            onClick={() => handleDetails(note.id)}
            />
            ))
            }
          </Section>
        </Content>
  
        <NewNote to='New'>
          <FiPlus />
          Criar nota
        </NewNote>
      </Container>
    )
  }