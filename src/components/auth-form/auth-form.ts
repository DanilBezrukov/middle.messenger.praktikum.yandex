import { Block, IProps, Router } from 'core';
import authForm from './auth-form.hbs';
import './auth-form.scss';
import { Button, Field, Link } from '../components';
import { getComponentsList } from '../../utils/getComponentsList';
import { TPropsField } from '../field/field';
import { EVENT } from '../../core/block/events';
import { getValidForm } from '../../utils/getValidForm';
import { connect } from '../../core/utils/connect';
import { Indexed } from '../../utils/merge';
import { AuthController } from '../../controllers/AuthController';
import { ISignUpBody } from '../../api/types';

export interface TPropsAuthForm extends IProps {
    type?: string;
    title?: string;
    buttonTitle?: string;
    linkTitle?: string;
    linkHref?: string;
}

const router = new Router();

class AuthFormComponent extends Block {
    constructor(props: TPropsAuthForm, fieldSettings: TPropsField[]) {
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

                    if (props.type === 'signUp') {
                        AuthController.signUp(values as unknown as ISignUpBody).then();
                    } else {
                        AuthController.signIn(values as unknown as ISignUpBody).then();
                    }
                },
            },
        });
    }

    componentDidUpdate(oldProps: IProps, newProps: IProps) {
        if (newProps.user) {
            router.go('/messenger');
        }
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render() {
        return this.compile();
    }
}

function mapStateToProps(state: Indexed | null): Indexed {
    return { user: state?.user } as Indexed;
}

const AuthForm = connect<TPropsAuthForm>(mapStateToProps)(AuthFormComponent);

export { AuthForm };
