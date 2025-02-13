import React from "react";
import "./sidebar.css";
import { sideMenu } from "../../constants/sideMenu";
import { SidebarProps, SidebarState } from "./interface";
import { withRouter } from "react-router-dom";
import StorageUtil from "../../utils/serviceUtils/storageUtil";
import { openExternalUrl } from "../../utils/serviceUtils/urlUtil";
import ShelfUtil from "../../utils/readUtils/shelfUtil";
import DeletePopup from "../../components/dialogs/deletePopup";
import ImportLocal from "../../components/importLocal";
import Header from "../../containers/header";

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.state = {
      index: 0,
      hoverIndex: -1,
      hoverShelfIndex: -1,
      isDrag: false,
      isOpenDelete: false,
      shelfIndex: 0,
      windowWidth: window.innerWidth,
      isCollapsed:
        window.innerWidth < 640 ? true : (StorageUtil.getReaderConfig("isCollapsed") === "yes" || false)
    };
  }
  componentDidMount() {
    this.props.handleMode(
      document.URL.split("/").reverse()[0] === "empty"
        ? "home"
        : document.URL.split("/").reverse()[0]
    );
    window.onresize = () => window.innerWidth < 640 ? this.handleCollapse(true) : this.handleCollapse(this.state.isCollapsed);
  }

  handleSidebar = (mode: string, index: number) => {
    this.setState({ index: index });
    this.props.handleSelectBook(false);
    this.props.history.push(`/manager/${mode}`);
    this.props.handleMode(mode);
    this.props.handleShelfIndex(-1);
    this.props.handleSearch(false);
    this.props.handleSortDisplay(false);
  };
  handleHover = (index: number) => {
    this.setState({ hoverIndex: index });
  };
  handleShelfHover = (index: number) => {
    this.setState({ hoverShelfIndex: index });
  };
  handleCollapse = (isCollapsed: boolean) => {
    this.setState({ isCollapsed });
    this.props.handleCollapse(isCollapsed);
    StorageUtil.setReaderConfig("isCollapsed", isCollapsed ? "yes" : "no");
  };
  handleJump = (url: string) => {
    openExternalUrl(url);
  };
  handleDeleteShelf = () => {
    if (this.state.shelfIndex < 1) return;
    let shelfTitles = Object.keys(ShelfUtil.getShelf());
    let currentShelfTitle = shelfTitles[this.state.shelfIndex];
    ShelfUtil.removeShelf(currentShelfTitle);
    this.setState({ shelfIndex: 0 }, () => {
      this.props.handleShelfIndex(0);
      this.props.handleMode("shelf");
    });
  };
  handleDrag = (isDrag: boolean) => {
    this.setState({ isDrag });
  };
  handleDeletePopup = (isOpenDelete: boolean) => {
    this.setState({ isOpenDelete });
  };
  render() {
    const renderSideMenu = () => {
      return sideMenu.map((item, index) => {
        return (
          <li
            key={item.name}
            className={
              this.state.index === index && this.props.mode !== "shelf" && this.state.index != 1
                ? "active side-menu-item side-menu-item-active side-menu-item"
                : "side-menu-item side-menu-item-inactive"
            }
            id={`sidebar-${item.icon}`}
            onClick={() => {
              this.handleSidebar(item.mode, index);
            }}
            onMouseEnter={() => {
              this.handleHover(index);
            }}
            onMouseLeave={() => {
              this.handleHover(-1);
            }}
            style={this.props.isCollapsed ? { width: 40, marginLeft: 15 } : {}}
          >
            {this.state.index === index && this.props.mode !== "shelf" ? (
              <div className="side-menu-selector-container"></div>
            ) : null}
            {this.state.hoverIndex === index ? (
              <div className="side-menu-hover-container"></div>
            ) : null}
            <div
              className={
                this.state.index === index && this.props.mode !== "shelf"
                  ? "side-menu-selector active-selector"
                  : "side-menu-selector "
              }
            >
              <div
                className="side-menu-icon"
                style={this.props.isCollapsed ? {} : { marginLeft: "38px" }}
              >
                <span
                  className={
                    this.state.index === index && this.props.mode !== "shelf"
                      ? `icon-${item.icon}  active-icon`
                      : `icon-${item.icon}`
                  }
                  style={
                    this.props.isCollapsed
                      ? { position: "relative", marginLeft: "-50px" }
                      : { position: "relative", marginLeft: "-50px" }
                  }
                ></span>
              </div>

              <div className="side-menu-selector" >
                <span className="side-menu-selector-bis">{this.props.t(item.name)}</span>
              </div>
            </div>
          </li>

        );
      });
    };
    const deletePopupProps = {
      mode: "shelf",
      name: Object.keys(ShelfUtil.getShelf())[this.state.shelfIndex],
      title: "Delete this shelf",
      description: "This action will clear and remove this shelf",
      handleDeletePopup: this.handleDeletePopup,
      handleDeleteOpearion: this.handleDeleteShelf,
    };
    return (
      <>
        <div className="sidebar">
          <img
            src={
              StorageUtil.getReaderConfig("appSkin") === "night" ||
                (StorageUtil.getReaderConfig("appSkin") === "system" &&
                  StorageUtil.getReaderConfig("isOSNight") === "yes")
                ? "./assets/label_light.png"
                : "./assets/label.png"
            }
            alt="Icone du cartable fantastique"
            onClick={() => {
              this.handleJump("https://www.cartablefantastique.fr/");
            }}
            style={this.state.isCollapsed ? { display: "none" } : {}}
            className="logo"
          />
          <div
            className="side-menu-container-parent"
            style={this.state.isCollapsed ? { width: "70px" } : {}}
          >

            <ul className="side-menu-container">
              <li
                key={"side-menu-item-addbooks"}
                className={"side-menu-item"}
                id={`sidebar-add-books`}
                style={{ width: 250, marginLeft: 0 }}
              >
                <div className="import-container" style={{ marginLeft: "-25px" }}>

                  <ImportLocal
                    {...{
                      handleDrag: this.props.handleDrag,
                    }}
                  />
                </div>
              </li>
              <li>{renderSideMenu()}</li>

            </ul>

          </div>
        </div>
        {/* <Header {...{ handleDrag: this.handleDrag }} /> */}
        {this.state.isOpenDelete && <DeletePopup {...deletePopupProps} />}
      </>
    );
  }
}

export default withRouter(Sidebar as any);
