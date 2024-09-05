import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Test page", () => {
  it("renders correctly", () => {
    render(<Page />);
    const txt = screen.getByText("page");
    expect(txt).toBeInTheDocument();
  });
});
