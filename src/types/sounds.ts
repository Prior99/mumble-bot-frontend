export interface Sound {
    /**
     * The name of the sound (filename).
     */
    name: string;
    /**
     * Unique id of this sound.
     */
    id: number;
    /**
     * How often the sound was already played back.
     */
    used: number;
}
