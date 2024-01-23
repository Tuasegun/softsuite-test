import React, { useState } from "react";
import Modal from "react-modal";
import { ElementCreateForm } from "./ElementCreateForm";
import "../../styles/ElemSection.scss";
import { Button } from "@chakra-ui/react";
import {ElementCreateTable} from './ElementCreateTable'
import { IoChevronForwardSharp, IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
  },
};
export const ElementsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="element-section-container">
      <div className="element-directories">
        <div className="element-directory">
          <p className="element-directory-text">Payroll Management</p>
        </div>
        <div className="elem-directory-icon">
          <IoChevronForwardSharp className="element-icon" />
        </div>
        <div className="element-directory">
          <p className="element-directory-text">Element Setup</p>
        </div>
        <div className="elem-directory-icon">
          <IoChevronForwardSharp className="element-icon" />
        </div>
        <div className="element-directory">
          <p className="element-directory-text active">Elements</p>
        </div>
      </div>

      <div className="elem-body-container">
        <div className="container-title">
          <h5>Elements</h5>
        </div>
        <div className="search-bar-container">
          <div className="search-sort-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for element"
                className="search-input"
              />
              <button className="search-button">
                <IoSearchOutline className="search-icon" />
              </button>
            </div>
            <div className="sort-button-container">
              <button className="sort-button">
                <img src="/assets/icons/filter.svg" alt="sortIcon" />
              </button>
            </div>
          </div>
          <div className="create-element-button-container">
            <Button
              onClick={openModal}
              className="create-element-button"
              rightIcon={<FaPlus color="#FFF" className="create-element-icon" />}
              
            >
              Create Element
            </Button>
          </div>
        </div>

        <ElementCreateTable />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Element Modal"
        ariaHideApp={false}
      >
        {/* Your modal content goes here */}
        <h2>Create Element</h2>
        <ElementCreateForm />
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
};
