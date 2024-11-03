import { ErrorInfo } from 'components';
import { render } from 'core';

const errorInfo = new ErrorInfo({
    title: '500',
    message: 'Мы уже фиксим',
});

render('#app', errorInfo);
