import { AppProps } from "next/app";

import "@/styles/global.css";
import { TaskQueueProvider } from "@/contexts/TaskQueueContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <TaskQueueProvider>
      <Component {...pageProps} />
      <audio id="hero-audio" autoPlay></audio>
    </TaskQueueProvider>
  );
}

export default App;
