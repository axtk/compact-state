# compact-state

Vanilla TS/JS state management for sharing data across decoupled parts of the code + routing. Routing is essentially shared state management, too, with the shared data being the URL.

This package exposes the following classes:

- `EventEmitter` triggers actions without tightly coupling the interacting components
- `State` is `EventEmitter` that stores data and emits an event when the data gets updated allowing for dynamic data sharing without tight coupling

Contents: [State](#state) · [Annotated examples](#annotated-examples)

## `State`

`State` is a thin container for dynamic data. It enables data sharing across multiple parts of code without making these parts directly dependent on each other.

```js
import { State } from "compact-state";

const counterState = new State(42);

document.querySelector("button").addEventListener("click", () => {
  counterState.setValue((value) => value + 1);
});

counterState.on("set", ({ current }) => {
  document.querySelector("output").textContent = String(current);
});
```

In this example, a button changes a counter value and an `<output>` element shows the updating value. Both elements are decoupled from each other: they are only aware of the shared counter state, but not of each other.

A `"set"` event callback is called each time the state value changes and immediately when the callback is added. Subscribe to the `"update"` event to have the callback respond only to the subsequent state changes without the immediate invocation.

## Annotated examples

- [Shared state](https://codesandbox.io/p/sandbox/lqt3z2?file=%252Fsrc%252Findex.ts)
- [Shared form input state](https://codesandbox.io/p/sandbox/4q7f99?file=%252Fsrc%252Findex.ts)

Find also the code of these examples in the repo's [`tests`](https://github.com/axtk/compact-state/tree/main/tests) directory.
