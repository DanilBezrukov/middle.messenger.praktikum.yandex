export const registrationContext = {
    fields: [
        { type: 'text', placeholder: 'Почта', name: 'email' },
        { type: 'text', placeholder: 'Логин', name: 'login' },
        { type: 'text', placeholder: 'Имя', name: 'first_name' },
        { type: 'text', placeholder: 'Фамилия', name: 'second_name' },
        { type: 'tel', placeholder: 'Телефон', name: 'phone' },
        { type: 'password', placeholder: 'Пароль', name: 'password' },
        { type: 'password', placeholder: 'Пароль (ещё раз)', name: 'password' },
    ],
    btn: { type: 'submit', title: 'Создать аккаунт' },
    link: { href: '/src/pages/authorization/authorization.html', title: 'Войти' },
};
