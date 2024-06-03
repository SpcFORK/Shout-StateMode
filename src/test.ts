import * as shoutstate from "shoutstate";
import type { CtxWithMode } from "../global";

const mode = shoutstate.createMode("test", 3);

let ctx = globalThis as CtxWithMode<"test">;

console.log(ctx);