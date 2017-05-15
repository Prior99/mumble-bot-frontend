import { observable, computed, action } from "mobx";
import { SHA256 } from "crypto-js";
import { checkAuth } from "../api";
import { load } from "./utils";

const localStorageIdentifier = "mumble-bot-login-state";
const localStorageVersion = 2;

interface StorageState {
    version: number;
    username: string;
    encryptedPassword: string;
    rememberMe: boolean;
}

export class LoginState {
    @observable public loggedIn: boolean = false;
    @observable public failed: boolean = false;
    @observable public rememberMe: boolean = false;
    @observable public username: string = "";
    @observable public password: string = "";
    @observable public encryptedPassword: string = "";

    @action
    public loadStorage = async () => {
        const jsonStorageState = localStorage.getItem(localStorageIdentifier);
        if (!jsonStorageState) {
            return;
        }
        const storageState: StorageState = JSON.parse(jsonStorageState);
        if (storageState.version !== localStorageVersion) {
            localStorage.removeItem(localStorageIdentifier);
            return;
        }
        this.username = storageState.username;
        this.encryptedPassword = storageState.encryptedPassword;
        this.rememberMe = storageState.rememberMe;
        this.loggedIn = true;
        await this.login();
    }

    private storeStorage = () => {
        const jsonStorageState = JSON.stringify({
            version: localStorageVersion,
            username: this.username,
            encryptedPassword: this.encryptedPassword,
            rememberMe: this.rememberMe
        });
        localStorage.setItem(localStorageIdentifier, jsonStorageState);
    }

    @computed
    public get authToken() {
        const token = btoa(`${this.username}:${this.encryptedPassword}`);
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
        if (!this.encryptedPassword) {
            this.encryptedPassword = SHA256(this.password).toString();
        }
        const valid = await checkAuth();
        this.failed = !valid;
        this.loggedIn = valid;
        if (valid) {
            await load();
            if (this.rememberMe) {
                this.storeStorage();
            } else {
                localStorage.removeItem(localStorageIdentifier);
            }
        }
    }
}

export const login = new LoginState();
