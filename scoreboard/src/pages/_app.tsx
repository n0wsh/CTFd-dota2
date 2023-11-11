import { AppProps } from "next/app";

import "@/styles/global.css";
import { TaskQueueProvider } from "@/contexts/TaskQueueContext";

import localFont from "next/font/local";
const radianceRegular = localFont({ src: "../styles/radiance-regular.otf" });

function App({ Component, pageProps }: AppProps) {
  return (
    <TaskQueueProvider>
      <main className={radianceRegular.className}>
        <Component {...pageProps} />
      </main>
    </TaskQueueProvider>
  );
}

export default App;
