import { UserSettings, Button, Field } from 'components';
import { render } from 'core';
import { getComponentsList } from '../../utils/getComponentsList';

const privateData = [
    { type: 'password', placeholder: 'Старый пароль', name: 'oldPassword', value: '' },
    { type: 'password', placeholder: 'Новый пароль', name: 'password', value: '' },
    { type: 'password', placeholder: 'Повторите новый пароль', name: 'newPassword', value: '' },
];

const listItems = getComponentsList(Field, privateData);

const button = new Button({
    type: 'submit',
    title: 'Сохранить',
});

const userSettings = new UserSettings('edit', { listItems, button });

render('#app', userSettings);
