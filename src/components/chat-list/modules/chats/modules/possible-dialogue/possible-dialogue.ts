import { Block, IProps } from 'core';
import possibleDialogue from './possible-dialogue.hbs';
import './possible-dialogue.scss';
import { IUser } from '../../../../../../api/types';
import { EVENT } from '../../../../../../core/block/events';
import { ChatsControllers } from '../../../../../../controllers/ChatsControllers';

interface TPropsPossibleDialogue extends IProps {
    foundUsers: IUser[];
}

export class PossibleDialogue extends Block {
    constructor(props?: TPropsPossibleDialogue) {
        super(possibleDialogue, {
            ...props,
            events: {
                [EVENT.Click]: (event: Event): void => {
                    const target = event.target as HTMLElement;
                    const user = target.closest<HTMLElement>('.possible-dialogue');
                    const id = user?.dataset?.id || null;
                    if (!id) return;
                    ChatsControllers.addChat(+id).then();
                },
            },
        });
    }

    setData(nextProps?: TPropsPossibleDialogue) {
        if (!nextProps?.foundUsers?.length) {
            this.hide();
            return;
        }
        this.setProps(nextProps);
        this.show();
    }

    protected render() {
        return this.compile();
    }
}
