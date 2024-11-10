import { TPropsField } from '../field/field';

type TFieldType = 'text' | 'password' | 'email' | 'number' | 'tel';
type TFieldName = 'email' | 'login' | 'first_name' | 'second_name' | 'phone' | 'password';
export interface IFieldSettings extends TPropsField {
    type: TFieldType;
    placeholder: string;
    name: TFieldName;
}
