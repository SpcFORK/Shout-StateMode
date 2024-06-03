"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/shouts.ts
var shouts_exports = {};
__export(shouts_exports, {
  Shouts: () => Shouts
});
module.exports = __toCommonJS(shouts_exports);
var ShoutModule = () => ({
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
  ShoutModule,
  /**
   * A map to store shout data.
   */
  total: /* @__PURE__ */ new Map(),
  /**
   * Creates a new shout with the given name and callback.
   * @param name The name of the shout.
   * @param cb The callback to be executed when the shout is accessed.
   */
  createShout(name = "", cb = () => {
  }, implicitReturnValue = null) {
    let count = 0;
    let keystore = 0;
    this.total.set(name, {
      count,
      keystore,
      cb,
      implicitReturnValue
    });
    return Object.defineProperty(globalThis, name, {
      get: () => {
        count++;
        let shoutData = this.total.has(name) ? this.total.get(name) : null;
        if (shoutData) {
          shoutData.count = count;
          this.total.set(name, shoutData);
        }
        return !implicitReturnValue ? cb(count, shoutData) : Reflect.get(cb(count, shoutData), implicitReturnValue);
      },
      set: (value) => {
        let keyName = typeof value === "string" ? value : value.name || `${keystore}_${typeof value}`;
        let shoutData = this.total.get(name) || {};
        shoutData[keyName] = value;
        this.total.set(name, shoutData);
        keystore++;
      },
      enumerable: true,
      configurable: true
    });
  },
  /**
   * Destroys the shout with the given name.
   * @param name The name of the shout to destroy.
   * @throws Error if the shout does not exist.
   */
  destroyShout(name) {
    if (!this.total.has(name))
      throw new Error(`Shout ${name} not found`);
    Reflect.deleteProperty(globalThis, name);
    this.total.delete(name);
  },
  /**
   * Destroys all shouts.
   */
  removeAllShouts() {
    this.total.forEach((_, name) => {
      Reflect.deleteProperty(globalThis, name);
      this.total.delete(name);
    });
  },
  /**
   * Checks if a shout with the given name exists.
   * @param name The name of the shout to check.
   * @returns {boolean} True if the shout exists, false otherwise.
   */
  isShout(name) {
    let shoutData = Reflect.get(globalThis, name);
    return !this.total.has(name) || !shoutData || !shoutData[Symbol.for("shout")]?.is;
  },
  /**
   * Retrieves the shout data for the given name.
   * @param name The name of the shout.
   * @returns The shout data or undefined if not found.
   */
  getShout(name) {
    if (!this.isShout(name))
      return;
    return this.total.get(name);
  },
  /**
   * Retrieves the type of the shout for the given name.
   * @param name The name of the shout.
   * @returns The type of the shout or undefined if not found.
   */
  getShoutType(name) {
    return this.getShout(name)?.type;
  },
  /**
   * Retrieves the count of the shout for the given name.
   * @param name The name of the shout.
   * @returns The count of the shout or undefined if not found.
   */
  getShoutCount(name) {
    return this.getShout(name)?.count;
  }
});
var Shouts = ShoutModule();
Shouts.createShout("$_", () => globalThis);
if (typeof window !== "undefined")
  globalThis.Shouts = Shouts;
//# sourceMappingURL=shouts.js.map