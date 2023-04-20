import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { GET_CHARACTERS } from "../../graphql/queries";
import CharacterList from "./CharacterList";

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: { page: 1 },
    },
    result: {
      data: {
        characters: {
          info: {
            next: 2,
            prev: null,
          },
          results: [
            {
              id: "1",
              name: "Rick Sanchez",
              image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            },
            {
              id: "2",
              name: "Morty Smith",
              image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
            },
          ],
        },
      },
    },
  },
];

describe("CharacterList", () => {
  it("renders the character list with pagination buttons", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </MockedProvider>
    );

    // Check if loading state is rendered
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the data to load
    await waitFor(() => {
      // Check if the characters are rendered
      expect(screen.getByAltText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByAltText("Morty Smith")).toBeInTheDocument();

      // Check if pagination buttons are rendered
      expect(screen.getByTestId("prev-page-button")).toBeInTheDocument();
      expect(screen.getByTestId("next-page-button")).toBeInTheDocument();
    });
  });

  it("disables the 'Previous Page' button when on the first page", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </MockedProvider>
    );

    // Wait for the data to load
    await waitFor(() => {
      // Check if the 'Previous Page' button is disabled
      expect(screen.getByTestId("prev-page-button")).toBeDisabled();
    });
  });
});
