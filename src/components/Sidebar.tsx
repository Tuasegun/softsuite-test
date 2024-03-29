import { useState } from "react";
import "../styles/Sidebar.scss";
import { sidebarContent, sidebarBottomContent } from "../constants";
import { MdKeyboardArrowDown } from "react-icons/md";
export const Sidebar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const handleToggleSubItems = (index: number) => {
    setClickedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="sidebar-container">
      <div className="switch-container">
                <div className="switch-card">
                <div className="switch-icon-container">
                <img src="/assets/icons/switch.svg" alt="switchIcon"/>
                </div>             
                <div className="switch-profile">
                    <p className="switch-text">
                    Switch Module
                    </p>
                    <p className="desc-text">
                    Payroll Management
                    </p>
                </div>
                </div>
             
                <div className="dropdown-icon">
                    <MdKeyboardArrowDown />
                </div>
      </div>
      <div className="sidebar-container-items">
        {sidebarContent.map((item, index) => {
          const isHovered = index === hoveredIndex;
          const isClicked = index === clickedIndex;
          const isSubVisible = isClicked && item?.hasSubItems;
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleToggleSubItems(index)}
            >
              <div
                className={
                  item.title === "Element Setup"
                    ? "element-class"
                    : "sidebar-item"
                }
              >
                <div className="title-icon">
                  <div className="sidebar-icon">
                    {isHovered ? item?.onHoverIcon : item?.icon}
                  </div>

                  <div className="sidebar-title">{item?.title}</div>
                </div>
                <div className="sub-icon">
                  {item?.hasSubItems == true ? <MdKeyboardArrowDown /> : null}
                </div>
              </div>
              {
isSubVisible ?  (
                    <div className="sub-item-container">
                        {
                            item?.subItems?.map((subItem, index) => {
                                return(
                                    <div className="sub-item" key={index}>
                                        <div className="sub-item-title">
                                            {subItem?.title}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ): (
                    null
                )
              }
            </div>
          );
        })}
      </div>
      <div className="sidebar-container-items-bottom">
        {sidebarBottomContent.map((item, index) => {
          const isHovered = index === hoveredIndex;
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={
                  item.title === "Element Setup"
                    ? "element-class"
                    : "sidebar-item"
                }
              >
                <div className="title-icon">
                  <div className="sidebar-icon">
                    {isHovered ? item?.onHoverIcon : item?.icon}
                  </div>

                  <div className="sidebar-title">{item?.title}</div>
                </div>
                <div className="sub-icon">
                  {item?.hasSubItems == true ? <MdKeyboardArrowDown /> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
