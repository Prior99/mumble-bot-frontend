import { observable, computed, action } from "mobx";
import { SHA256 } from "crypto-js";
import { checkAuth } from "../api/utils";

export class LoginState {
    @observable public loggedIn: boolean = false;
    @observable public failed: boolean = false;
    @observable public username: string = "";
    @observable public password: string = "";

    @computed
    public get authToken() {
        const token = btoa(`${this.username}:${SHA256(this.password)}`);
        return `Basic ${token}`;
    }

    @action
    public updateUsername = (username: string) => {
        this.username = username;
    }

    @action
    public updatePassword = (password: string) => {
        this.password = password;
    }

    @action
    public login = async () => {
        const valid = await checkAuth();
        this.failed = !valid;
        this.loggedIn = valid;
    }
}

export const loginState = new LoginState();
