import { observable, computed, action } from "mobx";

export class UiState {
    @observable public drawerActive = false;

    @action
    public toggleDrawer = () => this.drawerActive = !this.drawerActive
}

export const ui = new UiState();
