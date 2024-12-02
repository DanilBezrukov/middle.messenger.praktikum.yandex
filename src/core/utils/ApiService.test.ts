import { ApiService } from './ApiService';

class MockXMLHttpRequest {
    status: number = 200;
    response: string = '';
    onload: (() => never) | null = null;

    open = jest.fn();
    setRequestHeader = jest.fn();
    send = jest.fn(() => {
        this.status = 200;
        this.response = 'OK';
        setTimeout(() => {
            if (this?.onload) this.onload?.();
        }, 100);
    });
}
globalThis.XMLHttpRequest = MockXMLHttpRequest as unknown as typeof XMLHttpRequest;
describe('Тест обращения к ручкам', () => {
    let apiService: ApiService;

    beforeAll(() => {
        apiService = new ApiService('/');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Отправка GET запроса', async () => {
        const res = await apiService.get('/');

        expect(res.status).toBe(200);
        expect(res.response).toBe('OK');
    });

    it('Отправка POST запроса', async () => {
        const res = await apiService.post('/', {
            data: 'test string',
        });

        expect(res.status).toBe(200);
        expect(res.response).toBe('OK');
    });
});
