import { Router } from './Router';

describe('Тест роутера', () => {
    it('Проверка инстанса роутера', () => {
        const router1 = new Router();
        const router2 = new Router();
        expect(router1 === router2).toBe(true);
    });
});
