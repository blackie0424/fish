import { render, screen,act } from '@testing-library/react';
import useGetFishs from '../useGetFishs';

const TestComponent = () => {
    const { fishs, isLoading, getFishsFromAPI } = useGetFishs();
    return (
        <div>
            <span data-testid="loading">{isLoading.toString()}</span>
            <span data-testid="fishs">{fishs.length}</span>
            <button onClick={getFishsFromAPI}>Fetch</button>
        </div>
    );
};

describe('useGetFishs', () => {
    test('should have correct initial state', () => {
        render(<TestComponent />);
        expect(screen.getByTestId('loading').textContent).toBe('true');
        expect(screen.getByTestId('fishs').textContent).toBe('0');
    });

    test('should update state when fetching succeeds', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ message: "success", data: [{ id: 1, name: 'cilat' }] }),
        });

        render(<TestComponent />);
        await act(async () => {
            await screen.getByText('Fetch').click(); // 模擬使用者點擊
        });

        expect(screen.getByTestId('loading').textContent).toBe('false');
        expect(screen.getByTestId('fishs').textContent).toBe('1');
    });

});