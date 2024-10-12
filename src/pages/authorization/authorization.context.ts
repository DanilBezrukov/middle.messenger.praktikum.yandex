export const authorizationContext = {
    fields: [
        { type: 'text', placeholder: 'Логин', name: 'login' },
        { type: 'password', placeholder: 'Пароль', name: 'password' },
    ],
    btn: { type: 'submit', title: 'Вход' },
    link: { href: '/src/pages/registration/registration.html', title: 'Ещё не зарегистрированы?' },
};
