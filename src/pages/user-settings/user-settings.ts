import { UserSettings, Link } from 'components';
import { DefaultPage } from 'core';
import { getComponentsList } from '../../utils/getComponentsList';
import { TPropsUserSettings } from '../../components/user-settings/user-settings';

const publicData = [
    { type: 'text', placeholder: 'Почта', name: 'email', value: '' },
    { type: 'text', placeholder: 'Логин', name: 'login', value: '' },
    { type: 'text', placeholder: 'Имя', name: 'first_name', value: '' },
    { type: 'text', placeholder: 'Фамилия', name: 'second_name', value: '' },
    { type: 'text', placeholder: 'Имя в чате', name: 'display_name', value: '' },
    { type: 'tel', placeholder: 'Телефон', name: 'phone', value: '' },
];

const linksData = [
    { href: '/settings/personal-data', title: 'Изменить данные', color: '' },
    { href: '/settings/password', title: 'Изменить пароль', color: '' },
    { href: '/settings', title: 'Выйти', color: 'rgb(255, 0, 0);', className: 'exit' },
];

const links = getComponentsList(Link, linksData);

const props: TPropsUserSettings = {
    type: 'view',
    listData: publicData,
    linkEditData: links[0],
    linkEditPassword: links[1],
    linkExit: links[2],
};

export const PageSettings = new DefaultPage(UserSettings, props, ['view']);
