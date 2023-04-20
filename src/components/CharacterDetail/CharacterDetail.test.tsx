import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter, Route } from "react-router-dom";
import CharacterDetail from "./CharacterDetail";
import { GET_CHARACTERS } from "../../graphql/queries";

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: { id: 1 },
    },
    result: {
      data: {
        character: {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        },
      },
    },
  },
];

test("renders character detail correctly", async () => {
  const { findByText, findByAltText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/character/1"]}>
        <Route path="/character/:id">
          <CharacterDetail />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  expect(await findByText("Loading...")).toBeInTheDocument();

  expect(await findByText("Name: Rick Sanchez")).toBeInTheDocument();
  expect(await findByText("Status: Alive")).toBeInTheDocument();
  expect(await findByText("Species: Human")).toBeInTheDocument();
  expect(await findByText("Type:")).toBeInTheDocument();
  expect(await findByText("Gender: Male")).toBeInTheDocument();
  expect(await findByAltText("Rick Sanchez")).toBeInTheDocument();
});
