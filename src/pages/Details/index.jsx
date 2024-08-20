import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

import { Container, Links, Content } from './styles.js';
import { Header } from '../../componentes/Header/index.jsx';
import { Button } from '../../componentes/Button/index.jsx';
import { ButtonText } from '../../componentes/ButtonText/index.jsx';
import { Section} from '../../componentes/Section/index.jsx';
import { Tag } from '../../componentes/Tag/index.jsx';

export function Details() {
  const [ data, setData ] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
}
  async function handleRemove() {
  const confirm = window.confirm("Deseja realmente remover a nota?");

  if (confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
  }
}
  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }
    fetchNote();
  }, []);


  return (
    <Container>
      <Header />
    {
      data && 
      <main>
        <Content>

        <ButtonText 
          title="Excluir Nota"
          onClick={handleRemove}
        />

          <h1>
            {data.title}
          </h1>

          <p>
            {data.description}
          </p>

          { 
                            data.links &&
                            <Section title="Links Úteis">
                                <Links>
                                    {
                                        data.links.map(link => (      
                                        <li key={String(link.id)}>
                                            <a href={link.url} target="_blank">
                                                {link.url}
                                            </a>
                                        </li>
                                        ))
                                    }
                                </Links>
                            </Section>
                        }

        { 
         data.tags &&
         <Section title="Marcadores">
          {
             data.tags.map(tag => (
               <Tag
                key={String(tag.id)}
                title={tag.name}
               />
             ))
          }
         </Section>
        }
                        <Button title="Voltar" onClick={handleBack} />

      </Content>
      </main>

    }

    </Container>
  )
}