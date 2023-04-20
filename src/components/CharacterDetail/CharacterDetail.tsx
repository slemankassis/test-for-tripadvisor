import React, { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../../graphql/queries";

function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const character = data.character;

  return (
    <div>
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Type: {character.type}</p>
      <p>Gender: {character.gender}</p>
      <h3>Origin</h3>
      <ul>
        <li>Name: {character.origin.name}</li>
        <li>Type: {character.origin.type}</li>
        <li>Dimension: {character.origin.dimension}</li>
      </ul>
      <h3>Location</h3>
      <ul>
        <li>Name: {character.location.name}</li>
        <li>Type: {character.location.type}</li>
        <li>Dimension: {character.location.dimension}</li>
      </ul>
    </div>
  );
}

export default CharacterDetail;
