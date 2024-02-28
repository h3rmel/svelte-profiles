import "@/styles/globals.css";

import App from "./App.svelte";

const htmlTarget = document.getElementById("app")!;

const app = new App({
  target: htmlTarget,
});

export default app;
