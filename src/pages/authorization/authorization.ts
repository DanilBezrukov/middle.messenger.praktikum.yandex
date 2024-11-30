import { AuthForm } from 'components';
import { IFieldSettings } from '../../components/auth-form/type';
import { DefaultPage } from 'core';
import { TPropsAuthForm } from '../../components/auth-form/auth-form';

const fieldsSettings: IFieldSettings[] = [
    { type: 'text', placeholder: 'Логин', name: 'login' },
    { type: 'password', placeholder: 'Пароль', name: 'password' },
];

const props: TPropsAuthForm = {
    type: 'signIn',
    title: 'Вход',
    buttonTitle: 'Вход',
    linkTitle: 'Ещё не зарегистрированы?',
    linkHref: '/sign-up',
};

export const PageAuthorization = new DefaultPage(AuthForm, props, [fieldsSettings]);
