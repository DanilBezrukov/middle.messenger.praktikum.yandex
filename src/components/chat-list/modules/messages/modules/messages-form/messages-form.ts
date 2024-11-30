import { Block, IProps } from 'core';
import messagesForm from './messages-form.hbs';
import './messages-form.scss';
import { EVENT } from '../../../../../../core/block/events';
import { SocketController } from '../../../../../../controllers/SocketController';

const socket = new SocketController();

export class MessagesForm extends Block {
    constructor(props?: IProps) {
        super(messagesForm, {
            ...props,
            events: {
                [EVENT.Submit]: event => {
                    event.preventDefault();
                    const form = event.currentTarget as HTMLFormElement;
                    const formData = new FormData(form);
                    const message = formData.get('message') || '';
                    socket.send(message.toString());
                    form.reset();
                },
            },
        });
    }

    protected render() {
        return this.compile();
    }
}
