//@ts-nocheck

import { createSignal, Suspense, Switch, Match, useTransition } from "solid-js";
import Child from "./child";

import "./SolidSuspense.css";

const SolidSuspense = () => {
  const [tab, setTab] = createSignal(0);
  const [pending, start] = useTransition();
  const updateTab = (index) => () => start(() => setTab(index));

  return (
    <>
      <ul class="inline">
        <li classList={{ selected: tab() === 0 }} onClick={updateTab(0)}>
          1
        </li>
        <li classList={{ selected: tab() === 1 }} onClick={updateTab(1)}>
          2
        </li>
        <li classList={{ selected: tab() === 2 }} onClick={updateTab(2)}>
          3
        </li>
      </ul>
      <div class="tab" classList={{ pending: pending() }}>
        <Suspense fallback={<div class="loader">Loading...</div>}>
          <Switch>
            <Match when={tab() === 0}>
              <Child page="1" />
            </Match>
            <Match when={tab() === 1}>
              <Child page="2" />
            </Match>
            <Match when={tab() === 2}>
              <Child page="3" />
            </Match>
          </Switch>
        </Suspense>
      </div>
    </>
  );
};

export default SolidSuspense;
