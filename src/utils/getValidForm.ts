import { TChildren } from '../core/block/types';
import { Field } from 'components';

function checkFields(fields: TChildren<unknown>) {
    if (!Array.isArray(fields)) return false;
    return fields?.reduce((acc: boolean, field: Field) => {
        return !field.getValidation() ? false : acc;
    }, true);
}

export function getValidForm(form: HTMLFormElement, fields: TChildren<unknown>): Record<string, File | string> | null {
    const isValid = checkFields(fields);
    if (!isValid) return null;

    const formData = new FormData(form);
    const formObject: Record<string, File | string> = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    // form.reset();
    return formObject;
}
