import React, {useEffect, useState} from 'react'
import "../../styles/ElemSection.scss";
import { IoChevronForwardSharp, IoSearchOutline } from "react-icons/io5";
import {Link} from 'react-router-dom'
import {useFetchElementDetailsQuery} from '../../store/createElement'
import {CreateElementValuesInterface} from '../../constants'
import { ElementLookupValues } from '../../utils';
import {ElementCreateTable} from './ElementCreateTable'
import {useParams} from 'react-router-dom'
import Modal from 'react-modal'
import { Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { ElementLinkCreateForm } from './ElementLinkCreateForm';
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
export const ElementsLinkSection = () => {
    const {id: linkId} = useParams()
    const {data, isLoading} = useFetchElementDetailsQuery(linkId) 
    const [elementLinkData, setElementLinkData] = useState<CreateElementValuesInterface | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };
  useEffect(() => {
    setElementLinkData(data?.data)
  });

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
                <p className="element-directory-text">Elements</p>
            </div>
            <div className="elem-directory-icon">
                <IoChevronForwardSharp className="element-icon" />
            </div>
            <div className="element-directory">
                <p className="element-directory-text active">Elements Link</p>
            </div>
        </div>
        <div className="elem-body-container">
                <div className="back-button">
                    <Link to={`/`}>
                        <img src="/assets/icons/backIcon.svg" alt="backIcon"/>
                    </Link>
                </div>
                <div className="container-title">
                <h5>Elements Link</h5>
                </div>

                {
                    isLoading ? (
                        <>
                        <p>Loading Please wait</p>
                        </>
                    ):(
                        <div className="element-link-grid">
                        <div className="element-link-card">
                            <div className="link-title">
                                <p>
                            Element Name
                            </p>
                            </div>
                            <div className="link-description">
                                <p>
                                    {elementLinkData?.name}
                                </p>
                            </div>
                        </div>
                        <div className="element-link-card">
                            <div className="link-title">
                            Element Classification
                            </div>
                            <div className="link-description">
                                    <ElementLookupValues lookupId={Number(elementLinkData?.classificationId)} lookupValueId={Number(elementLinkData?.classificationValueId)}/>
                            </div>
                        </div>
                        <div className="element-link-card">
                            <div className="link-title">
                            Element Category
                            </div>
                            <div className="link-description">
                                    <ElementLookupValues lookupId={Number(elementLinkData?.categoryId)} lookupValueId={Number(elementLinkData?.categoryValueId)}/>
                            </div>
                        </div>
                        <div className="element-link-card">
                            <div className="link-title">
                            Pay Run
                            </div>
                            <div className="link-description">
                                <ElementLookupValues lookupId={Number(elementLinkData?.payRunId)} lookupValueId={Number(elementLinkData?.payRunValueId)} />
                            </div>
                        </div>
                        <div className="element-link-card">
                            <div className="link-title">
                            Description
                            </div>
                            <div className="link-description">
                                {elementLinkData?.description}
                            </div>
                        </div>
                        <div className="element-link-card">
                            <div className="link-title">
                            Reporting Name
                            </div>
                            <div className="link-description">
                                {elementLinkData?.reportingName}
                            </div>
                        </div>
                        <div className="element-link-card">
                            <div className="link-title">
                                Effective Start Date
                            </div>
                            <div className="link-description">
                                    {elementLinkData?.effectiveStartDate
}
                            </div>
                        </div>
                        <div className="element-link-card">
                            <div className="link-title">
                            Effective End Date
                            </div>
                            <div className="link-description">
                                {elementLinkData?.effectiveEndDate}
                            </div>
                        </div>
                        
                        <div className="element-link-card">
                            <div className="link-title">
                            Processing Type
                            </div>
                            <div className="link-description">
                                {elementLinkData?.processingType}
                            </div>
                        </div>
                        <div className="element-link-card">
                            <div className="link-title">
                            Pay Frequency
                            </div>
                            <div className="link-description">
                            {elementLinkData?.payFrequency}
                            </div>
                        </div>
                        <div className="element-link-card">
                            <div className="link-title">
                                Pay Months
                            </div>
                            <div className="link-description">
          {elementLinkData?.selectedMonths ? (
            elementLinkData.selectedMonths.map((item, index) => (
              <React.Fragment key={index}>
                {item}
                {index < elementLinkData.selectedMonths.length - 1 && ', '}
              </React.Fragment>
            ))
          ) : (
                <>
                    <p>
                    No pay month selected
                    </p>
                </>
          )}
        </div>
                        </div>
                        <div className="element-link-card">
                            <div className="link-title">
                                Prorate
                            </div>
                            <div className="link-description">
                                    {elementLinkData?.prorate}
                            </div>
                        </div>
                        <div className="element-link-card">
                            <div className="link-title">
                                Status
                            </div>
                            <div className="link-description">
                                    {elementLinkData?.status}
                            </div>
                        </div>
                        <div className="element-link-card">
                            <div className="link-title">
                           
                            </div>
                            <div className="link-description">
                           
                            </div>
                        </div>
                </div>
                    )
                }
                   
            <div className="elem-body-container">
        <div className="container-title">
          <h5>Elements Link</h5>
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
              Create Element Link
            </Button>
          </div>

         
        </div>
        <ElementCreateTable/>
      </div>
        </div>
         

            <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Create Element Link"
            ariaHideApp={false}
            >
            <h2 className="modal-title">Create Element</h2>
            <ElementLinkCreateForm closeModal={closeModal}/>
            </Modal>
    </div>
  )
}
