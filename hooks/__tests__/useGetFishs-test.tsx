import { render, screen, act, waitFor } from '@testing-library/react';
import useGetFishs from '../useGetFishs';

jest.mock('@/services/locatStroageService', () => ({
    storeData: jest.fn(),
    getData: jest.fn().mockResolvedValue(null),
    clearData: jest.fn(),
}));


describe('useGetFishs', () => {
    describe('focus in API', () => {
        const TestComponentForAPI = () => {
            const { fishs, isLoading, error, fetchFishs } = useGetFishs();
            return (
                <div>
                    <span data-testid="loading">{isLoading.toString()}</span>
                    <span data-testid="fishs">{fishs.length}</span>
                    <span data-testid="error">{error || 'no error'}</span>
                    <button onClick={fetchFishs}>Fetch</button>
                </div>
            );
        };

        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('should update state when fetching succeeds', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ message: "success", data: [{ id: 1, name: 'cilat' }] }),
            });

            render(<TestComponentForAPI />);
            expect(screen.getByTestId('loading').textContent).toBe('true');
            expect(screen.getByTestId('fishs').textContent).toBe('0');

            //fetch 正在執行
            expect(screen.getByTestId('loading').textContent).toBe('true');
            expect(screen.getByTestId('fishs').textContent).toBe('0');

            await waitFor(async () => {
                //fetch 完成後
                expect(screen.getByTestId('loading').textContent).toBe('false');
                expect(screen.getByTestId('fishs').textContent).toBe('1');

            });


        });

        // test('should keep fishs empty when fetching fails with 404', async () => {
        //     global.fetch = jest.fn().mockResolvedValue({
        //         ok: false,
        //         status: 404,
        //         statusText: 'Not Found',
        //     });

        //     render(<TestComponentForAPI />);
        //     await act(async () => {
        //         await screen.getByText('Fetch').click();
        //     });

        //     expect(screen.getByTestId('loading').textContent).toBe('false');
        //     expect(screen.getByTestId('fishs').textContent).toBe('0');
        //     expect(screen.getByTestId('error').textContent).toBe('找不到資料');

        // });

        //         // test('should reset error on second fetch', async () => {
        //         //     // 第一次模擬 404
        //         //     global.fetch = jest.fn().mockResolvedValueOnce({
        //         //         ok: false,
        //         //         status: 404,
        //         //         statusText: 'Not Found',
        //         //     });

        //         //     render(<TestComponentForAPI />);
        //         //     await act(async () => {
        //         //         await screen.getByText('Fetch').click(); // 第一次點擊
        //         //     });

        //         //     expect(screen.getByTestId('error').textContent).toBe('找不到資料');

        //         //     // 第二次模擬成功
        //         //     global.fetch = jest.fn().mockResolvedValueOnce({
        //         //         ok: true,
        //         //         json: async () => ({ message: "success", data: [{ id: 1, name: 'cilat' }] }),
        //         //     });

        //         //     await act(async () => {
        //         //         await screen.getByText('Fetch').click(); // 第二次點擊
        //         //     });

        //         //     // 如果沒重置，這會失敗，因為 error 還是 "找不到資料"
        //         //     expect(screen.getByTestId('error').textContent).toBe('no error');
        //         //     expect(screen.getByTestId('fishs').textContent).toBe('1');
        //         // });

        //         // test('should keep fishs empty when fetching fails with 500', async () => {
        //         //     global.fetch = jest.fn().mockResolvedValue({
        //         //         ok: false,
        //         //         status: 500,
        //         //         statusText: 'Internal Server Error',
        //         //     });

        //         //     render(<TestComponentForAPI />);
        //         //     await act(async () => {
        //         //         await screen.getByText('Fetch').click();
        //         //     });

        //         //     expect(screen.getByTestId('loading').textContent).toBe('false');
        //         //     expect(screen.getByTestId('fishs').textContent).toBe('0');
        //         //     expect(screen.getByTestId('error').textContent).toBe('抱歉，系統出了點問題，請稍後再試');

        //         // });

        //         // test('should keep fishs empty when fetch failure', async () => {
        //         //     global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));

        //         //     render(<TestComponentForAPI />);
        //         //     await act(async () => {
        //         //         await screen.getByText('Fetch').click();
        //         //     });

        //         //     expect(screen.getByTestId('loading').textContent).toBe('false');
        //         //     expect(screen.getByTestId('fishs').textContent).toBe('0');
        //         //     expect(screen.getByTestId('error').textContent).toBe('網路錯誤，請檢查網路連線後再試');

        //         // });

        //         // test('should keep data on second fetch fail', async () => {
        //         //     // 第一次模擬成功
        //         //     global.fetch = jest.fn().mockResolvedValueOnce({
        //         //         ok: true,
        //         //         json: async () => ({ message: "success", data: [{ id: 1, name: 'cilat' }] }),
        //         //     });

        //         //     render(<TestComponentForAPI />);
        //         //     await act(async () => {
        //         //         await screen.getByText('Fetch').click(); // 第一次點擊
        //         //     });

        //         //     expect(screen.getByTestId('error').textContent).toBe('no error');
        //         //     expect(screen.getByTestId('loading').textContent).toBe('false');
        //         //     expect(screen.getByTestId('fishs').textContent).toBe('1');

        //         //     // 第二次模擬404
        //         //     global.fetch = jest.fn().mockResolvedValueOnce({
        //         //         ok: false,
        //         //         status: 404,
        //         //         statusText: "Not Found"
        //         //     });

        //         //     await act(async () => {
        //         //         await screen.getByText('Fetch').click(); // 第二次點擊
        //         //     });

        //         //     expect(screen.getByTestId('error').textContent).toBe('找不到資料');
        //         //     expect(screen.getByTestId('loading').textContent).toBe('false');
        //         //     expect(screen.getByTestId('fishs').textContent).toBe('1');
        //         // });

        //         // test('should keep fishs empty when get 404 and 500 Http Code', async () => {
        //         //     // 第一次模擬500
        //         //     global.fetch = jest.fn().mockResolvedValueOnce({
        //         //         ok: false,
        //         //         status: 500,
        //         //         statusText: "Internal Server Error"
        //         //     });

        //         //     render(<TestComponentForAPI />);
        //         //     await act(async () => {
        //         //         await screen.getByText('Fetch').click(); // 第一次點擊
        //         //     });

        //         //     expect(screen.getByTestId('error').textContent).toBe('抱歉，系統出了點問題，請稍後再試');
        //         //     expect(screen.getByTestId('loading').textContent).toBe('false');
        //         //     expect(screen.getByTestId('fishs').textContent).toBe('0');

        //         //     // 第二次模擬404
        //         //     global.fetch = jest.fn().mockResolvedValueOnce({
        //         //         ok: false,
        //         //         status: 404,
        //         //         statusText: "Not Found"
        //         //     });

        //         //     await act(async () => {
        //         //         await screen.getByText('Fetch').click(); // 第二次點擊
        //         //     });

        //         //     expect(screen.getByTestId('error').textContent).toBe('找不到資料');
        //         //     expect(screen.getByTestId('loading').textContent).toBe('false');
        //         //     expect(screen.getByTestId('fishs').textContent).toBe('0');
        //         // });

        //         // test('should update fishs with new data on second successful fetch', async () => {
        //         //     // 第一次成功
        //         //     global.fetch = jest.fn().mockResolvedValueOnce({
        //         //         ok: true,
        //         //         json: async () => ({ message: "success", data: [{ id: 1, name: 'cilat' }] }),
        //         //     });

        //         //     render(<TestComponentForAPI />);
        //         //     await act(async () => {
        //         //         await screen.getByText('Fetch').click(); // 第一次點擊
        //         //     });

        //         //     expect(screen.getByTestId('error').textContent).toBe('no error');
        //         //     expect(screen.getByTestId('loading').textContent).toBe('false');
        //         //     expect(screen.getByTestId('fishs').textContent).toBe('1');

        //         //     // 第二次成功
        //         //     global.fetch = jest.fn().mockResolvedValueOnce({
        //         //         ok: true,
        //         //         json: async () => ({ message: "success", data: [{ id: 1, name: 'cilat' }, { id: 2, name: 'Ivey' }] }),
        //         //     });

        //         //     await act(async () => {
        //         //         await screen.getByText('Fetch').click(); // 第二次點擊
        //         //     });

        //         //     expect(screen.getByTestId('error').textContent).toBe('no error');
        //         //     expect(screen.getByTestId('loading').textContent).toBe('false');
        //         //     expect(screen.getByTestId('fishs').textContent).toBe('2');
        //         // });
    });


});