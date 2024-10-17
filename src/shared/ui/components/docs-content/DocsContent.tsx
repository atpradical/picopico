import { Paths } from "@/shared/enums";
import {
  ArrowBackOutlineIcon,
  Button,
  Typography,
} from "@atpradical/picopico-ui-kit";
import Link from "next/link";

import s from "./DocsContent.module.scss";

type DocsContentProps = {
  buttonText: string;
  docsContent: string;
  href: Paths;
  title: string;
};

export const DocsContent = ({
  buttonText,
  docsContent,
  href,
  title,
}: DocsContentProps) => {
  return (
    <div className={s.container}>
      <Button as={Link} className={s.button} href={href} variant={"link"}>
        <ArrowBackOutlineIcon />
        {buttonText}
      </Button>
      <div className={s.docsContainer}>
        <Typography as={"h1"} variant={"h1"}>
          {title}
        </Typography>
        <Typography className={s.content} variant={"regular_14"}>
          {docsContent}
        </Typography>
      </div>
    </div>
  );
};
