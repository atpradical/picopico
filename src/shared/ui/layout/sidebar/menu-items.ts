import { Paths } from "@/shared/enums";
import {
  BookmarkIcon,
  BookmarkOutlineIcon,
  HomeIcon,
  HomeOutlineIcon,
  MessageCircleIcon,
  MessageCircleOutlineIcon,
  PersonIcon,
  PersonOutlineIcon,
  PlusSquareIcon,
  PlusSquareOutlineIcon,
  SearchIcon,
  SearchOutlineIcon,
  TrendingUpIcon,
  TrendingUpOutlineIcon,
} from "@atpradical/picopico-ui-kit";

export const menuItems = [
  {
    Icon: HomeIcon,
    OutlineIcon: HomeOutlineIcon,
    label: "Home",
    path: Paths.home,
  },
  {
    Icon: PlusSquareIcon,
    OutlineIcon: PlusSquareOutlineIcon,
    label: "Create",
    path: Paths.create,
  },
  {
    Icon: PersonIcon,
    OutlineIcon: PersonOutlineIcon,
    label: "My Profile",
    path: Paths.profile,
  },
  {
    Icon: MessageCircleIcon,
    OutlineIcon: MessageCircleOutlineIcon,
    label: "Messenger",
    path: Paths.messages,
  },
  {
    Icon: SearchIcon,
    OutlineIcon: SearchOutlineIcon,
    label: "Search",
    path: Paths.search,
  },
  {
    Icon: TrendingUpIcon,
    OutlineIcon: TrendingUpOutlineIcon,
    label: "Statistics",
    path: Paths.statistics,
  },
  {
    Icon: BookmarkIcon,
    OutlineIcon: BookmarkOutlineIcon,
    label: "Favourites",
    path: Paths.favourites,
  },
];
