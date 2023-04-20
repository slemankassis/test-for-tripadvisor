import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor, fireEvent } from "@testing-library/react";
import CharacterList from "./CharacterList";
import { GET_CHARACTERS } from "../../graphql/queries";

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
            count: 3,
            pages: 1,
            next: null,
            prev: null,
          },
          results: [
            {
              id: "1",
              name: "Rick Sanchez",
              status: "Alive",
              species: "Human",
              gender: "Male",
            },
            {
              id: "2",
              name: "Morty Smith",
              status: "Alive",
              species: "Human",
              gender: "Male",
            },
            {
              id: "3",
              name: "Summer Smith",
              status: "Alive",
              species: "Human",
              gender: "Female",
            },
          ],
        },
      },
    },
  },
];

test("renders the character list", async () => {
  const { getByText, findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CharacterList />
    </MockedProvider>
  );

  expect(getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(getByText("Rick Sanchez")).toBeInTheDocument();
    expect(getByText("Morty Smith")).toBeInTheDocument();
    expect(getByText("Summer Smith")).toBeInTheDocument();
  });

  fireEvent.click(getByText("Next"));

  expect(await findByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(getByText("Rick Sanchez")).toBeInTheDocument();
    expect(getByText("Morty Smith")).toBeInTheDocument();
    expect(getByText("Summer Smith")).toBeInTheDocument();
  });
});

test("pagination works correctly", async () => {
  const { findByText, findByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CharacterList />
    </MockedProvider>
  );

  expect(await findByText("Loading...")).toBeInTheDocument();

  const nextPageButton = await findByTestId("next-page-button");

  fireEvent.click(nextPageButton);

  expect(await findByText("Loading...")).toBeInTheDocument();

  const characterName = await findByText("Rick Sanchez");
  expect(characterName).toBeInTheDocument();

  const characterLink = characterName.closest("a") as HTMLAnchorElement;
  fireEvent.click(characterLink);

  expect(await findByText("Status: Alive")).toBeInTheDocument();
});
