import { ErrorInfo } from 'components';
import { DefaultPage } from '../../core/default-page/default-page';
import { TPropsErrorInfo } from '../../components/error-info/error-info';

const props: TPropsErrorInfo = {
    title: '500',
    message: 'Мы уже фиксим',
};

export const PageServerError = new DefaultPage(ErrorInfo, props);
