import React, { useState } from 'react'
import Modal from 'react-modal';
import {ElementCreateForm} from './ElementCreateForm'
import '../../styles/ElemSection.scss'
import { IoChevronForwardSharp } from "react-icons/io5";
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
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
                <p className="element-directory-text">
                Payroll Management
                </p>
            </div>
            <div className="elem-directory-icon">
                <IoChevronForwardSharp className="element-icon" />
            </div>
            <div className="element-directory">
                <p className="element-directory-text">
                Element Setup
                </p>
            </div>
            <div className="elem-directory-icon">
                <IoChevronForwardSharp className="element-icon" />
            </div>
            <div className="element-directory">
                <p className="element-directory-text active">
                Elements
                </p>
            </div>   
        </div>

         <button onClick={openModal}>
            Create Element
        </button>
   
   
        <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Element Modal"
        ariaHideApp={false}
      >
        {/* Your modal content goes here */}
        <h2>Create Element</h2>
        <ElementCreateForm/>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
       
    </div>
  )
}
