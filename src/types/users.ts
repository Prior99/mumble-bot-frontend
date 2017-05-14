export interface User {
    minecraft: string;
    id: number;
    username: string;
    steamid: string;
    money: number;
    settings: {
        recording: boolean;
    };
}

