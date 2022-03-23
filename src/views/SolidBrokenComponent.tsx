import { Component, onError } from "solid-js";

const SolidBrokenComponent: Component = () => {
  onError(() => {
    console.log("error!");
  });

  //@ts-ignore
  return <div className="">{"T".toFixed(2)}</div>;
};

export default SolidBrokenComponent;
