import { Block, IProps, Store } from 'core';
import avatarEdit from './avater-edit.hbs';
import './avater-edit.scss';
import { EVENT } from '../../core/block/events';
import { IUser } from '../../api/types';
import { UserController } from '../../controllers/UserController';
import { Indexed } from '../../utils/merge';
import { connect } from '../../core/utils/connect';

interface TPropsAvatarEdit extends IProps {
    labelState?: string;
}

const store = new Store();
class AvatarEditComponent extends Block {
    constructor(props?: TPropsAvatarEdit) {
        const user = store.getState('user');
        let url;
        let objectFit = '';
        if (user?.avatar) {
            url = 'https://ya-praktikum.tech/api/v2/resources' + user.avatar;
            objectFit = 'cover';
        } else {
            url = '/static/empty-photo.svg';
        }
        super(avatarEdit, {
            ...props,
            url,
            objectFit,
            events: {
                [EVENT.Change]: (event: Event) => {
                    const files = (event.target as HTMLInputElement)?.files;
                    const itemFile = files?.item(0) ?? false;
                    if (!itemFile) return;
                    const formData = new FormData();
                    formData.append('avatar', itemFile);
                    UserController.changeAvatar(formData).then();
                },
            },
        });
    }

    protected render() {
        return this.compile();
    }
}

function mapStateToProps(state: Indexed | null): Indexed {
    return { url: 'https://ya-praktikum.tech/api/v2/resources' + (state?.user as IUser)?.avatar } as Indexed;
}

const AvatarEdit = connect<TPropsAvatarEdit>(mapStateToProps)(AvatarEditComponent);

export { AvatarEdit };
