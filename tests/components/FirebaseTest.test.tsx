/**
 * Component Test: FirebaseTest Component
 * 
 * This test demonstrates how to write component tests using React Testing Library.
 */

import { render, screen } from '@testing-library/react';
import FirebaseTest from '@/app/components/FirebaseTest';

describe('FirebaseTest Component', () => {
	it('should render the component title', () => {
		render(<FirebaseTest />);

		const title = screen.getByText(/Firebase Integration Test/i);
		expect(title).toBeInTheDocument();
	});

	it('should display service status section', () => {
		render(<FirebaseTest />);

		const statusHeading = screen.getByText(/Service Status:/i);
		expect(statusHeading).toBeInTheDocument();
	});

	it('should show all three Firebase services', () => {
		render(<FirebaseTest />);

		expect(screen.getByText(/Authentication/i)).toBeInTheDocument();
		expect(screen.getByText(/Firestore Database/i)).toBeInTheDocument();
		expect(screen.getByText(/Storage/i)).toBeInTheDocument();
	});

	it('should display note section', () => {
		render(<FirebaseTest />);

		const note = screen.getByText(/Note:/i);
		expect(note).toBeInTheDocument();
	});

	it('should have proper styling', () => {
		const { container } = render(<FirebaseTest />);

		const mainDiv = container.firstChild as HTMLElement;
		expect(mainDiv).toHaveStyle({
			padding: '20px',
			borderRadius: '8px',
		});
	});
});
