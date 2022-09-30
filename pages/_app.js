import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { wrapper } from "../redux/store";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import React from "react";
import App from "next/app";
// import NextNProgress from "nextjs-progressbar";
import { RouterTransition } from "../components";
import { useLocalStorage } from "@mantine/hooks";

const WrapperComponent = ({ children }) => {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

class MyApp extends App {
  toggleColorScheme = (value) =>
    this.setState({
      colorScheme:
        value || (this.state.colorScheme === "dark" ? "light" : "dark"),
    });

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <WrapperComponent>
        <RouterTransition />
        {/* <NextNProgress /> */}
        <ModalsProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </ModalsProvider>
      </WrapperComponent>
    );
  }
}

export default wrapper.withRedux(MyApp);
