/**
 * A Shout variable is unknown;
 * - This allows for the creation of a shout variable without knowing its return type.
 * - This allows for usage of the value without the type, fails with `const`.
 */
type ShoutVar = Partial<unknown> & unknown & Record<string, any>;
declare const Shouts: {
    /** Core -> this
     * @example ```ts
     * ShoutModule.createShout('timergen', () => {...})
     * ShoutModule.createShout('startTimer', () => {...})
     *
     * let timer = timergen;
     *
     * startTimer;
     * console.log(timer)
     *
     * setInteral(() => {
     *   console.log(timer) // X.X ms
     * }, 1000)
     * ```
     */
    ShoutModule: () => any;
    /**
     * A map to store shout data.
     */
    total: Map<string, any>;
    /**
     * Creates a new shout with the given name and callback.
     * @param name The name of the shout.
     * @param cb The callback to be executed when the shout is accessed.
     */
    createShout(name?: string, cb?: (count: number, total?: any) => any, implicitReturnValue?: null): typeof globalThis & ShoutVar;
    /**
     * Destroys the shout with the given name.
     * @param name The name of the shout to destroy.
     * @throws Error if the shout does not exist.
     */
    destroyShout(name: string): void;
    /**
     * Destroys all shouts.
     */
    removeAllShouts(): void;
    /**
     * Checks if a shout with the given name exists.
     * @param name The name of the shout to check.
     * @returns {boolean} True if the shout exists, false otherwise.
     */
    isShout(name: string): boolean;
    /**
     * Retrieves the shout data for the given name.
     * @param name The name of the shout.
     * @returns The shout data or undefined if not found.
     */
    getShout(name: string): any;
    /**
     * Retrieves the type of the shout for the given name.
     * @param name The name of the shout.
     * @returns The type of the shout or undefined if not found.
     */
    getShoutType(name: string): any;
    /**
     * Retrieves the count of the shout for the given name.
     * @param name The name of the shout.
     * @returns The count of the shout or undefined if not found.
     */
    getShoutCount(name: string): any;
};
declare global {
    /** Access GlobalThis (This shout should not fail) */
    const $_: ShoutVar;
}

export { type ShoutVar, Shouts };
