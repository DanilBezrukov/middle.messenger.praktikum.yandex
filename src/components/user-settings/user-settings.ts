import { Block, IProps } from 'core';
import './user-settings.scss';
import userSettingsView from './user-settings-view.hbs';
import userSettingsEdit from './user-settings-edit.hbs';
import { GoBack } from '../go-back/go-back';
import { EVENT } from '../../core/block/events';
import { getValidForm } from '../../utils/getValidForm';

interface TPropsUserSettings extends IProps {
    listItems: Block[];
    button?: Block;
    linkEditData?: Block;
    linkEditPassword?: Block;
    linkExit?: Block;
}

const template = {
    view: userSettingsView,
    edit: userSettingsEdit,
};

const goBack = new GoBack({
    href: '/',
});

type TmplAlias = 'view' | 'edit';
export class UserSettings extends Block {
    constructor(tmplAlias: TmplAlias = 'view', props?: TPropsUserSettings) {
        super(template[tmplAlias], {
            ...props,
            goBack,
            events: {
                [EVENT.Submit]: (event: Event) => {
                    event?.preventDefault();
                    const fields = this.lists.listItems;
                    const form = event.target as HTMLFormElement;
                    console.log(form);
                    const values = getValidForm(form, fields);
                    if (values) {
                        console.log(values);
                    }
                    // const values = {};
                    //
                    // if (!Array.isArray(fields)) return;
                    //
                    // const isValid = fields.reduce((acc: boolean, field: Field) => {
                    //     Object.assign(values, field.value);
                    //     return !field.getValidation() ? false : acc;
                    // }, true);
                    //
                    // if (isValid) {
                    //     console.log(values);
                    // }
                },
            },
        });
    }

    protected render() {
        return this.compile();
    }
}
