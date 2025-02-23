import { render, screen, act } from '@testing-library/react';
import useGetFishs from '../useGetFishs';

const TestComponent = () => {
    const { fishs, isLoading, error, getFishsFromAPI } = useGetFishs();
    return (
        <div>
            <span data-testid="loading">{isLoading.toString()}</span>
            <span data-testid="fishs">{fishs.length}</span>
            <span data-testid="error">{error || 'no error'}</span>
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

    test('should keep fishs empty when fetching fails with 404', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        });

        render(<TestComponent />);
        await act(async () => {
            await screen.getByText('Fetch').click();
        });

        expect(screen.getByTestId('loading').textContent).toBe('false');
        expect(screen.getByTestId('fishs').textContent).toBe('0');
        expect(screen.getByTestId('error').textContent).toBe('找不到資料');

    });

});