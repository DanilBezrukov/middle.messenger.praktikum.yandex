export interface ISignInBody {
    login: string;
    password: string;
}

export interface ISignUpBody extends ISignInBody {
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
}

export interface IProfileData {
    first_name: string;
    second_name: string;
    display_name: null | string;
    login: string;
    email: string;
    phone: string;
}

export interface IUser extends IProfileData {
    id: number;
    avatar: null | string;
}

export interface IPassword {
    oldPassword: string;
    newPassword: string;
}

export interface IUserForChat {
    first_name: string;
    second_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
}

export interface ILastMessage {
    user: IUserForChat;
    time: string;
    content: string;
}

export interface IChat {
    id: number;
    title: string;
    avatar: string;
    created_by: number;
}

export interface IChatList extends IChat {
    unread_count: number;
    last_message: ILastMessage | null;
}

export interface ICurrentChat extends IChatList {
    token: string;
    users: IUser[];
}

export interface IOptionsForGettingChat {
    offset?: number;
    limit?: number;
    title?: string;
}

export interface IOptionsForGettingChatUsers {
    offset?: number;
    limit?: number;
    name?: string;
    email?: string;
}

export interface IRemoteChat {
    userId: number;
    result: IChat;
}

export interface IMessage {
    role: string;
    message: string;
}
