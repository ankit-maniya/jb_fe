/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  startNavigationProgress,
  resetNavigationProgress,
  NavigationProgress,
} from "@mantine/nprogress";
import { LoadingOverlay } from "@mantine/core";

export const RouterTransitionOld = () => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) =>
      url !== router.asPath && startNavigationProgress();
    const handleComplete = () => resetNavigationProgress();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.asPath]);

  return <NavigationProgress color="#29D" height={3} showOnShallow={true} />;
};

export const RouterTransition = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false);
      }, 2000);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    loading && (
      <LoadingOverlay
        loaderProps={{ variant: "bars" }}
        visible={loading}
        zIndex={999}
        overlayBlur={2}
      />
    )
  );
};
