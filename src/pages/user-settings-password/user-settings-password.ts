import { UserSettings, Button, Field } from 'components';
import { DefaultPage } from 'core';
import { getComponentsList } from '../../utils/getComponentsList';
import { TPropsUserSettings } from '../../components/user-settings/user-settings';

const privateData = [
    { type: 'password', placeholder: 'Старый пароль', name: 'oldPassword', value: '' },
    { type: 'password', placeholder: 'Новый пароль', name: 'newPassword', value: '' },
];

const listItems = getComponentsList(Field, privateData);

const button = new Button({
    type: 'submit',
    title: 'Сохранить',
});

const props: TPropsUserSettings = { type: 'editPassword', listItems, button };

export const PageSettingsPassword = new DefaultPage(UserSettings, props, ['edit']);
