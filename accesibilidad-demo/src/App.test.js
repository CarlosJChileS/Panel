import { render, screen } from '@testing-library/react';
import App from './presentation/App';
jest.mock('react-leaflet');

test('renders dashboard title', () => {
  render(<App />);
  const heading = screen.getByText(/Dashboard Ambiental Costero/i);
  expect(heading).toBeInTheDocument();
});
