import { getComponentsList } from '../../utils/getComponentsList';
import { UserSettings, Button, Field } from 'components';
import { render } from 'core';

const publicData = [
    { type: 'text', placeholder: 'Почта', name: 'email', value: 'pochta@yandex.ru' },
    { type: 'text', placeholder: 'Логин', name: 'login', value: 'ivanivanov ' },
    { type: 'text', placeholder: 'Имя', name: 'first_name', value: 'Иван' },
    { type: 'text', placeholder: 'Фамилия', name: 'second_name', value: 'Иванов' },
    { type: 'text', placeholder: 'Имя в чате', name: 'display_name', value: 'Иван' },
    { type: 'tel', placeholder: 'Телефон', name: 'phone', value: '+7 (909) 967 30 30' },
];

const listItems = getComponentsList(Field, publicData);

const button = new Button({
    type: 'submit',
    title: 'Сохранить',
});

const userSettings = new UserSettings('edit', { listItems, button });

render('#app', userSettings);
