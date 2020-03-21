import React, { useEffect, useState } from "react"
import axios from "axios"
import { Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import CharacterCard from "./CharacterCard"

export default function CharacterList(props) {
  // console.log('list props', props)
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character/')
      .then(response => {
        // console.log('api', response.data)
        setCharacters(response.data.results) //info holds page/count/next
      }).catch(error => {
        console.log('err', error)
      })
  }, []);

  // console.log('charcters', characters)

  // DESIGN
  const ListContainer = styled.div`
    display: flex;
  `;

  const CharacterInfo = styled.div`
    width: 50%;
  `;

  const CharacterNamesContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
  `;

  return (
    <section className="character-list">
      <ListContainer>
      <CharacterNamesContainer>
          {characters.map(character => {
            return <div key={character.id}>
                      <Link to={`/characters/${character.id}`}><h3>{character.name}</h3></Link>
                   </div>
                   
          })}
        </CharacterNamesContainer>
        <CharacterInfo>
          <Route path='/characters/:id' component={(props) => <CharacterCard {...props} info={characters} />} />
        </CharacterInfo>        
      </ListContainer>
    </section>
  );
}