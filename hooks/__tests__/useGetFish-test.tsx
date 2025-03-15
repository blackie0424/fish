import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import useGetFish from '../useGetFish';

jest.mock('@/services/locatStroageService', () => ({
    storeData: jest.fn(),
    getData: jest.fn().mockResolvedValue(null),
    clearData: jest.fn(),
}));


// Mock expo-router
jest.mock('expo-router', () => ({
    useLocalSearchParams: jest.fn().mockReturnValue({ id: '100' }),
}));


describe('useGetFish', () => {
    describe('focus in API', () => {
        const originalFetch = global.fetch; // 保存原始 fetch
        const TestComponent = () => {
            const { fishId, fishData, isLoading, error, getFishDataFromAPI } = useGetFish();
            return (
                <div>
                    <span data-testid="loading">{isLoading.toString()}</span>
                    <span data-testid="fishId">{fishId}</span>
                    <span data-testid="name">{fishData ? fishData.name : ""}</span>
                    <span data-testid="type">{fishData ? fishData.type : ""}</span>
                    <span data-testid="locate">{fishData ? fishData.locate : ""}</span>
                    <span data-testid="process">{fishData ? fishData.process : ""}</span>
                    <span data-testid="error">{error ? error.message : 'no error'}</span>
                    <button onClick={getFishDataFromAPI} data-testid="fetch-button">Fetch</button>
                </div>
            );
        };

        beforeEach(() => {
            jest.clearAllMocks();
        });

        afterEach(() => {
            global.fetch = originalFetch;
        });

        test('should show fish data when fetching succeeds', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => (
                    {
                        "data": {
                            id: 100,
                            name: 'ilek',
                            type: "oyod",
                            locate: "Iraraley",
                            process: "isisan"
                        }
                    }
                ),
            });

            render(<TestComponent />);
            expect(screen.getByTestId('loading').textContent).toBe('true');

            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(
                    'https://tao-among.vercel.app/prefix/api/fish/100',
                    { method: "GET" }
                );
                expect(screen.getByTestId('loading').textContent).toBe('false');
                expect(screen.getByTestId('fishId').textContent).toBe("100");
                expect(screen.getByTestId('error').textContent).toBe("no error");
                expect(screen.getByTestId('name').textContent).toBe("ilek");
                expect(screen.getByTestId('type').textContent).toBe("oyod");
                expect(screen.getByTestId('locate').textContent).toBe("Iraraley");
                expect(screen.getByTestId('process').textContent).toBe("isisan");

            });

        });
    });
});