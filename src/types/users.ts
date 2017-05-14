export interface User {
    id: number;
    username: string;
    money: number;
    settings: {
        recording: boolean;
    };
}

