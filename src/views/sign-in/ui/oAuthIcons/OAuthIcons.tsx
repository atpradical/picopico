import { useTranslation } from "@/shared/hooks";
import { Button, GithubIcon, GoogleIcon } from "@atpradical/picopico-ui-kit";
import { useRouter } from "next/router";

import s from "./OAuthIcons.module.scss";

export const OAuthIcons = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { githubButton, googleButton } = t.signUpPage;

  const onGoogle = () => {
    router.push(`${process.env.NEXT_PUBLIC_INCTAGRAM_BASE_URL}/v1/auth/google`);
  };
  const onGithub = () => {
    router.push(`${process.env.NEXT_PUBLIC_INCTAGRAM_BASE_URL}/v1/auth/github`);
  };

  return (
    <div className={s.socials}>
      <Button
        className={s.socialsButton}
        onClick={onGithub}
        title={githubButton}
        variant={"icon"}
      >
        <GithubIcon className={s.icon} />
      </Button>
      <Button
        className={s.socialsButton}
        onClick={onGoogle}
        title={googleButton}
        variant={"icon"}
      >
        <GoogleIcon className={s.icon} />
      </Button>
    </div>
  );
};
