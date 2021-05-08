import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Logs from '../pages/logs/[username]/index';

test("Check for Getting Started Text", () => {
    const { getByText } = render(<Logs />);
    expect(getByText("Username")).toBeInTheDocument();
});