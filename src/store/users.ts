import { observable, computed, action } from "mobx";
import { listUsers } from "../api";
import { Recording } from "../types/recordings";
import { User } from "../types";

export class UsersState {
    @observable public users: User[] = [];
    @observable public loading: boolean = false;

    @action
    public load = async (): Promise<void> => {
        this.loading = true;
        const users = await listUsers();
        this.loading = false;
        this.users = users;
    }

    public getUser(id: number): User {
        return this.users.find(user => user.id === id);
    }
}

export const users = new UsersState();
