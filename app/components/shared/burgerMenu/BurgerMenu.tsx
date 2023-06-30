import { useState } from "react";
import { FaBars, FaSpaceShuttle, FaUser } from "react-icons/fa";
import styles from "./BurgerMenu.module.css";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <div style={{ transform: "rotate(90deg)" }}>
          <FaBars className={styles.faBars} size={24} />
        </div>
        <span
          className={`${styles.menuIcon} ${isOpen ? styles.open : ""}`}
        ></span>
      </button>

      <ul className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <li className={styles.FaSpaceShuttle}>
          <div style={{ transform: "rotate(270deg)" }}>
            <FaSpaceShuttle size={14} />
          </div>
          <div> Explore </div>
        </li>
        <li className={styles.FaSnippet}>My Snippet</li>
        <li className={styles.FaUser}>
          <div>
            {" "}
            <FaUser size={12} />{" "}
          </div>
          <div> User Name</div>
        </li>
        <li className={styles.CreateSnippet}> Create snippet </li>
      </ul>
    </div>
  );
};

export default BurgerMenu;
