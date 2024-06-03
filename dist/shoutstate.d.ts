// Generate by [js2dts@0.3.3](https://github.com/whxaxes/js2dts#readme)

export const type: any;
export const ShoutVar: any;
declare class StateFactory_1 {
  static StateFactory: any;
  active: any;
  state: any;
  limit: any;
  static V_HL: any;
  /** On Overflow  */
  onOver: any;
  /** On Underflow  */
  onUnder: any;
  onPop: any;
  onPush: any;
  onChange: any;
  setOnOver(callback: any): void;
  setOnUnder(callback: any): void;
  setOnPop(callback: any): void;
  setOnPush(callback: any): void;
  setOnChange(callback: any): void;
  constructor(limit: number);
  checkState(): boolean;
  /**
   * Pops the current state.
   * Decrements the state if possible, otherwise triggers onUnder.
   * Triggers onPop and onChange callbacks.
   * @returns {Array} - Array containing results of onUnder, onPop, and onChange.
   */
  popState(): any[];
  /**
   * Pushes the current state.
   * Increments the state if possible, otherwise triggers onOver.
   * Triggers onPush and onChange callbacks.
   * @returns {Array} - Array containing results of onOver, onPush, and onChange.
   */
  pushState(): any[];
}
export const StateFactory: StateFactory_1;
export interface T100 {
  ShoutModule: () => any;
  total: Map<string, any>;
  createShout(name?: string, cb?: (count: number, total?: any) => any, implicitReturnValue?: any): any & Partial<any> & Record<string, any>;
  destroyShout(name: string): void;
  removeAllShouts(): void;
  isShout(name: string): boolean;
  getShout(name: string): any;
  getShoutType(name: string): any;
  getShoutCount(name: string): any;
}
export const UseNS: T100;
export interface T101 {
  check: (name: string) => string;
  use: (name: string) => string;
  undo: (name: string) => string;
  access: (name: string) => string;
  lockUse: (name: string) => string;
  mode: (name: string) => string;
}
export const NSname: T101;
export interface T102 {
  state: StateFactory_1;
  check: () => any;
  use: () => any;
  undo: () => any;
  access: () => any;
  lockUse: (i: number) => any;
  $$: () => any;
}
declare function createMode_1(name: string, limit: number): T102;
export const createMode: typeof createMode_1;
