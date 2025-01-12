import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { RiSettings2Line } from "react-icons/ri";
import { TbBriefcase } from "react-icons/tb";
import { BsHeadset } from "react-icons/bs";
import { RxShuffle, RxDashboard } from "react-icons/rx";
import { TbClipboardText } from "react-icons/tb";
import { BiPieChartAlt2 } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import Image from 'next/image';
import logo from '@public/images/logox.svg';
export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  setProfileOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  setSelectedItem: (value: string) => void;
}

function Sidebar({ isOpen, toggleSidebar, setProfileOpen,setSelectedItem }:SidebarProps) {
  
  const [isHovered, setIsHovered] = useState(false);
  const [clickedItem, setClickedItem] = useState('home');
  const [mounted, setMounted] = useState(false);

   // Delay the hydration until after the first render
  useEffect(() => {
    setMounted(true);
  }, []);

  // If the component hasn't mounted yet, return null to prevent mismatch
  if (!mounted) {
    return null;
  }


  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const menuItems = [
    { icon: <RxDashboard size={30} color="black" />, path:"home", label: "Home" },
    { icon: <TbClipboardText size={30} color="#550000" />,path:"management", label: "Leads Management"},
    { icon: <BiPieChartAlt2 size={30} color="black" />,path:"attendance", label: "Attendance"},
    { icon: <TbBriefcase size={30} color="black" />,path:"stores", label: "Stores" },
    { icon: <BsHeadset size={30} color="black" />,path:"providers", label: "Providers" },
    { icon: <RiSettings2Line size={30} color="black" />,path:"developers", label: "Developers" },
    { icon: <RxShuffle size={30} color="black" />,path:"workflows", label: "Workflows" },
  ];

  const profileItems = [
    { icon: <AiOutlineUser size={30} color="black" />,path:"profile", label: "Profile", onClick: () => setProfileOpen((prev) => !prev) },
    { icon: <FiLogOut size={30} color="black" />,path:"signout", label: "Sign Out"},
  ];

  const handleItem = (item:string) =>{
    setClickedItem(item);
    setSelectedItem(item);
  }

  return (
    <div
      className={`${styles.sidebar} ${isHovered ? styles.expanded : styles.compressed} ${isOpen ? styles.open : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isOpen && (
        <div className={styles["open-close-c-logo"]}>
          <Image src={logo} alt="logo" />
          <IoClose size={30} onClick={toggleSidebar} className={styles["close-icon"]} />
        </div>
      )}

      <ul>
        {menuItems.map((item, index) => (
            <li key={index} onClick={()=>handleItem(item.path)} className={clickedItem === item.path ? styles["selected"] : ""}>
              <div className={`${styles['list-item']} ${clickedItem === item.path ? styles["icon-selected"] : ""}`}>
                {React.cloneElement(item.icon, {
                  color: clickedItem === item.path ? "#8E198F" : ""  })}
                {(isHovered || isOpen) && <span>{item.label}</span>}
              </div>
            </li>
        ))}
      </ul>

      <ul>
        {profileItems.map((item, index) => (
          <li key={index} onClick={()=>handleItem(item.path)}  className={clickedItem === item.path ? styles["selected"] : ""}>
            <div className={`${styles["list-item"]} ${clickedItem === item.path ? styles["icon-selected"] : ""}`} >
              {React.cloneElement(item.icon, {
                color: clickedItem === item.path ? "#8E198F" : ""  })}
              {(isHovered || isOpen) && <span>{item.label}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;