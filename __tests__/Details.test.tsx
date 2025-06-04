import { render, screen } from "@testing-library/react";
import Detail from "../src/app/detail/[id]/page";
import "@testing-library/jest-dom";

jest.mock("../src/app/components/SearchNotFound", () => () => (
  <div data-testid="search-not-found">No Results</div>
));

global.fetch = jest.fn();

describe("Detail Page", () => {
  const mockMovieData = {
    data: {
      title: "Example Movie",
      original_title: "Example Original Title",
      overview: "This is a sample overview.",
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Drama" },
      ],
      spoken_languages: [
        { english_name: "English", iso_639_1: "en", name: "English" },
      ],
      runtime: 120,
      poster_path: "/sample.jpg",
    },
  };

  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMovieData),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders movie details when movie data is available", async () => {
    const element = await Detail({ params: { id: "123" } });
    const { getByText } = render(element);

    expect(
      getByText("Example Movie (Example Original Title)")
    ).toBeInTheDocument();
    expect(getByText("Synopsis:")).toBeInTheDocument();
    expect(getByText("This is a sample overview.")).toBeInTheDocument();
    expect(getByText("Genres:")).toBeInTheDocument();
    expect(getByText("Action, Drama")).toBeInTheDocument();
    expect(getByText("Languages:")).toBeInTheDocument();
    expect(getByText("English")).toBeInTheDocument();
    expect(getByText("Duration:")).toBeInTheDocument();
    expect(getByText("120 minutes")).toBeInTheDocument();
  });

  it("renders SearchNotFound when movie data is null", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ data: null }),
    });

    const element = await Detail({ params: { id: "999" } });
    render(element);
    expect(screen.getByTestId("search-not-found")).toBeInTheDocument();
  });
});
