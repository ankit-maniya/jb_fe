import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { wrapper } from "../redux/store";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import React from "react";
import App from "next/app";
// import NextNProgress from "nextjs-progressbar";
import { RouterTransition } from "../components";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <RouterTransition />
        {/* <NextNProgress /> */}
        <ModalsProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </ModalsProvider>
      </MantineProvider>
    );
  }
}

export default wrapper.withRedux(MyApp);
