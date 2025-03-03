import fetchMock from 'jest-fetch-mock';
import Fish from '@/services/fishService';

const Fishs_API_URL = "https://tao-among.vercel.app/prefix/api/fish";

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
            Fishs_API_URL, { method: 'GET' });
    });

    test('should throw specific error for Http Code is 404', async () => {
        fetchMock.mockResponseOnce(
            '', { status: 404, statusText: 'HTTP error! status: 404' }
        ); // 模擬 404

        await expect(Fish.getFishs()).rejects.toThrow('HTTP error! status: 404');

        expect(fetchMock).toHaveBeenCalledWith(
            Fishs_API_URL, { method: 'GET' });
    });

    test('should throw specific error for Http Code is 500', async () => {
        fetchMock.mockResponseOnce(
            '', { status: 500, statusText: 'HTTP error! status: 500' }
        ); // 模擬 500

        await expect(Fish.getFishs()).rejects.toThrow('HTTP error! status: 500');

        expect(fetchMock).toHaveBeenCalledWith(
            Fishs_API_URL, { method: 'GET' });
    });

    test('should throw generic HTTP error for non-404/500 status', async () => {
        fetchMock.mockResponseOnce(
            '', { status: 403, statusText: 'Forbidden' }
        ); // 模擬 403
        await expect(Fish.getFishs()).rejects.toThrow('HTTP error! status: 403');
        expect(fetchMock).toHaveBeenCalledWith(
            Fishs_API_URL, { method: 'GET' });
    });


    test('should fetch fish data successfully for a valid ID', async () => {

        const mockFishId = 1;
        const mockFishs = {
            "message": "success",
            "data": {
                "id": 1,
                "name": "Ivey",
                "type": "oyod",
                "locate": "Iraraley",
                "image": "https://etycehppghhlxqpdvlga.supabase.co/storage/v1/object/public/tao_among_storage/images/Ivey.png",
                "created_at": null,
                "updated_at": null
            }
        }

        fetchMock.mockResponseOnce(JSON.stringify(mockFishs));

        // 模擬 fetch 回傳的 API 資料
        const result = await Fish.getFish(mockFishId);

        // 驗證 fetch 是否被正確呼叫
        expect(fetchMock).toHaveBeenCalledWith(
            `${Fishs_API_URL}/${mockFishId}`, expect.objectContaining({ method: 'GET' }));

        // 驗證回傳的資料是否與 mockFishs.data 相同
        expect(result).toEqual(mockFishs.data);
    });

});
