import { IFieldSettings } from '../../components/auth-form/type';
import { AuthForm } from 'components';
import { DefaultPage } from 'core';
import { TPropsAuthForm } from '../../components/auth-form/auth-form';

const fieldsSettings: IFieldSettings[] = [
    { type: 'text', placeholder: 'Почта', name: 'email' },
    { type: 'text', placeholder: 'Логин', name: 'login' },
    { type: 'text', placeholder: 'Имя', name: 'first_name' },
    { type: 'text', placeholder: 'Фамилия', name: 'second_name' },
    { type: 'tel', placeholder: 'Телефон', name: 'phone' },
    { type: 'password', placeholder: 'Пароль', name: 'password' },
    { type: 'password', placeholder: 'Пароль (ещё раз)', name: 'password' },
];

const props: TPropsAuthForm = {
    type: 'signUp',
    title: 'Регистрация',
    buttonTitle: 'Создать аккаунт',
    linkTitle: 'Войти',
    linkHref: '/',
};

export const PageRegistration = new DefaultPage(AuthForm, props, [fieldsSettings]);
