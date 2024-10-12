export const userSettingContext = {
    publicData: [
        { type: 'text', placeholder: 'Почта', name: 'email', value: 'pochta@yandex.ru' },
        { type: 'text', placeholder: 'Логин', name: 'login', value: 'ivanivanov ' },
        { type: 'text', placeholder: 'Имя', name: 'first_name', value: 'Иван' },
        { type: 'text', placeholder: 'Фамилия', name: 'second_name', value: 'Иванов' },
        { type: 'text', placeholder: 'Имя в чате', name: 'display_name', value: 'Иван' },
        { type: 'tel', placeholder: 'Телефон', name: 'phone', value: '+7 (909) 967 30 30' },
    ],
    privateData: [
        { type: 'password', placeholder: 'Старый пароль', name: 'oldPassword', value: '' },
        { type: 'password', placeholder: 'Новый пароль', name: 'newPassword', value: '' },
        { type: 'password', placeholder: 'Повторите новый пароль', name: 'newPassword', value: '' },
    ],
    links: [
        { href: '/src/pages/user-settings/change-personal-data-page.html', title: 'Изменить данные', color: '' },
        { href: '/src/pages/user-settings/change-password-page.html', title: 'Изменить пароль', color: '' },
        { href: '/', title: 'Выйти', color: 'rgb(255, 0, 0);' },
    ],
};
