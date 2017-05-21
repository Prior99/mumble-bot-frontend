import { observable, computed, action } from "mobx";
import { listUsers, listFreeUsers } from "../api";
import { User } from "../types";
import { login } from "./login";

export interface MumbleUser {
    name: string;
    id: number;
}

export class UsersState {
    @observable public users: User[] = [];
    @observable public loading: Date;
    @observable public freeMumbleUsers: MumbleUser[] = [];

    @action
    public load = async (): Promise<void> => {
        this.loading = new Date();
        const users = await listUsers();
        const freeMumbleUsers = await listFreeUsers();
        this.loading = undefined;
        this.users = users;
        this.freeMumbleUsers = freeMumbleUsers;
    }

    public getUser(id: number): User {
        return this.users.find(user => user.id === id);
    }

    @computed
    public get ownUser(): User {
        return this.users.find(user => user.username.toLowerCase() === login.username.toLowerCase());
    }
}

export const users = new UsersState();
