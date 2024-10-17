import { PropsWithChildren, ReactElement } from "react";
import { ToastContainer } from "react-toastify";

import { Header } from "@/shared/ui/layout/header";
import { NextPage } from "next";

import s from "./Layout.module.scss";

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={s.layout}>{children}</main>
      <ToastContainer />
    </>
  );
};

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}
