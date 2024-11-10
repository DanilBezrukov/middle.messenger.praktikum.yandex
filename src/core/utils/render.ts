import { Block } from 'core';

export function render(query: string, block: Block): void {
    document.addEventListener('DOMContentLoaded', () => {
        const root = document.querySelector(query);
        const content = block.getContent();
        if (content) {
            root?.appendChild(content);
        }
    });
}
