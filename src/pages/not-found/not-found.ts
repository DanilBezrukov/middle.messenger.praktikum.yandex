import { ErrorInfo } from 'components';
import { render } from 'core';

const errorInfo = new ErrorInfo({
    title: '404',
    message: 'Не туда попали',
});

render('#app', errorInfo);
