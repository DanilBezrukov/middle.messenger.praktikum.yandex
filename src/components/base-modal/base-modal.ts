import { Block } from '../../core/block/block';
import baseModalHbs from './base-modal.hbs';
import './base-modal.scss';
import { Button, Field } from 'components';
import { IProps } from '../../core/block/types';

export interface TPropsModalCreateChat extends IProps {
    idChat?: number;
    avatar?: string;
    placeholderField?: string;
    title?: string;
}

export class BaseModal extends Block<TPropsModalCreateChat> {
    constructor(props?: TPropsModalCreateChat) {
        super(baseModalHbs, {
            ...props,
            btnCreate: new Button({
                type: 'submit',
                title: 'Сохранить',
            }),
            btnClose: new Button({
                type: 'button',
                title: 'Закрыть',
                className: 'default-btn close',
            }),
            field: new Field({
                type: 'text',
                name: 'field-modal',
                placeholder: props?.placeholderField,
                validation: false,
            }),
        });
    }

    public open() {
        const modal = this.element as HTMLDialogElement;
        if (!modal) return;
        modal.showModal();
        const closeBtn = this.element?.querySelector<HTMLButtonElement>(`.close`);
        closeBtn?.addEventListener(
            'click',
            () => {
                this.close();
            },
            { once: true },
        );
    }

    public close() {
        const modal = this.element as HTMLDialogElement;
        modal?.close();
    }
}
