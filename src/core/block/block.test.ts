import { Block } from './block';
import { render } from '../utils/render';
import hbs from './block.test.hbs';

describe('Рендер компонента', () => {
    let instanceBlock: Block;
    beforeAll(() => {
        const body = document.querySelector('body');
        if (body) {
            body.innerHTML = "<div id='root'></div>";
        }

        class Component extends Block {
            constructor(props = { text: 'Initial Text' }) {
                super(hbs, props);
            }
        }

        instanceBlock = new Component();
    });

    it('Рендер компонента в DOM ', () => {
        render('#root', instanceBlock);
        const comp = document.querySelector('#test-block');
        expect(comp).not.toBeNull();
    });

    it('Ререндер после изменения props ', () => {
        instanceBlock.setProps({ text: 'setProps' });
        const comp = document.querySelector('#test-block');
        expect(comp?.textContent).toBe('setProps');
    });
});
