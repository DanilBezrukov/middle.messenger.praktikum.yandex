import { ErrorInfo } from 'components';
import { DefaultPage } from 'core';
import { TPropsErrorInfo } from '../../components/error-info/error-info';

const props: TPropsErrorInfo = {
    title: '404',
    message: 'Не туда попали',
};

export const PageNotFound = new DefaultPage(ErrorInfo, props);
