import FormData from 'form-data';
import fetchMock from 'jest-fetch-mock';
import Fish from '@/services/fishService';
global.FormData = FormData as any;

const Fishs_API_URL = "https://tao-among.vercel.app/prefix/api/fish";

fetchMock.enableMocks();

describe('API module', () => {

    beforeEach(() => {
        fetchMock.resetMocks(); // 重置 fetch mock 狀態，避免影響其他測試
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
            const result = await Fish.getFishs();

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
            const result = await Fish.getFishs();

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
            const result = await Fish.getFish(mockFishId);

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
            const result = await Fish.getFish(mockFishId);

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

            await expect(Fish.getFish(mockFishId)).rejects.toThrow('Network Error');

            expect(fetchMock).toHaveBeenCalledWith(
                `${Fishs_API_URL}/${mockFishId}`, { method: 'GET' }
            );
        });

        test('should throw specific error for Http Code is 404 when call getFish by fish ID', async () => {
            const mockFishId = 1;

            fetchMock.mockResponseOnce(
                '', { status: 404, statusText: 'HTTP error! status: 404' }
            ); // 模擬 404

            await expect(Fish.getFish(mockFishId)).rejects.toThrow('HTTP error! status: 404');

            expect(fetchMock).toHaveBeenCalledWith(
                `${Fishs_API_URL}/${mockFishId}`, { method: 'GET' });
        });

        test('should throw specific error for Http Code is 500 when call getFish by fish ID', async () => {
            const mockFishId = 1;

            // 模擬 Http code 500的錯誤
            fetchMock.mockResponseOnce(
                '', { status: 500, statusText: 'HTTP error! status: 500' }
            );

            await expect(Fish.getFish(mockFishId)).rejects.toThrow('HTTP error! status: 500');

            expect(fetchMock).toHaveBeenCalledWith(
                `${Fishs_API_URL}/${mockFishId}`, { method: 'GET' });
        });

        test('should throw generic HTTP error for non-404/500 status when call getfish by fish ID', async () => {
            const mockFishId = 1;
            // 模擬 403 Htto code
            fetchMock.mockResponseOnce(
                '', { status: 403, statusText: 'Forbidden' }
            );
            await expect(Fish.getFish(mockFishId)).rejects.toThrow('HTTP error! status: 403');
            expect(fetchMock).toHaveBeenCalledWith(
                `${Fishs_API_URL}/${mockFishId}`, { method: 'GET' }
            );
        });
    });

    describe('create Fish - create a fish data', () => {
        test('should create a  fish successfully', async () => {

            //fish data
            const fish: FormData = new FormData();
            fish.append('name', 'tazokok');
            fish.append('type', 'rahet');
            fish.append('locate', 'Iraraley');
            fish.append('image', 'https://etycehppghhlxqpdvlga.supabase.co/storage/v1/object/public/tao_among_storage/images/1739210561_tazokok.png');

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
            const result = await Fish.createFish(fish);

            // 驗證 fetch 是否被正確呼叫
            expect(fetchMock).toHaveBeenCalledWith(
                Fishs_API_URL, expect.objectContaining({ method: 'POST' })
            );

            // 序列化 FormData 內容
            const bodyString = await new Promise<string>((resolve, reject) => {
                let data = '';
                const body = fetchMock.mock.calls[0][1].body; // 從 fetchMock 獲取 body
                body.on('data', (chunk) => (data += chunk.toString()));
                body.on('end', () => resolve(data));
                body.on('error', (err) => reject(err));
                body.resume(); // 啟動流
            });

            // 驗證輸入內容（忽略 boundary）
            expect(bodyString).toContain('Content-Disposition: form-data; name="name"\r\n\r\ntazokok');
            expect(bodyString).toContain('Content-Disposition: form-data; name="type"\r\n\r\nrahet');
            expect(bodyString).toContain('Content-Disposition: form-data; name="locate"\r\n\r\nIraraley');
            expect(bodyString).toContain('Content-Disposition: form-data; name="image"\r\n\r\nhttps://etycehppghhlxqpdvlga.supabase.co/storage/v1/object/public/tao_among_storage/images/1739210561_tazokok.png');

            // 驗證回傳的資料是否與 mockFishs.data 相同
            expect(result).toEqual(mockFish.data);
        });

        test('should create a  fish successfully when type , locate and image are empty', async () => {

            //fish data
            const fish: FormData = new FormData();
            fish.append('name', 'tazokok');
            fish.append('type', '');
            fish.append('locate', '');
            fish.append('image', '');

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
            const result = await Fish.createFish(fish);

            // 驗證 fetch 是否被正確呼叫
            expect(fetchMock).toHaveBeenCalledWith(
                Fishs_API_URL, expect.objectContaining({ method: 'POST', body: expect.any(FormData) })
            );

            // 序列化 FormData 內容
            const bodyString = await new Promise<string>((resolve, reject) => {
                let data = '';
                const body = fetchMock.mock.calls[0][1].body; // 從 fetchMock 獲取 body
                body.on('data', (chunk) => (data += chunk.toString()));
                body.on('end', () => resolve(data));
                body.on('error', (err) => reject(err));
                body.resume(); // 啟動流
            });

            // 驗證輸入內容（忽略 boundary）
            expect(bodyString).toContain('Content-Disposition: form-data; name="name"\r\n\r\ntazokok');
            expect(bodyString).toContain('Content-Disposition: form-data; name="type"\r\n\r\n');
            expect(bodyString).toContain('Content-Disposition: form-data; name="locate"\r\n\r\n');
            expect(bodyString).toContain('Content-Disposition: form-data; name="image"\r\n\r\n');
            // 驗證回傳的資料是否與 mockFishs.data 相同
            expect(result).toEqual(mockFish.data);
        });
    });

});
