import { render, screen, act } from '@testing-library/react-native';
import HomeScreen from '@/app/fish/index';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Mock expo-router
jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
    useLocalSearchParams: jest.fn(),
}));

describe('HomeScreen autoloading fish list', () => {
    // 每次測試前重置 mock
    beforeEach(() => {
        global.fetch = jest.fn();
        useRouter.mockReturnValue({ replace: jest.fn(), push: jest.fn() });
        useLocalSearchParams.mockReturnValue({ refresh: undefined });
    });

    // 測試自動載入成功
    test('should fetch and display fishs automatically on mount', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ message: "success", data: [{ id: 1, name: 'cilat' }] }),
        });

        render(<HomeScreen />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0)); // 等待 useEffect
        });

        expect(screen.getByText('cilat')).toBeTruthy(); // 檢查 FishCard 顯示
        expect(screen.queryByText('找不到資料')).toBeNull(); // 沒有資料可以提供的情境發生
        expect(screen.queryByText('抱歉，系統出了點問題，請稍後再試')).toBeNull(); // 沒有500錯誤
        expect(screen.queryByText('目前沒有資料')).toBeNull(); // 沒有404錯誤
    });

    test('should display empty list when fetch returns no data', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ message: "success", data: [] }),
        });

        render(<HomeScreen />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(screen.queryByText('cilat')).toBeNull(); // 無資料
        expect(screen.queryByText('找不到資料')).toBeNull(); // 無錯誤
    });

    test('should display error message when fetch fails get 500 response', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
        });

        render(<HomeScreen />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(screen.queryByText('cilat')).toBeNull(); // 無資料
        expect(screen.getByText('抱歉，系統出了點問題，請稍後再試')).toBeTruthy(); // 顯示錯誤
    });

    test('should display error message when fetch fails get 404 response', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
            statusText: 'Not Found'
        });

        render(<HomeScreen />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(screen.queryByText('cilat')).toBeNull(); // 無資料
        expect(screen.getByText('找不到資料')).toBeTruthy(); // 顯示錯誤
    });

    test('should display no data message when fishs data is empty', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ message: "success", data: [] })
        });

        render(<HomeScreen />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(screen.queryByText('cilat')).toBeNull(); // 無資料
        expect(screen.getByText('目前沒有資料')).toBeTruthy(); // 顯示錯誤
    });

});