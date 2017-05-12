import { observable, computed, action } from "mobx";
import { SHA256 } from "crypto-js";
import { checkAuth } from "../api";

const localStorageIdentifier = "mumble-bot-login-state";
const localStorageVersion = 1;

interface StorageState {
    version: number;
    username: string;
    authToken: string;
    rememberMe: boolean;
}

export class LoginState {
    @observable public loggedIn: boolean = false;
    @observable public failed: boolean = false;
    @observable public rememberMe: boolean = false;
    @observable public username: string = "";
    @observable public password: string = "";
    @observable private authTokenFromStorage: string;


    @action
    public loadStorage = async () => {
        const jsonStorageState = localStorage.getItem(localStorageIdentifier);
        if (!jsonStorageState) {
            return;
        }
        const storageState: StorageState = JSON.parse(jsonStorageState);
        this.username = storageState.username;
        this.authTokenFromStorage = storageState.authToken;
        this.rememberMe = storageState.rememberMe;
        this.loggedIn = true;
        await this.login();
    }

    private storeStorage = () => {
        const jsonStorageState = JSON.stringify({
            version: localStorageVersion,
            username: this.username,
            authToken: this.authToken,
            rememberMe: this.rememberMe
        });
        localStorage.setItem(localStorageIdentifier, jsonStorageState);
    }

    @computed
    public get authToken() {
        if (this.authTokenFromStorage) {
            return this.authTokenFromStorage;
        }
        const token = btoa(`${this.username}:${SHA256(this.password)}`);
        return `Basic ${token}`;
    }

    @action public updateRememberMe = (rememberMe: boolean) => this.rememberMe = rememberMe;
    @action public updateUsername = (username: string) => {
        this.username = username;
        this.failed = false;
    }
    @action public updatePassword = (password: string) => {
        this.password = password;
        this.failed = false;
    }

    @action
    public login = async () => {
        const valid = await checkAuth();
        this.failed = !valid;
        this.loggedIn = valid;
        if (valid && this.rememberMe) {
            this.storeStorage();
        }
    }
}

export const loginState = new LoginState();
