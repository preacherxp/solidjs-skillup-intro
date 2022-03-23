import { createSignal } from "solid-js";

function useState(initial: number) {
  const [counter, setCounter] = createSignal<number>(initial);

  return [counter, setCounter];
}

export default useState;
