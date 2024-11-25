import { UserSettings, Button } from 'components';
import { DefaultPage } from 'core';
import { TPropsUserSettings } from '../../components/user-settings/user-settings';

const publicData = [
    { type: 'text', placeholder: 'Почта', name: 'email', value: '' },
    { type: 'text', placeholder: 'Логин', name: 'login', value: '' },
    { type: 'text', placeholder: 'Имя', name: 'first_name', value: '' },
    { type: 'text', placeholder: 'Фамилия', name: 'second_name', value: '' },
    { type: 'text', placeholder: 'Имя в чате', name: 'display_name', value: '' },
    { type: 'tel', placeholder: 'Телефон', name: 'phone', value: '' },
];

const button = new Button({
    type: 'submit',
    title: 'Сохранить',
});

const props: TPropsUserSettings = { type: 'editData', button, listData: publicData };
export const PageSettingsPersonalData = new DefaultPage(UserSettings, props, ['edit']);
