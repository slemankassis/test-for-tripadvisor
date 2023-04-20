import React from "react";
import { render, screen } from "@testing-library/react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import CharacterDetail from "./CharacterDetail";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

jest.mock("@apollo/client");

describe("CharacterDetail", () => {
  const mockCharacter = {
    id: "1",
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      type: "Planet",
      dimension: "Dimension C-137",
    },
    location: {
      name: "Earth (Replacement Dimension)",
      type: "Planet",
      dimension: "Replacement Dimension",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading message while data is loading", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useQuery as jest.Mock).mockReturnValue({ loading: true });

    render(<CharacterDetail />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error message if there is an error", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useQuery as jest.Mock).mockReturnValue({ error: true });

    render(<CharacterDetail />);

    expect(screen.getByText("Error :(")).toBeInTheDocument();
  });

  test("renders character details when data is loaded", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useQuery as jest.Mock).mockReturnValue({
      data: { character: mockCharacter },
    });

    render(<CharacterDetail />);

    expect(screen.getByAltText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Status: ${mockCharacter.status}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Species: ${mockCharacter.species}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Gender: ${mockCharacter.gender}`)
    ).toBeInTheDocument();

    expect(screen.getByText("Origin")).toBeInTheDocument();
    expect(
      screen.getByText(`Name: ${mockCharacter.origin.name}`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(`Dimension: ${mockCharacter.origin.dimension}`)
    ).toBeInTheDocument();

    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(
      screen.getByText(`Name: ${mockCharacter.location.name}`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(`Dimension: ${mockCharacter.location.dimension}`)
    ).toBeInTheDocument();
  });
});
