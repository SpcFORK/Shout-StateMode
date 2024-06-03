import { Shouts } from "shoutexp"

export { type ShoutVar } from "shoutexp"

export class StateFactory {
  static StateFactory = StateFactory
  StateFactory = StateFactory

  active = false

  state = 0
  limit = 0

  private static V_HL = (v?: number): any => { }
  private V_HL = StateFactory.V_HL

  /** On Overflow  */
  onOver = this.V_HL
  /** On Underflow  */
  onUnder = this.V_HL

  onPop = this.V_HL
  onPush = this.V_HL

  onChange = this.V_HL

  setOnOver(callback: typeof this.V_HL) {
    this.onOver = callback
  }

  setOnUnder(callback: typeof this.V_HL) {
    this.onUnder = callback
  }

  setOnPop(callback: typeof this.V_HL) {
    this.onPop = callback
  }

  setOnPush(callback: typeof this.V_HL) {
    this.onPush = callback
  }

  setOnChange(callback: typeof this.V_HL) {
    this.onChange = callback
  }

  constructor(limit: number) {
    this.limit = limit
  }

  checkState() {
    return this.active = this.state !== 0;
  }

  /**
   * Pops the current state.
   * Decrements the state if possible, otherwise triggers onUnder.
   * Triggers onPop and onChange callbacks.
   * @returns {Array} - Array containing results of onUnder, onPop, and onChange.
   */
  popState(): Array<any> {
    let res = new Array(3);

    if (this.state > 0)
      this.state--;
    else
      res[0] = this.onUnder(this.state);

    this.checkState();

    res[1] = this.onPop(this.state);
    res[2] = this.onChange(this.state);

    return res;
  }

  /**
   * Pushes the current state.
   * Increments the state if possible, otherwise triggers onOver.
   * Triggers onPush and onChange callbacks.
   * @returns {Array} - Array containing results of onOver, onPush, and onChange.
   */
  pushState(): Array<any> {
    let res = new Array(3);

    if (this.state < this.limit)
      this.state++;
    else
      res[0] = this.onOver(this.state);

    this.checkState();

    res[1] = this.onPush(this.state);
    res[2] = this.onChange(this.state);

    return res;
  }
}

export const UseNS = Shouts.ShoutModule() as typeof Shouts;

export const NSname = {
  check: (name: string) => `check${name}`,
  use: (name: string) => `use${name}`,
  undo: (name: string) => `undo${name}`,
  access: (name: string) => `access${name}`,
  lockUse: (name: string) => `lockUse${name}`,
  mode: (name: string) => `$$${name}`,
}

export function createMode(name: string, limit: number) {
  let state = new StateFactory(limit);

  let LOCKEDARR = new Array<boolean>(5);

  function lock(i: number, v = true) {
    return LOCKEDARR[i] = v
  }

  function openCB(i: number, cb: (i?: number) => any) {
    return LOCKEDARR[i] && cb(i)
  }

  function check() {
    return openCB(0, state.checkState)
  }

  function use() {
    return openCB(1, state.pushState)
  }

  function undo() {
    return openCB(2, state.popState)
  }

  function access() {
    return openCB(3, state.popState)
  }

  function lockUse(i: number) {
    return openCB(4, () => lock(i, true))
  }

  const mode = {
    state,
    check,
    use,
    undo,
    access,
    lockUse,
    $$
  }

  function $$() {
    return mode
  }

  UseNS.createShout(NSname.check(name), check);
  UseNS.createShout(NSname.use(name), use);
  UseNS.createShout(NSname.undo(name), undo);
  UseNS.createShout(NSname.access(name), access);
  UseNS.createShout(NSname.lockUse(name), () => lockUse);
  UseNS.createShout(NSname.mode(name), $$);

  return mode;
}