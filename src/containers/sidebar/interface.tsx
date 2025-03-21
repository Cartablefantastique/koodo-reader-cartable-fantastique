import { RouteComponentProps } from "react-router";

export interface SidebarProps extends RouteComponentProps<any> {
  mode: string;
  isCollapsed: boolean;
  shelfIndex: number;

  handleMode: (mode: string) => void;
  handleSearch: (isSearch: boolean) => void;
  handleCollapse: (isCollapsed: boolean) => void;
  handleSortDisplay: (isSortDisplay: boolean) => void;
  handleSelectBook: (isSelectBook: boolean) => void;
  handleShelfIndex: (shelfIndex: number) => void;
  handleDrag: (isDrag: boolean) => void;
  t: (title: string) => string;
}

export interface SidebarState {
  index: number;
  hoverIndex: number;
  hoverShelfIndex: number;
  isCollapsed: boolean;
  shelfIndex: number;
  isOpenDelete: boolean;
  windowWidth: number;
}
