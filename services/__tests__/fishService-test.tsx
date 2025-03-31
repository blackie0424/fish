import fetchMock from 'jest-fetch-mock';
import FishService from '@/services/fishService';

const Fishs_API_URL = "https://tao-among.vercel.app/prefix/api/fish";

fetchMock.enableMocks();

type FishObject = {
    name: string;
    type?: string;
    locate?: string;
    image?: string;
};

describe('API module', () => {
    const originalFetch = global.fetch; // 保存原始 fetch

    beforeEach(() => {
        fetchMock.resetMocks(); // 重置 fetch mock 狀態，避免影響其他測試
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });
    // 測試 getFishs 相關案例
    describe('getFishs - Fetch Fish List', () => {
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
            const result = await FishService.getFishs();

            // 驗證 fetch 是否被正確呼叫
            expect(fetchMock).toHaveBeenCalledWith(
                Fishs_API_URL, expect.objectContaining({ method: 'GET' }));

            // 驗證回傳的資料是否與 mockFishs.data 相同
            expect(result).toEqual(mockFishs.data);
        });

        test('should fetch empty fishes data successfully', async () => {

            const mockFishs = {
                "message": "No data available",
                "data": null
            }

            fetchMock.mockResponseOnce(JSON.stringify(mockFishs));

            // 模擬 fetch 回傳的 API 資料
            const result = await FishService.getFishs();

            // 驗證 fetch 是否被正確呼叫
            expect(fetchMock).toHaveBeenCalledWith(
                Fishs_API_URL, expect.objectContaining({ method: 'GET' }));

            // 驗證回傳的資料是否與 mockFishs.data 相同
            console.log(result);
            expect(result).toEqual(mockFishs.data);
            expect(result).toBeNull();
        });

        test('should throw an error when fetch fishs fails', async () => {
            // 模擬網路錯誤
            fetchMock.mockRejectOnce(new Error('Network Error'));

            await expect(FishService.getFishs()).rejects.toThrow('Network Error');

            expect(fetchMock).toHaveBeenCalledWith(
                Fishs_API_URL, { method: 'GET' });
        });

        test('should throw specific error for Http Code is 404', async () => {
            fetchMock.mockResponseOnce(
                '', { status: 404, statusText: 'HTTP error! status: 404' }
            ); // 模擬 404

            await expect(FishService.getFishs()).rejects.toThrow('HTTP error! status: 404');

            expect(fetchMock).toHaveBeenCalledWith(
                Fishs_API_URL, { method: 'GET' });
        });

        test('should throw specific error for Http Code is 500', async () => {
            fetchMock.mockResponseOnce(
                '', { status: 500, statusText: 'HTTP error! status: 500' }
            ); // 模擬 500

            await expect(FishService.getFishs()).rejects.toThrow('HTTP error! status: 500');

            expect(fetchMock).toHaveBeenCalledWith(
                Fishs_API_URL, { method: 'GET' });
        });

        test('should throw generic HTTP error for non-404/500 status', async () => {
            fetchMock.mockResponseOnce(
                '', { status: 403, statusText: 'Forbidden' }
            ); // 模擬 403
            await expect(FishService.getFishs()).rejects.toThrow('HTTP error! status: 403');
            expect(fetchMock).toHaveBeenCalledWith(
                Fishs_API_URL, { method: 'GET' });
        });
    });

    // 測試 getFish(id) 相關案例
    describe('getFish - Fetch Fish by ID', () => {
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
            const result = await FishService.getFish(mockFishId);

            // 驗證 fetch 是否被正確呼叫
            expect(fetchMock).toHaveBeenCalledWith(
                `${Fishs_API_URL}/${mockFishId}`, expect.objectContaining({ method: 'GET' }));

            // 驗證回傳的資料是否與 mockFishs.data 相同
            expect(result).toEqual(mockFishs.data);
        });

        test('should fetch empty fish data successfully for a non-existent ID', async () => {

            const mockFishId = 10000001;
            const mockFishs = {
                "message": "data not found",
                "data": null
            }

            fetchMock.mockResponseOnce(JSON.stringify(mockFishs));

            // 模擬 fetch 回傳的 API 資料
            const result = await FishService.getFish(mockFishId);

            // 驗證 fetch 是否被正確呼叫
            expect(fetchMock).toHaveBeenCalledWith(
                `${Fishs_API_URL}/${mockFishId}`, expect.objectContaining({ method: 'GET' }));

            // 驗證回傳的資料是否與 mockFishs.data 相同
            console.log(result);
            expect(result).toEqual(mockFishs.data);
            expect(result).toBeNull();
        });

        test('should throw an error when fetch the fish data fails', async () => {
            const mockFishId = 1;

            // 模擬網路錯誤
            fetchMock.mockRejectOnce(new Error('Network Error'));

            await expect(FishService.getFish(mockFishId)).rejects.toThrow('Network Error');

            expect(fetchMock).toHaveBeenCalledWith(
                `${Fishs_API_URL}/${mockFishId}`, { method: 'GET' }
            );
        });

        test('should throw specific error for Http Code is 404 when call getFish by fish ID', async () => {
            const mockFishId = 1;

            fetchMock.mockResponseOnce(
                '', { status: 404, statusText: 'HTTP error! status: 404' }
            ); // 模擬 404

            await expect(FishService.getFish(mockFishId)).rejects.toThrow('HTTP error! status: 404');

            expect(fetchMock).toHaveBeenCalledWith(
                `${Fishs_API_URL}/${mockFishId}`, { method: 'GET' });
        });

        test('should throw specific error for Http Code is 500 when call getFish by fish ID', async () => {
            const mockFishId = 1;

            // 模擬 Http code 500的錯誤
            fetchMock.mockResponseOnce(
                '', { status: 500, statusText: 'HTTP error! status: 500' }
            );

            await expect(FishService.getFish(mockFishId)).rejects.toThrow('HTTP error! status: 500');

            expect(fetchMock).toHaveBeenCalledWith(
                `${Fishs_API_URL}/${mockFishId}`, { method: 'GET' });
        });

        test('should throw generic HTTP error for non-404/500 status when call getfish by fish ID', async () => {
            const mockFishId = 1;
            // 模擬 403 Htto code
            fetchMock.mockResponseOnce(
                '', { status: 403, statusText: 'Forbidden' }
            );
            await expect(FishService.getFish(mockFishId)).rejects.toThrow('HTTP error! status: 403');
            expect(fetchMock).toHaveBeenCalledWith(
                `${Fishs_API_URL}/${mockFishId}`, { method: 'GET' }
            );
        });
    });

    describe('create Fish - create a fish data', () => {
        test('should create a  fish successfully', async () => {

            const fish: FishObject = {
                name: 'tazokok',
                type: 'rahet',
                locate: 'Iraraley',
                image: 'https://etycehppghhlxqpdvlga.supabase.co/storage/v1/object/public/tao_among_storage/images/1739210561_tazokok.png'
            }

            //ressult
            const mockFish = {
                "message": "fish created successfully",
                "data": {
                    "name": "tazokok",
                    "type": "rahet",
                    "locate": "Iraraley",
                    "image": "https://etycehppghhlxqpdvlga.supabase.co/storage/v1/object/public/tao_among_storage/images/1739210561_tazokok.png",
                    "updated_at": "2025-03-08T01:41:25.000000Z",
                    "created_at": "2025-03-08T01:41:25.000000Z",
                    "id": 90
                }
            }

            fetchMock.mockResponseOnce(JSON.stringify(mockFish));

            // 模擬 fetch 回傳的 API 資料
            const result = await FishService.createFish(fish);

            // 驗證 fetch 是否被正確呼叫
            expect(fetchMock).toHaveBeenCalledWith(
                Fishs_API_URL, expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // 驗證傳送的 body 與輸入資料一致
                    body: JSON.stringify(fish)
                })
            );

            // 驗證回傳的資料是否與 mockFishs.data 相同
            expect(result).toEqual(mockFish.data);
        });

        test('should create a  fish successfully when type , locate and image are empty', async () => {

            const fish: FishObject = {
                name: 'tazokok',
                type: '',
                locate: '',
                image: ''
            }

            //ressult
            const mockFish = {
                "message": "fish created successfully",
                "data": {
                    "name": "tazokok",
                    "type": "",
                    "locate": "",
                    "image": "",
                    "updated_at": "2025-03-08T01:41:25.000000Z",
                    "created_at": "2025-03-08T01:41:25.000000Z",
                    "id": 90
                }
            }

            fetchMock.mockResponseOnce(JSON.stringify(mockFish));

            // 模擬 fetch 回傳的 API 資料
            const result = await FishService.createFish(fish);

            // 驗證 fetch 是否被正確呼叫
            expect(fetchMock).toHaveBeenCalledWith(
                Fishs_API_URL, expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // 驗證傳送的 body 與輸入資料一致
                    body: JSON.stringify(fish)
                })
            );


            // 驗證回傳的資料是否與 mockFishs.data 相同
            expect(result).toEqual(mockFish.data);
        });

        test('should throw an error when name is missing', async () => {
            const fish: FishObject = {
                type: '',
                locate: '',
                image: ''
            }

            expect(FishService.createFish(fish)).rejects.toThrow('The fish name is required.');
        });

        test('should throw an error when name is empty', async () => {

            const fish: FishObject = {
                name: '',
                type: '',
                locate: '',
                image: ''
            }

            expect(FishService.createFish(fish)).rejects.toThrow('The fish name is required.');

        });

        test('should throw an error when create fish has fetch fails', async () => {
            const fish: FishObject = {
                name: 'tazokok',
                type: 'rahet',
                locate: 'Iraraley',
                image: 'https://etycehppghhlxqpdvlga.supabase.co/storage/v1/object/public/tao_among_storage/images/1739210561_tazokok.png'
            }
            // 模擬網路錯誤
            fetchMock.mockRejectOnce(new Error('Network Error'));

            await expect(FishService.createFish(fish)).rejects.toThrow('Network Error');

        });

    });

    describe('update Fishs - update the fishs', () => {
        test('get update fishs data when trigger onRefresh event', async () => {

            const mockLastUpdateTime = 1742044359;
            const mockFishs = {
                "message": "success",
                "updateTime": 1742044359,
                "data": [
                    {
                        "id": 999,
                        "name": "ibow",
                        "type": "rahet",
                        "locate": "Iraraley",
                        "image": "https://etycehppghhlxqpdvlga.supabase.co/storage/v1/object/public/tao_among_storage/images/1742053444_072B0235-1F8F-4DC0-9C80-55DCACD2E5B2.png",
                        "created_at": "2025-03-14 13:18:54",
                        "updated_at": "2025-03-14 13:18:54"
                    }
                ]
            }

            fetchMock.mockResponseOnce(JSON.stringify(mockFishs));

            // 模擬 fetch 回傳的 API 資料
            const result = await FishService.updateFishs(mockLastUpdateTime);

            // 驗證 fetch 是否被正確呼叫
            expect(fetchMock).toHaveBeenCalledWith(
                Fishs_API_URL + "?since=1742044359", expect.objectContaining({ method: 'GET' }));

            // 驗證回傳的資料是否與 mockFishs 相同
            expect(result).toEqual(mockFishs);

            // 驗證回傳的資料是否與 mockFishs.data 相同
            expect(result.data).toEqual(mockFishs.data);

        })

        test('returns an empty data array when triggering the onRefresh event with no new data to update', async () => {

            const mockLastUpdateTime = 1742044359;
            const mockFishs = {
                "message": "No data available",
                "updateTime": 1742044359,
                "data": []
            }

            fetchMock.mockResponseOnce(JSON.stringify(mockFishs));

            // 模擬 fetch 回傳的 API 資料
            const result = await FishService.updateFishs(mockLastUpdateTime);

            // 驗證 fetch 是否被正確呼叫
            expect(fetchMock).toHaveBeenCalledWith(
                Fishs_API_URL + "?since=1742044359", expect.objectContaining({ method: 'GET' }));

            // 驗證回傳的資料是否與 mockFishs.data 相同
            expect(result.data).toEqual(mockFishs.data);

            // 驗證回傳的資料是否與 mockFishs.message 相同
            expect(result.message).toEqual('No data available');

        })

        test('get error messgae when send invalid data to onRefresh event handler', async () => {

            const mockLastUpdateTimeIsInvalid = "invalidTime";
            const mockFishs = {
                "message": "Invalid since parameter",
                "data": null
            }

            fetchMock.mockResponseOnce(JSON.stringify(mockFishs));

            // 模擬 fetch 回傳的 API 資料
            const result = await FishService.updateFishs(mockLastUpdateTimeIsInvalid);

            // 驗證 fetch 是否被正確呼叫
            expect(fetchMock).toHaveBeenCalledWith(
                Fishs_API_URL + "?since=invalidTime", expect.objectContaining({ method: 'GET' }));

            // 驗證回傳的資料是否與 mockFishs 相同
            expect(result).toEqual(mockFishs);

            // 驗證回傳的資料是否與 mockFishs.data 相同
            expect(result.data).toEqual(mockFishs.data);

        })

    });

});
