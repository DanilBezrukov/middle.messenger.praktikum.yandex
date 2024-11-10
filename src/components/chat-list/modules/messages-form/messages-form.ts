import { Block, IProps } from 'core';
import messagesForm from './messages-form.hbs';
import './messages-form.scss';
import { EVENT } from '../../../../core/block/events';

export class MessagesForm extends Block {
    constructor(props?: IProps) {
        super(messagesForm, {
            ...props,
            events: {
                [EVENT.Submit]: event => {
                    event.preventDefault();
                    const form = event.currentTarget as HTMLFormElement;
                    const formData = new FormData(form);
                    const formObject: Record<string, File | string> = {};
                    formData.forEach((value, key) => {
                        formObject[key] = value;
                    });
                    console.log(formObject);
                    form.reset();
                },
            },
        });
    }

    protected render() {
        return this.compile();
    }
}
