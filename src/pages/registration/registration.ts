import { IFieldSettings } from '../../components/auth-form/type';
import { AuthForm } from 'components';
import { render } from 'core';

const fieldsSettings: IFieldSettings[] = [
    { type: 'text', placeholder: 'Почта', name: 'email' },
    { type: 'text', placeholder: 'Логин', name: 'login' },
    { type: 'text', placeholder: 'Имя', name: 'first_name' },
    { type: 'text', placeholder: 'Фамилия', name: 'second_name' },
    { type: 'tel', placeholder: 'Телефон', name: 'phone' },
    { type: 'password', placeholder: 'Пароль', name: 'password' },
    { type: 'password', placeholder: 'Пароль (ещё раз)', name: 'password' },
];

const authForm = new AuthForm(fieldsSettings, {
    title: 'Регистрация',
    buttonTitle: 'Создать аккаунт',
    linkTitle: 'Войти',
    linkHref: '/src/pages/authorization/index.html',
});

render('#app', authForm);
