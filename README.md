# Shoutmodes

Shoutmodes are an implementation of a small event system for Shouts, which allows for making special modes for whatever usecase.

```ts
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
```

With JS, it's less typesafe and nice

```js
import * as shoutstate from "./shoutstate";

const mode = shoutstate.createMode("test", 3);

$$test
usetest
undotest
checktest
accesstest
lockUsetest
```

You would probably pair this up with Shouts in order to create dynamic layers which could maybe only be ran when a certain useMode is active.

Shouts mimic Ruby Argless functions, (since they are global getters,) which allows for even more consise code

## Installation

To get started with Shoutmodes, follow these simple steps:

1. `npm i shoutmodes`.
2. Install the necessary dependencies.
3. And start shouting!