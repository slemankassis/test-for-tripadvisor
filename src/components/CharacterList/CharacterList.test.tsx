import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
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
            count: 671,
            pages: 34,
            next: "https://rickandmortyapi.com/graphql?variables=%7B%22page%22%3A2%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%220ea22d931e051925c474dc17bf9ec6f78c69e7336436e7b72f2b310be7c19d8a%22%7D%7D",
            prev: null,
          },
          results: [
            {
              id: 1,
              name: "Rick Sanchez",
              status: "Alive",
              species: "Human",
              type: "",
              gender: "Male",
              image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            },
            {
              id: 2,
              name: "Morty Smith",
              status: "Alive",
              species: "Human",
              type: "",
              gender: "Male",
              image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
            },
          ],
        },
      },
    },
  },
];

test("renders character list correctly", async () => {
  const { findByText, findByAltText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CharacterList />
    </MockedProvider>
  );

  expect(await findByText("Loading...")).toBeInTheDocument();

  expect(await findByText("Rick Sanchez")).toBeInTheDocument();
  expect(await findByText("Morty Smith")).toBeInTheDocument();

  expect(await findByAltText("Rick Sanchez")).toBeInTheDocument();
  expect(await findByAltText("Morty Smith")).toBeInTheDocument();
});

const findByTextContent = (container: HTMLElement, text: string) => {
  const elements = Array.from(container.querySelectorAll("*"));

  return Promise.all(
    elements.map((element) => {
      if (element.textContent === text) {
        return element;
      }

      return null;
    })
  ).then((foundElements) => foundElements.filter(Boolean)[0]);
};

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

  const characterName = await findByTextContent(document.body, "Rick Sanchez");
  expect(characterName).toBeInTheDocument();

  const characterLink = characterName?.closest("a") as HTMLAnchorElement;

  fireEvent.click(characterLink);

  expect(await findByText("Status: Alive")).toBeInTheDocument();
});
