import { Box } from "@chakra-ui/react";
import {ElemLinkForm1} from './ElemLinkForm1'
import {ElemLinkForm2} from './ElemLinkForm2'
import {ElemLinkForm3} from './ElemLinkForm3'
import { useDispatch, useSelector } from 'react-redux';
import { selectElementLinkValues, setElementLinkValues } from '../../store/createElement/elementLinkSlice';
// @ts-ignore
import { Step, Steps, useSteps } from "chakra-ui-steps";
import {ElementLinkInterface} from '../../constants'

interface ElementLinkCreateFormProps {
  closeModal: () => void;
}

export const ElementLinkCreateForm = ({closeModal}: ElementLinkCreateFormProps) => {
    const dispatch = useDispatch();
    const elementLinkValues = useSelector(selectElementLinkValues)
    const {activeStep, nextStep, prevStep} = useSteps({initialStep: 0});

    const handleNext = (values: ElementLinkInterface) =>{
        dispatch(setElementLinkValues(values));
        nextStep();
    }

    // const handlePrev = (values: ElementLinkInterface) =>{
    //     dispatch(setElementLinkValues(values));
    //     prevStep()
    // }

  return (
    <Box>
    <Steps variant="circles-alt"  activeStep={activeStep} >
        <Step label="Staff Details" fontSize="16px" colorScheme="#4BAA79">
          <ElemLinkForm1 closeModal={closeModal} handleNext={handleNext} initialValues={elementLinkValues} />  
        </Step>
        <Step label="Additional Details" >
            <ElemLinkForm2 initialValues={elementLinkValues} handleNext={handleNext} prevButton={prevStep}   />
        </Step>
        <Step label="Processing Information">
        <ElemLinkForm3 prevButton={prevStep} initialValues={elementLinkValues} /> 
        </Step> 
    </Steps>
  </Box>

);
};