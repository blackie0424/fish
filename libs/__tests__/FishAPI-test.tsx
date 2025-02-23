import Fish from '@/libs/Fish';
require("@/libs/Fish")
import fetchMock from 'jest-fetch-mock';

const Fishs_API_URL = "https://tao-among.vercel.app/prefix/api/fish";

const Fish_By_ID_API_URL = "https://tao-among.vercel.app/prefix/api/fish/1";

fetchMock.enableMocks();

describe('API module', () => {

    beforeEach(() => {
        fetchMock.resetMocks(); // 重置 fetch mock 狀態，避免影響其他測試
    });

    test('should fetch fishs successfully', async () => {

        const mockFishs = {
            "message": "success",
            "data": [
                {
                    "id": 1,
                    "name": "cilat",
                    "type": "rahet",
                    "locate": "Iraraley",
                    "image": "https://etycehppghhlxqpdvlga.supabase.co/storage/v1/object/public/tao_among_storage/images/cilat.png",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    "id": 2,
                    "name": "Ivey",
                    "type": "oyod",
                    "locate": "Iraraley",
                    "image": "https://etycehppghhlxqpdvlga.supabase.co/storage/v1/object/public/tao_among_storage/images/Ivey.png",
                    "created_at": null,
                    "updated_at": null
                },
            ]
        }

        fetchMock.mockResponseOnce(JSON.stringify(mockFishs));

        // 模擬 fetch 回傳的 API 資料
        const result = await Fish.getFishs();

        // 驗證 fetch 是否被正確呼叫
        expect(fetchMock).toHaveBeenCalledWith(
            Fishs_API_URL, expect.objectContaining({ method: 'GET' }));

        // 驗證回傳的資料是否與 mockFishs.data 相同
        expect(result).toEqual(mockFishs.data);
    });

    test('should throw an error when fetch fishs fails', async () => {
        // 模擬網路錯誤
        fetchMock.mockRejectOnce(new Error('Network Error'));

        await expect(Fish.getFishs()).rejects.toThrow('Network Error');

        expect(fetchMock).toHaveBeenCalledWith(
            'https://tao-among.vercel.app/prefix/api/fish', { method: 'GET' });
    });

    test('should throw specific error for Http Code is 404', async () => {
        fetchMock.mockResponseOnce('', { status: 404, statusText: 'Fish list not found' }); // 模擬 404

        await expect(Fish.getFishs()).rejects.toThrow('Fish list not found');

        expect(fetchMock).toHaveBeenCalledWith(
            'https://tao-among.vercel.app/prefix/api/fish', { method: 'GET' });
    });

    test('should throw specific error for Http Code is 500', async () => {
        fetchMock.mockResponseOnce('', { status: 500, statusText: 'Server error occurred' }); // 模擬 500

        await expect(Fish.getFishs()).rejects.toThrow('Server error occurred');

        expect(fetchMock).toHaveBeenCalledWith(
            'https://tao-among.vercel.app/prefix/api/fish', { method: 'GET' });
    });

});
