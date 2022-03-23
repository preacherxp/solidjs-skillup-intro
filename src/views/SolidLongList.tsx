import { Component, createSignal } from "solid-js";

const SolidLongList: Component = () => {
  const [list, setList] = createSignal(new Array(10000).fill(0));

  return (
    <div className="">
      <div className="">SolidLongList</div>
      {list().map((l, idx) => {
        return <div>{idx}</div>;
      })}
    </div>
  );
};

export default SolidLongList;
