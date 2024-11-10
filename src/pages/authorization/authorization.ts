import { render } from 'core';
import { AuthForm } from 'components';
import { IFieldSettings } from '../../components/auth-form/type';

const fieldsSettings: IFieldSettings[] = [
    { type: 'text', placeholder: 'Логин', name: 'login' },
    { type: 'password', placeholder: 'Пароль', name: 'password' },
];

const authForm = new AuthForm(fieldsSettings, {
    title: 'Вход',
    buttonTitle: 'Вход',
    linkTitle: 'Ещё не зарегистрированы?',
    linkHref: '/src/pages/registration/index.html',
});

render('#app', authForm);
