import { For, Show, Switch, Match, Index, ErrorBoundary, Suspense, SuspenseList } from "solid-js";
import { Portal } from "solid-js/web";


export const c = (
  <>
    <For each={state.list} fallback={<div>Loading...</div>}>
      {(item, index) => (
        <div key={index}>
          #{index()} {item}
        </div>
      )}
    </For>

    <Show when={state.user} fallback={<div>Loading...</div>}>
      {(user) => <div>{user.firstName}</div>}
    </Show>

    <Switch fallback={<div>Not Found</div>}>
      <Match when={state.route === "home"}>
        <Home />
      </Match>
      <Match when={state.route === "settings"}>
        <Settings />
      </Match>
    </Switch>

    <Index each={state.list} fallback={<div>Loading...</div>}>
      {(item, index) => (
        <div>
          #{index} {item()}
        </div>
      )}
    </Index>

    <ErrorBoundary
      fallback={(err, reset) => (
        <div onClick={reset}>Error: {err.toString()}</div>
      )}
    >
      <MyComp />
    </ErrorBoundary>

    <Suspense fallback={<div>Loading...</div>}>
      <AsyncComponent />
    </Suspense>

    <SuspenseList revealOrder="forwards" tail="collapsed">
      <ProfileDetails user={resource.user} />
      <Suspense fallback={<h2>Loading posts...</h2>}>
        <ProfileTimeline posts={resource.posts} />
      </Suspense>
      <Suspense fallback={<h2>Loading fun facts...</h2>}>
        <ProfileTrivia trivia={resource.trivia} />
      </Suspense>
    </SuspenseList>

    <Portal mount={document.getElementById("modal")}>
      <div>My Content</div>
    </Portal>
  </>
);
