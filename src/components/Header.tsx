import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import '../styles/Header.scss'

export const Header  = () => {
    return(
        <div className="header-container">
                <div className="left-container">
                <div className="logo-container">
                    <img  src="/assets/icons/logo.svg" alt="logo"/>
                </div>
                <div className="org-dropdown">
                <div className="home-icon-container">
                <img src="/assets/icons/homeIcon.svg" alt="homIcon"/>
                </div>             
                <div className="org-profile">
                    <p className="change-text">
                        Change Organization
                    </p>
                    <p className="paper-text">
                        PaperSoft Organization
                    </p>
                </div>
                <div className="dropdown-icon">
                    <MdKeyboardArrowDown />
                </div>
                </div>
                <div className="search-box">
                    <input placeholder="Search for anything..." type="text" className="search-input" />
                    <button className="search-button">
                    <IoSearchOutline  className="search-icon"/>
                    </button>
                </div>
                </div>
                <div className="right-container">
                <div className="notification-container">
                    <img src="/assets/icons/notifIcon.svg" alt=""/>
                </div>
                <div className="profile-user">
                
                    <div className="avatar-container">
                        <img src="/assets/icons/avatar.svg" alt=""/>
                    </div>
                    <div className="profile-details">
                        <p className="username">
                            Henry Okoro
                        </p>
                        <p className="role">
                        Payroll Manager
                        </p>
                    </div>
                </div>
                </div>
        </div>
    )
}