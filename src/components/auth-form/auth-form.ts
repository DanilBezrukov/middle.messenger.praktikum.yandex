import { Block, IProps } from 'core';
import authForm from './auth-form.hbs';
import './auth-form.scss';
import { Button, Field, Link } from '../components';
import { getComponentsList } from '../../utils/getComponentsList';
import { TPropsField } from '../field/field';
import { EVENT } from '../../core/block/events';
import { getValidForm } from '../../utils/getValidForm';

interface TPropsAuthForm extends IProps {
    title: string;
    buttonTitle: string;
    linkTitle: string;
    linkHref: string;
}

export class AuthForm extends Block {
    constructor(fieldSettings: TPropsField[], props: TPropsAuthForm) {
        const fields = getComponentsList(Field, fieldSettings);
        const button = new Button({
            title: props.buttonTitle,
            type: 'submit',
        });
        const link = new Link({
            title: props.linkTitle,
            href: props.linkHref,
        });

        super(authForm, {
            ...props,
            fields,
            button,
            link,
            events: {
                [EVENT.Submit]: (event: Event) => {
                    event?.preventDefault();
                    const fields = this.lists.fields;
                    const form = event.target as HTMLFormElement;
                    const values = getValidForm(form, fields);
                    if (values) {
                        console.log(values);
                    }
                },
            },
        });
    }

    protected render() {
        return this.compile();
    }
}
