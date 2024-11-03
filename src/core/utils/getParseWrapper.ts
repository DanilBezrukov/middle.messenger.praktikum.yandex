import { IParseWrapper, TAttributes } from './types';

export function getParseWrapper(htmlString: string): IParseWrapper {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const wrapper = (doc.body.firstElementChild || document.createElement('div')) as HTMLElement;

        const tagName = wrapper.tagName.toLowerCase();
        const attributes: TAttributes = {};

        for (const attr of Array.from(wrapper.attributes)) {
            attributes[attr.name] = attr.value;
        }

        const body = Array.from(wrapper.childNodes)
            .map(node => (node instanceof Element ? node.outerHTML : node.textContent || ''))
            .join('')
            .trim();

        return { tagName, attributes, body };
    } catch (e) {
        console.error(e);
        return { tagName: 'div', attributes: {}, body: '' };
    }
}
