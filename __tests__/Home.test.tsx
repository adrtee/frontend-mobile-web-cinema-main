import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../src/app/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../src/app/components/Header", () => () => (
  <div data-testid="header">Header</div>
));
jest.mock("../src/app/components/MovieCard", () => ({ movie }: any) => (
  <div data-testid="movie-card">{movie.title}</div>
));
jest.mock("../src/app/components/SearchNotFound", () => () => (
  <div data-testid="search-not-found">No Results</div>
));
jest.mock("../src/app/Home/Hero", () => () => (
  <div data-testid="hero">Hero</div>
));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        results: [
          { id: 1, title: "Movie 1" },
          { id: 2, title: "Movie 2" },
        ],
      }),
  })
) as jest.Mock;

describe("Home", () => {
  beforeAll(() => {
    class IntersectionObserverMock {
      observe = jest.fn();
      disconnect = jest.fn();
      unobserve = jest.fn();
      takeRecords = jest.fn();
    }

    (global as any).IntersectionObserver = IntersectionObserverMock;
  });

  it("renders initial components correctly", async () => {
    render(<Home />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByLabelText(/Sort by:/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByTestId("movie-card")).toHaveLength(2);
    });
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

  it("displays 'SearchNotFound' when no movies are fetched", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: [] }),
      })
    );
    render(<Home />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });
    expect(screen.getByTestId("search-not-found")).toBeInTheDocument();
  });
});
