import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../../graphql/queries";
import { Character } from "../../graphql/types";

function CharacterList() {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.characters.results.map((character: Character) => (
        <div key={character.id}>
          <Link to={`/characters/${character.id}`}>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
          </Link>
        </div>
      ))}
      <button
        onClick={() => setPage(page - 1)}
        disabled={!data.characters.info.prev}
        data-testid="prev-page-button"
      >
        Previous Page
      </button>
      <button
        onClick={() => setPage(page + 1)}
        disabled={!data.characters.info.next}
        data-testid="next-page-button"
      >
        Next Page
      </button>
    </div>
  );
}

export default CharacterList;
