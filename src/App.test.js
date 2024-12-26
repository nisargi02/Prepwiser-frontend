import { render, screen } from '@testing-library/react';
import dashBoard from './pages/dashboard';

test('renders learn react link', () => {
  render(<dashBoard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
