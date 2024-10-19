import * as shoutstate from "./shoutstate";
import type { CtxWithMode } from "../global";

let ctx = globalThis as CtxWithMode<"test">;
const mode = shoutstate.createMode("test", 3);

ctx.$$test
ctx.usetest
ctx.undotest
ctx.checktest
ctx.accesstest
ctx.lockUsetest