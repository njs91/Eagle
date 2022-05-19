import { Header, links } from '../components/Header';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Navbar links', () => {
    render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );

    it('should render links properly', () => {
        links.forEach(({ title, url }) => {
            expect(screen.getByText(title)).toHaveAttribute('href', url);
        });
    });
});
