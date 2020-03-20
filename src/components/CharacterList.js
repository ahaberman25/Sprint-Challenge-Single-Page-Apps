import React, { useEffect, useState } from "react"
import axios from "axios"
import { Route, Link } from 'react-router-dom';
import CharacterCard from "./CharacterCard"

export default function CharacterList() {
  // TODO: Add useState to track data from useEffect
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    // TODO: Add API Request here - must run in `useEffect`
    //  Important: verify the 2nd `useEffect` parameter: the dependancies array!
    axios.get('https://rickandmortyapi.com/api/character/')
      .then(response => {
        console.log('api', response.data)
        setCharacters(response.data.results) //info holds page/count/next
      }).catch(error => {
        console.log('err', error)
      })
  }, []);

  console.log('charcters', characters)

  return (
    <section className="character-list">
      <div>
          <Route path='/characters/:id' component={(props) => <CharacterCard {...props} info={characters} />} />
          {characters.map(character => {
            return <div>
                    <Link to={`/characters/${character.id}`}><p>{character.name}</p></Link>
                   </div>
          })}
      </div>
    </section>
  );
}