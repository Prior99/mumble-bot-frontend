import { observable, computed, action } from "mobx";
import { listUsers } from "../api";
import { User } from "../types";

export class UsersState {
    @observable public users: User[] = [];
    @observable public loading: Date;

    @action
    public load = async (): Promise<void> => {
        this.loading = new Date();
        const users = await listUsers();
        this.loading = undefined;
        this.users = users;
    }

    public getUser(id: number): User {
        return this.users.find(user => user.id === id);
    }
}

export const users = new UsersState();
