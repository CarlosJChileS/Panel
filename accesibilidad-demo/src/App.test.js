import { render, screen } from '@testing-library/react';
import App from './presentation/App';
jest.mock('react-leaflet');

test('renders welcome page', () => {
  render(<App />);
  const heading = screen.getByText(/Bienvenido al Sistema de Monitoreo Ambiental/i);
  expect(heading).toBeInTheDocument();
});
