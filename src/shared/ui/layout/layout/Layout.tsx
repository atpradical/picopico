import { PropsWithChildren, ReactElement } from "react";

import { Header } from "@/shared/ui/layout/header";
import { CustomToastContainer } from "@atpradical/picopico-ui-kit";
import { HeadMeta } from "@/shared/ui/layout/head-meta/HeadMeta";
import { NextPage } from "next";

import "@atpradical/picopico-ui-kit/dist/style.css";

import s from "./Layout.module.scss";

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HeadMeta />
      <Header />
      <main className={s.layout}>{children}</main>
      <CustomToastContainer />
    </>
  );
};

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}
