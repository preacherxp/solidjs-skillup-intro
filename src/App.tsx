import { Component, Match, Switch } from "solid-js";
import { createStore } from "solid-js/store";

import styles from "./App.module.css";
import SolidApi from "./views/SolidApi";
import SolidScoreboard from "./views/SolidScoreBoard";
import SolidLongList from "./views/SolidLongList";
import SolidSuspense from "./views/SolidSuspense";
import { SolidOrReact, ReactOrSolid } from "./views/SolidOrReact";
import { Button, Container, Grid } from "@hope-ui/solid";
import SolidLifecycle from "./views/SolidLifecycle";

const App: Component = () => {
  const [state, setState] = createStore<any>({
    route: "home",
  });

  return (
    <div class={styles.App}>
      <Grid templateColumns="repeat(4, 1fr)" gap="$6">
        <Button onClick={() => setState({ ...state, route: "API" })}>
          API
        </Button>
        <Button onClick={() => setState({ ...state, route: "Suspense" })}>
          Suspense
        </Button>
        <Button onClick={() => setState({ ...state, route: "Scoreboard" })}>
          Scoreboard
        </Button>
        <Button onClick={() => setState({ ...state, route: "LooongList" })}>
          Looong List
        </Button>
        <Button onClick={() => setState({ ...state, route: "Lifecycle" })}>
        Lifecycle
        </Button>
        
        {/* <Button onClick={() => setState({ ...state, route: "SolidOrReact" })}>
          SolidOrReact
        </Button>
        <Button onClick={() => setState({ ...state, route: "ReactOrSolid" })}>
          ReactOrSolid
        </Button> */}
      </Grid>

      <Container p="$4">
        <Switch fallback={<div>Not Found</div>}>
          <Match when={state.route === "API"}>
            <SolidApi />
          </Match>
          <Match when={state.route === "Suspense"}>
            <SolidSuspense />
          </Match>
          <Match when={state.route === "Scoreboard"}>
            <SolidScoreboard />
          </Match>
          <Match when={state.route === "Lifecycle"}>
            <SolidLifecycle />
          </Match>
          <Match when={state.route === "LooongList"}>
            <SolidLongList />
          </Match>
          <Match when={state.route === "SolidOrReact"}>
            <SolidOrReact />
          </Match>
          <Match when={state.route === "ReactOrSolid"}>
            <ReactOrSolid />
          </Match>
        </Switch>
      </Container>
    </div>
  );
};

export default App;
