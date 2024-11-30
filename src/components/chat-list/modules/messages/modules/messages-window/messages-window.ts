import { Block, IProps } from 'core';
import messagesWindowHbs from './messages-window.hbs';
import './messages-window.scss';
import { IMessage } from '../../../../../../api/types';
import { State } from '../../../../../../core/store/Store';
import { Indexed } from '../../../../../../utils/merge';
import { connect } from '../../../../../../core/utils/connect';

interface TPropsMessagesWindow extends IProps {
    messages?: IMessage[];
}

class MessagesWindowComponent extends Block {
    constructor(props?: TPropsMessagesWindow) {
        super(messagesWindowHbs, props);
    }

    protected render() {
        return this.compile();
    }
}

function mapStateToProps(state: State | null): Indexed {
    const messages = state?.messages || [];
    return { messages: [...messages] };
}

const MessagesWindow = connect<IProps>(mapStateToProps)(MessagesWindowComponent);

export { MessagesWindow };
