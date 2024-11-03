import { UserSettings, Link, ListItem } from 'components';
import { render } from 'core';
import { getComponentsList } from '../../utils/getComponentsList';

const publicData = [
    { type: 'text', placeholder: 'Почта', name: 'email', value: 'pochta@yandex.ru' },
    { type: 'text', placeholder: 'Логин', name: 'login', value: 'ivanivanov ' },
    { type: 'text', placeholder: 'Имя', name: 'first_name', value: 'Иван' },
    { type: 'text', placeholder: 'Фамилия', name: 'second_name', value: 'Иванов' },
    { type: 'text', placeholder: 'Имя в чате', name: 'display_name', value: 'Иван' },
    { type: 'tel', placeholder: 'Телефон', name: 'phone', value: '+7 (909) 967 30 30' },
];

const linksData = [
    { href: '/src/pages/user-settings-personal-data/index.html', title: 'Изменить данные', color: '' },
    { href: '/src/pages/user-settings-password/index.html', title: 'Изменить пароль', color: '' },
    { href: '/src/pages/authorization/index.html', title: 'Выйти', color: 'rgb(255, 0, 0);' },
];

const listItems = getComponentsList(ListItem, publicData);
const links = getComponentsList(Link, linksData);

const userSettings = new UserSettings('view', {
    listItems,
    linkEditData: links[0],
    linkEditPassword: links[1],
    linkExit: links[2],
});

render('#app', userSettings);
