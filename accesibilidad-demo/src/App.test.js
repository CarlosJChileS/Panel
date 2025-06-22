import { render, screen } from '@testing-library/react';
import App from './presentation/App';

test('renders dashboard title', () => {
  render(<App />);
  const heading = screen.getByText(/Dashboard Ambiental Costero/i);
  expect(heading).toBeInTheDocument();
});
