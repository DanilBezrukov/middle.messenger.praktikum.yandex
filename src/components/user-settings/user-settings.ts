import { Block, IProps } from 'core';
import './user-settings.scss';
import userSettingsView from './user-settings-view.hbs';
import userSettingsEdit from './user-settings-edit.hbs';
import { GoBack } from '../go-back/go-back';
import { EVENT } from '../../core/block/events';
import { getValidForm } from '../../utils/getValidForm';
import { ListItem, TPropsListItem } from '../list-item/list-item';
import { getComponentsList } from '../../utils/getComponentsList';
import { Field } from '../components';
import { IPassword, IProfileData, IUser } from '../../api/types';
import { AvatarEdit } from '../avater-edit/avater-edit';
import { AuthController } from '../../controllers/AuthController';
import { UserController } from '../../controllers/UserController';
import { Indexed } from '../../utils/merge';
import { connect } from '../../core/utils/connect';
import { deepEqual } from '../../utils/deepEqual';

export interface TPropsUserSettings extends IProps {
    type: 'view' | 'editPassword' | 'editData';
    listData?: TPropsListItem[];
    listItems?: Block[];
    button?: Block;
    linkEditData?: Block;
    linkEditPassword?: Block;
    linkExit?: Block;
}

const template = {
    view: userSettingsView,
    edit: userSettingsEdit,
};

type TmplAlias = 'view' | 'edit';

type keyData = 'display_name' | 'email' | 'first_name' | 'login' | 'phone' | 'second_name';

function getExpandListData(listData: TPropsListItem[], userData: IUser | null, tmplAlias: TmplAlias): TPropsListItem[] {
    if (!userData) return listData;
    (listData || []).forEach((item: TPropsListItem) => {
        const key = item.name as keyData;
        const stub = tmplAlias === 'view' ? 'Не назначено' : '';
        item.value = userData[key] ?? stub;
    });
    return listData;
}

class UserSettingsComponent extends Block {
    constructor(props: TPropsUserSettings, tmplAlias: TmplAlias = 'view') {
        let listItems = props.listItems;

        if (!listItems && props.listData) {
            const expandListData = getExpandListData(props.listData, props.user as IUser, tmplAlias);
            if (tmplAlias === 'view') {
                listItems = getComponentsList(ListItem, props.listData);
            } else {
                listItems = getComponentsList(Field, expandListData);
            }
        }

        const labelState = props.type !== 'editData' ? 'disabled' : '';
        super(template[tmplAlias], {
            ...props,
            avatarEdit: new AvatarEdit({ labelState }),
            listItems,
            labelState,
            goBack: new GoBack(),
            events: {
                [EVENT.Submit]: (event: Event) => {
                    event?.preventDefault();
                    const fields = this.lists.listItems;
                    const form = event.target as HTMLFormElement;
                    const values = getValidForm(form, fields);
                    if (!values) return;
                    switch (props.type) {
                        case 'editPassword':
                            UserController.changePassword(values as unknown as IPassword).then();
                            break;
                        case 'editData':
                            UserController.changeData(values as unknown as IProfileData).then();
                            break;
                    }
                },
            },
        });
    }

    protected componentDidMount() {
        this.element?.querySelector('.exit')?.addEventListener('click', () => {
            AuthController.signOut().then();
        });
    }

    protected componentDidUpdate(oldProps: IProps, newProps: TPropsListItem) {
        const listData = this.props.listData as unknown as TPropsListItem[];
        const keys = listData.map(item => item.name);
        const userData = this.props.user as IUser;
        const items = this.lists.listItems as unknown as Block[];

        items.forEach((item: Block, index: number) => {
            const key = keys[index] as keyof IUser;
            item.setProps({ value: userData[key] });
        });
        return !deepEqual(oldProps, newProps);
    }

    protected render() {
        return this.compile();
    }
}

function mapStateToProps(state: Indexed | null): Indexed {
    return { user: { ...(state?.user as IUser) } } as Indexed;
}

const UserSettings = connect<TPropsUserSettings>(mapStateToProps)(UserSettingsComponent);

export { UserSettings };
