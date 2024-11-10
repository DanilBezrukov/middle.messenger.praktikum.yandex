import { Block, IProps } from 'core';
import errorInfo from './error-info.hbs';
import { Link } from 'components';
import './error-info.scss';
interface TPropsErrorInfo extends IProps {
    title?: string;
    message?: string;
}

const link = new Link({
    title: 'Назад к чатам',
    href: '/src/pages/chat-list/index.html',
});

export class ErrorInfo extends Block {
    constructor(props?: TPropsErrorInfo) {
        super(errorInfo, { ...props, link });
    }

    protected render() {
        return this.compile();
    }
}
