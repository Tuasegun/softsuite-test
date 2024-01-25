import { Box } from "@chakra-ui/react";
import {ElemForm1} from './ElemForm1'
import {ElemForm2} from './ElemForm2'
import { useDispatch, useSelector } from 'react-redux';
import { selectCreateElementValues, setCreateElementValues } from '../../store/createElement/createElementSlice';
// @ts-ignore
import { Step, Steps, useSteps } from "chakra-ui-steps";
import {CreateElementValuesInterface} from '../../constants'

interface ElementCreateFormProps {
  closeModal: () => void;
}

export const ElementCreateForm = ({closeModal}: ElementCreateFormProps) => {
    const dispatch = useDispatch();
    const createElementValues = useSelector(selectCreateElementValues)
    const {activeStep, nextStep, prevStep} = useSteps({initialStep: 0});

    const handleNext = (values: CreateElementValuesInterface) =>{
        dispatch(setCreateElementValues(values));
        nextStep();
    }

    const handlePrev = (values: CreateElementValuesInterface) =>{
        dispatch(setCreateElementValues(values));       
    }

  return (
  <Box>
    <Steps variant="circles-alt"  activeStep={activeStep} >
        <Step label="Element Details" fontSize="16px" colorScheme="#4BAA79" 
        >
          <ElemForm1 initialValues={createElementValues}  handleNext={handleNext} closeModal={closeModal} />  
        </Step>
        <Step label="Additional Details" >
            <ElemForm2 initialValues={createElementValues} handlePrev={handlePrev} previousStep={prevStep}/>
        </Step>
    </Steps>
  </Box>

);
};