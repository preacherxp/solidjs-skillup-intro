//@ts-nocheck

import {
  createMemo,
  createSignal,
  createComputed,
  onCleanup,
  For,
} from "solid-js";
import { createStore } from "solid-js/store";

const SolidScoreboard = () => {
  let newName: any, newScore: any;
  const [state, setState] = createStore<any>({
    players: [
      { name: "Michał", score: 3 },
      { name: "Łukasz", score: 2 },
      { name: "Robert", score: -51 },
      { name: "Piotr", score: 8 },
    ],
    players2: [
      { name: "Michał", score: 3 },
      { name: "Łukasz", score: 2 },
      { name: "Robert", score: -51 },
      { name: "Piotr", score: 8 },
    ],
  });

  const lastPos = new WeakMap();
  const curPos = new WeakMap();
  const getSorted = createMemo((list = []) => {
    list.forEach((p, i) => lastPos.set(p, i));
    const newList = state.players.slice().sort((a, b) => {
      if (b.score === a.score) return a.name.localeCompare(b.name); // stabalize the sort
      return b.score - a.score;
    });
    let updated = newList.length !== list.length;
    newList.forEach(
      (p, i) => lastPos.get(p) !== i && (updated = true) && curPos.set(p, i)
    );
    return updated ? newList : list;
  });

  const handleAddClick = () => {
    const name = newName.value,
      score = +newScore.value;
    if (!name.length || isNaN(score)) return;
    setState("players", (p) => [...p, { name: name, score: score }]);
    newName.value = newScore.value = "";
  };

  const handleDeleteClick = (player) => {
    const idx = state.players.indexOf(player);
    setState("players", (p) => [...p.slice(0, idx), ...p.slice(idx + 1)]);
  };

  const handleScoreChange = (player, { target }) => {
    const score = +target.value;
    const idx = state.players.indexOf(player);
    if (isNaN(+score) || idx < 0) return;
    setState("players", idx, "score", score);
  };

  const createStyles = (player) => {
    const [style, setStyle] = createSignal();
    createComputed(() => {
      getSorted();
      const offset = lastPos.get(player) * 18 - curPos.get(player) * 18,
        t = setTimeout(() =>
          setStyle({ transition: "250ms", transform: null })
        );
      setStyle({
        transform: `translateY(${offset}px)`,
        transition: null,
      });
      onCleanup(() => clearTimeout(t));
    });
    return style;
  };

  return (
    <div id="scoreboard">
      <div class="board">
        <For each={getSorted()}>
          {(player) => {
            const getStyles = createStyles(player),
              { name } = player;
            return (
              <div class="player" style={getStyles()}>
                <div class="name">{name}</div>
                <div class="score">{player.score}</div>
              </div>
            );
          }}
        </For>
      </div>
      <form class="admin">
        <For each={state.players}>
          {(player) => {
            const { name, score } = player;
            return (
              <div class="player">
                {name}
                <input
                  class="score"
                  type="number"
                  value={score}
                  onInput={[handleScoreChange, player]}
                />
                <button type="button" onClick={[handleDeleteClick, player]}>
                  x
                </button>
              </div>
            );
          }}
        </For>
        <div class="player">
          <input
            type="text"
            name="name"
            placeholder="New player..."
            ref={newName}
          />
          <input class="score" type="number" name="score" ref={newScore} />
          <button type="button" onClick={handleAddClick}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default SolidScoreboard;
