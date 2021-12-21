import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PageForm } from './PageForm';

describe('Page Form', () => {
    it('Should render all inputs', () => {
        const { container } = render(<PageForm />);

        const title = container.querySelector('input[name="title"]');
        const type = container.querySelector('select[name="type"]');
        const slug = container.querySelector('input[name="slug"]');
        const notes = container.querySelector('textarea[name="notes"]');
        const submit = container.querySelector('button[type="submit"]');

        expect(title).toBeInTheDocument();
        expect(type).toBeInTheDocument();
        expect(slug).toBeInTheDocument();
        expect(notes).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
    });
});
