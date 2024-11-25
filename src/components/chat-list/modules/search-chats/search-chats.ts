import { Block } from 'core';
import searchChatsHbs from './search-chats.hbs';
import './search-chats.scss';
import { EVENT } from '../../../../core/block/events';
import { debounce } from '../../../../utils/debounce';
import { ChatsControllers } from '../../../../controllers/ChatsControllers';
import { Input } from '../../../input/input';

const searchChats = debounce(ChatsControllers.searchChats, 500);
const input = new Input({ name: 'search', type: 'text', className: 'search-user-input', placeholder: 'Поиск' });
export class SearchChats extends Block {
    constructor() {
        super(searchChatsHbs, {
            input,
            events: {
                [EVENT.Input]: (event: Event) => {
                    const input = event.target as HTMLInputElement;
                    searchChats(input.value).then(() => {
                        requestAnimationFrame(() => {
                            this.element?.querySelector('input')?.focus();
                        });
                    });
                },
            },
        });
    }

    public reset() {
        (this.element as HTMLFormElement).reset();
        searchChats().then();
    }

    protected render() {
        return this.compile();
    }
}
