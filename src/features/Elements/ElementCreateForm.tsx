import { Box } from "@chakra-ui/react";
import {ElemForm1} from './ElemForm1'
import {ElemForm2} from './ElemForm2'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, Heading } from "@chakra-ui/react";

import { selectCreateElementValues, setCreateElementValues } from '../../store/createElement/createElementSlice';
// @ts-ignore
import { Step, Steps, useSteps } from "chakra-ui-steps";


export const ElementCreateForm = () => {
    const dispatch = useDispatch();
    const createElementValues = useSelector(selectCreateElementValues)


    const {activeStep, nextStep, prevStep} = useSteps({initialStep: 0});

    const handleNext = (values) =>{
        dispatch(setCreateElementValues(values));
        nextStep();
    }

    const handlePrev = (values) =>{
        dispatch(setCreateElementValues(values));
    }

  return (
  <Box>
    <Steps activeStep={activeStep}>
        <Step label="Element Details">
          <ElemForm1 initialValues={createElementValues} handleNext={handleNext} />  
        </Step>
        <Step label="Additional Details" >
            <ElemForm2 initialValues={createElementValues} handlePrev={handlePrev} previousStep={prevStep}/>
        </Step>
    </Steps>
  </Box>

);
};