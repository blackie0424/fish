import { render, screen } from '@testing-library/react';
import useGetFishs from '../useGetFishs';

const TestComponent = () => {
    const { fishs, isLoading } = useGetFishs();
    return (
        <div>
            <span data-testid="loading">{isLoading.toString()}</span>
            <span data-testid="fishs">{fishs.length}</span>
        </div>
    );
};

describe('useGetFishs', () => {
    test('should have correct initial state', () => {
        render(<TestComponent />);
        expect(screen.getByTestId('loading').textContent).toBe('true');
        expect(screen.getByTestId('fishs').textContent).toBe('0');
    });
});