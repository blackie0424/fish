import { render, screen, act } from '@testing-library/react-native';
import FishDetailScreen from '@/app/fish/[id]';
import { useLocalSearchParams } from 'expo-router';

// Mock expo-router
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
        back: jest.fn(),
        // 根據需要模擬其他方法
    }),
    useLocalSearchParams: jest.fn(),
}));

jest.mock('@/services/locatStroageService', () => ({
    storeData: jest.fn(),
    getData: jest.fn().mockResolvedValue(null),
    clearData: jest.fn(),
}));

// Mock expo-font
jest.mock("expo-font", () => ({
    loadAsync: jest.fn(), // 模擬字體加載
    isLoaded: jest.fn(() => true), // 模擬字體已加載
}));

describe('FishDetailScreen automatically loads the fish data', () => {
    // 每次測試前重置 mock
    beforeEach(() => {
        global.fetch = jest.fn();
        (useLocalSearchParams as jest.Mock).mockReturnValue({ id: "1" });
    });

    // 測試自動載入成功
    test('should display the fish data automatically when the user enters the page', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => (
                {
                    "message": "success",
                    "data": {
                        "id": 1,
                        "name": "Ivey",
                        "type": "oyod",
                        "locate": "Iraraley",
                        "image": "https:\/\/etycehppghhlxqpdvlga.supabase.co\/storage\/v1\/object\/public\/tao_among_storage\/images\/Ivey.png",
                        "created_at": null,
                        "updated_at": null
                    }
                }
            ),
        });

        render(<FishDetailScreen />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0)); // 等待 useEffect
        });

        expect(screen.getByText('Ivey')).toBeTruthy(); // FishCard 顯示資料
        expect(screen.queryByText('找不到資料')).toBeNull(); // 沒有404錯誤
        expect(screen.queryByText('抱歉，系統出了點問題，請稍後再試')).toBeNull(); // 沒有500錯誤
        expect(screen.queryByText('目前沒有資料')).toBeNull(); // 沒有資料可以提供的情境未發生
    });

    test('should display skeleton UI while loading the fish data', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => (
                {
                    "message": "success",
                    "data": {
                        "id": 1,
                        "name": "Ivey",
                        "type": "oyod",
                        "locate": "Iraraley",
                        "image": "https:\/\/etycehppghhlxqpdvlga.supabase.co\/storage\/v1\/object\/public\/tao_among_storage\/images\/Ivey.png",
                        "created_at": null,
                        "updated_at": null
                    }
                }
            ),
        });

        render(<FishDetailScreen />);
        expect(screen.getByTestId('skeleton-fish-detail')).toBeTruthy(); // 只驗證骨架屏

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(screen.getByText('Ivey')).toBeTruthy(); // FishCard 顯示資料
        expect(screen.queryByTestId('skeleton-fish-detail')).toBeNull();
    });

});