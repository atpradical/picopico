import {
  ComponentPropsWithoutRef,
  ComponentType,
  ElementRef,
  forwardRef,
  useState,
} from "react";

import { LogoutConfirmation } from "@/views/modals/logout-confirmation/LogoutConfirmation";
import { LogOutOutlineIcon, Typography } from "@atpradical/picopico-ui-kit";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "./SideBar.module.scss";

import { menuItems } from "./menu-items";

type SideBarProps = ComponentPropsWithoutRef<"nav">;
type SideBarRef = ElementRef<"nav">;

export const SideBar = forwardRef<SideBarRef, SideBarProps>(
  ({ className, ...rest }, ref) => {
    const router = useRouter();
    const [openLogoutModal, setOpenLogoutModal] = useState(false);
    const handleLogoutClick = () => {
      setOpenLogoutModal(true);
    };

    return (
      <nav className={clsx(s.sidebar, className)} ref={ref} {...rest}>
        <div className={s.group}>
          {menuItems
            .slice(0, 5)
            .map(({ Icon, OutlineIcon, label, path }, index) => (
              <Item
                Icon={Icon}
                OutlineIcon={OutlineIcon}
                isActive={router.pathname === path}
                key={label + index}
                label={label}
                path={path}
              />
            ))}
        </div>
        <div className={s.group}>
          {menuItems
            .slice(5)
            .map(({ Icon, OutlineIcon, label, path }, index) => (
              <Item
                Icon={Icon}
                OutlineIcon={OutlineIcon}
                isActive={router.pathname === path}
                key={label + index}
                label={label}
                path={path}
              />
            ))}
        </div>
        <div className={s.group}>
          <Typography
            as={"button"}
            className={s.title}
            onClick={handleLogoutClick}
            variant={"medium_14"}
          >
            <LogOutOutlineIcon className={s.icon} />
            Log Out
          </Typography>
        </div>
        {openLogoutModal && (
          <LogoutConfirmation
            isOpen={openLogoutModal}
            onOpenChange={setOpenLogoutModal}
          />
        )}
      </nav>
    );
  },
);

SideBar.displayName = "SideBar";

type ItemProps = {
  Icon: ComponentType<{ className: string }>;
  OutlineIcon: ComponentType<{ className: string }>;
  isActive: boolean;
  label?: string;
  path: string;
};

export const Item = ({
  Icon,
  OutlineIcon,
  isActive,
  label,
  path,
}: ItemProps) => {
  return (
    <Typography
      as={Link}
      className={s.title}
      data-active={isActive}
      href={path}
      variant={"medium_14"}
    >
      {isActive ? (
        <Icon className={s.icon} />
      ) : (
        <OutlineIcon className={s.icon} />
      )}
      {label}
    </Typography>
  );
};
