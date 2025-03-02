import { render, screen, act } from '@testing-library/react-native';
import FishDetailScreen from '@/app/fish/[id]';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Mock expo-router
jest.mock('expo-router', () => ({
    useLocalSearchParams: jest.fn(),
}));

describe('FishDetailScreen automatically loads the fish data', () => {
    // 每次測試前重置 mock
    beforeEach(() => {
        global.fetch = jest.fn();
        useLocalSearchParams.mockReturnValue({ id: '1' });
    });

    // 測試自動載入成功
    test('should display the fish data automatically when the user enters the page', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ message: "success", data: [{ id: 1, name: 'cilat' }] }),
        });

        render(<FishDetailScreen />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0)); // 等待 useEffect
        });

        expect(screen.getByText('cilat')).toBeTruthy(); // FishCard 顯示資料
        expect(screen.queryByText('找不到資料')).toBeNull(); // 沒有404錯誤
        expect(screen.queryByText('抱歉，系統出了點問題，請稍後再試')).toBeNull(); // 沒有500錯誤
        expect(screen.queryByText('目前沒有資料')).toBeNull(); // 沒有資料可以提供的情境未發生
    });
});