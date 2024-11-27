import { Block, IProps } from 'core';
import field from './field.hbs';
import './field.scss';
import { EVENT } from '../../core/block/events';
import { Input } from '../input/input';

export interface TPropsField extends IProps {
    type: string;
    name: string;
    value?: string;
    placeholder?: string;
    errorStatus?: 'active' | 'inactive';
    messagesError?: string;
    validation?: boolean;
}

const messages = {
    first_name: 'Первая буква заглавная, только буквы и дефис.',
    second_name: 'Первая буква заглавная, только буквы и дефис.',
    display_name: 'Первая буква заглавная, только буквы и дефис.',
    login: 'От 3 до 20 символов, буквы, цифры, дефис или подчеркивание.',
    email: 'Введите корректный email (пример: name@domain.com).',
    password: 'От 8 до 40 символов, с заглавной буквой и цифрой.',
    oldPassword: 'От 8 до 40 символов, с заглавной буквой и цифрой.',
    newPassword: 'От 8 до 40 символов, с заглавной буквой и цифрой.',
    phone: 'От 10 до 15 цифр, может начинаться с плюса.',
} as const;

const patterns = {
    first_name: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]{1,49}$/,
    second_name: /^[A-ZА-ЯЁ]$|^[A-ZА-ЯЁ][a-zA-Zа-яё-]{1,49}$/,
    display_name: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]{1,49}$/,
    login: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    oldPassword: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    newPassword: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    phone: /^\+?\d{10,15}$/,
};

type keyConst = keyof typeof patterns;

function getMessage(name: keyof typeof messages): string {
    return messages[name] || 'Обязательное поле';
}

export class Field extends Block {
    private currentValue?: Record<string, string>;

    constructor(props: TPropsField) {
        const { type, name, value, messagesError, validation = true } = props;
        const input = new Input({
            type,
            name,
            value,
            events: {
                [EVENT.Blur]: event => {
                    if (!validation) return;
                    const regex = patterns[props.name as keyConst];
                    const value = (event.currentTarget as HTMLInputElement)?.value;
                    if (!regex || !value) return;
                    const isValid = regex.test(value);
                    this.currentValue = { [props.name]: value };

                    this.setProps({ errorStatus: isValid ? 'inactive' : 'active' });
                },
            },
        });
        super(field, { ...props, input, messagesError: messagesError ?? getMessage(props.name as keyConst) });
    }

    get value() {
        return this.currentValue;
    }

    public getValidation() {
        const input = this.element?.querySelector('input');
        const regex = patterns[this.props.name as keyConst];
        const value = input?.value || '';
        const isValid = regex.test(value);
        this.setProps({ errorStatus: isValid ? 'inactive' : 'active' });
        return isValid;
    }

    protected render() {
        return this.compile();
    }
}
