import React, { useEffect, useState } from "react";
import axios from "axios"

export default function CharacterCard(props) {
  // console.log('character card', props)

  const [showCharacter, setShowCharacter] = useState([])

  useEffect(() => {
    // console.log('id prop', props)
    const id = props.match.params.id;
    // console.log('id', id)
       axios
        .get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => {
          // console.log('response', response)
          setShowCharacter([response.data])
        })
        .catch(error => {
          console.error(error);
        });

  },[props]);

  // console.log('showcharacter', showCharacter)
  
  return (
    <div>
      {showCharacter.map(character => {
        return <div key={character.id}>
          <h1>{character.name}</h1>
          <p>
            <img src={character.image} alt={character.name} /><br />
            {character.status} <br />
            {character.species} <br />
            {character.gender} <br />
            {character.origin.name} 
          </p>
        </div>
      })}      
    </div>
  )

}