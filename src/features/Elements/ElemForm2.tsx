import React, {useState} from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {ElemInput} from '../../components'
import {CreateElementValuesInterface} from '../../constants'
import {RadioGroup, Radio, Stack, FormControl, FormLabel, Switch} from '@chakra-ui/react'
import "../../styles/ElemLayout.scss";
import Select from 'react-select';
import {months} from '../../constants'
import {useCreateElementMutation} from '../../store/createElement'

interface ElemForm2Props {
    handlePrev: (values: CreateElementValuesInterface)=>void;
    initialValues: CreateElementValuesInterface;
    previousStep: ()=> void;
}

export const ElemForm2 = ({handlePrev, initialValues, previousStep}: ElemForm2Props) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [apiCall, isLoading] = useCreateElementMutation();
  return (
    <div>
    <Formik
    initialValues={initialValues}
    validationSchema={Yup.object({
        effectiveStartDate: Yup.date().required('Please input an effective start date'),
        effectiveEndDate: Yup.date().required('Please input an effective end date'),
        // processingType: Yup.string().required('Please select a processing type'),
        // payFrequency: Yup.string().required('Please select a pay frequency'),
        // selectedMonths: Yup.array().required('Please select months'),
        // prorate: Yup.string().required('Please select a prorate'),
    })}
    onSubmit={(values) => {
        console.log("here")
        apiCall(values).unwrap().then((result)=>{
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        })
        // alert(JSON.stringify(values))
        handlePrev(values);
    }}
    >
    {(formik)=>(
        <Form
            onSubmit={(event)=>{
                event.preventDefault();
                formik.handleSubmit();
            }}            
        >
            <div className="form-row">
                {/* startdate */}
                <ElemInput
                    Name="effectiveStartDate"
                    Placeholder="Select Date"
                    Value={formik.values.effectiveStartDate}
                    Type="date"
                    Required={true}
                    Disabled={false}
                    OnChange={formik.handleChange}
                    OnBlur={formik.handleBlur}
                    LabelText="Effective Start Date"
                    ErrorText={formik?.errors?.effectiveStartDate}
                />

                {/* endDate */}
                <ElemInput
                    Name="effectiveEndDate"
                    Placeholder="Select Date"
                    Value={formik.values.effectiveEndDate}
                    Type="date"
                    Required={true}
                    Disabled={false}
                    OnChange={formik.handleChange}
                    OnBlur={formik.handleBlur}
                    LabelText="Effective End Date"
                    ErrorText={formik?.errors?.effectiveEndDate}
                    />

            </div>
          
          <div className="form-row">
            <div className="radio-container"
            
            >
                <div className="radio-label">Processing Type</div>
                <RadioGroup
                border="1px solid #DADADA"
                width="full"
                py="17.5px"
                pl="8px"
                rounded="4px"
                defaultValue={formik.values.processingType || 'Open'}
                name="processingType"
                onChange={(e)=>{
                    formik.handleChange(
                        formik.setFieldValue('processingType', e)
                    );

                }}
                onBlur={formik.handleBlur}
                >
                    <Stack direction="row">
                    <Radio value="Open">Open</Radio>
                    <Radio value="Closed">Closed</Radio>
                    </Stack>
                </RadioGroup>
                {
                    formik.touched.processingType && formik.errors.processingType ? (
                        <div className="elem-input-error">
                            {formik.errors.processingType}
                        </div>
                    ): null
                }
            </div>

            <div className="radio-container"
           
            >
                <div className="radio-label">Pay Frequency</div>
                <RadioGroup
                border="1px solid #DADADA"
                width="full"
                py="17.5px"
                pl="8px"
                rounded="4px"
                defaultValue={ formik.values.payFrequency ||'Monthly'}
                name="payFrequency"
                onChange={(e) => {
                    setTimeout(() => {
                      formik.setFieldValue('payFrequency', e);
                      if (e === "Monthly") {
                        setIsDisabled(true);
                        console.log(e);
                      } else {
                        setIsDisabled(false);
                        console.log(e);
                        console.log("isNotDisabled");
                      }
                    });
                  }}
                onBlur={formik.handleBlur}

                >
                    <Stack direction="row">
                    <Radio value="Monthly"   
                    >Monthly</Radio>
                    <Radio value="Selected Months"
                  
                    >Selected Months</Radio>
                    </Stack>
                </RadioGroup>
                {
                    formik.touched.payFrequency && formik.errors.payFrequency ? (
                        <div className="elem-input-error">
                            {formik.errors.payFrequency}
                        </div>
                    ): null
                }
            </div>
          </div>
          
          <div className="form-row">
            <div className="select-container">
            <Select  
            options={months}
            placeholder="Select Months"
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
            defaultValue={[months[0], months[1], months[2]]}
            name="selectedMonths"
            onChange={(e)=>{
                formik.setFieldValue('selectedMonths', e.map((item) => item.value))
            }}
            onBlur={formik.handleBlur}
            isDisabled={isDisabled}
           />
              {
                      formik.touched.selectedMonths && formik.errors.selectedMonths ? (
                            <div className="elem-input-error">
                             {formik.errors.selectedMonths}
                            </div>
                      ): null
                 }
            </div>

          </div>

          <div className="form-row">
            <div className="radio-container"
            
            >
                <div className="radio-label">Prorate</div>
                <RadioGroup
                border="1px solid #DADADA"
                width="full"
                py="17.5px"
                pl="8px"
                rounded="4px"
                defaultValue={ formik.values.prorate ||'Yes'}
                name="prorate"
                onChange={(e) =>{
                    formik.handleChange(
                        formik.setFieldValue('prorate', e)
                    )
                }}
                onBlur={formik.handleBlur}
                >
                    <Stack direction="row">
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                    </Stack>
                </RadioGroup>
            </div>

            <div className="radio-container">
                <div className="radio-label">Status</div>
                <FormControl display="flex" alignItems="center" columnGap={"15px"}
                border="1px solid #DADADA"
                width="full"
                py="17.5px"
                pl="8px"
                rounded="4px"
                >
                    <Switch id="status" 
                    name="status"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    
                    />
                    <FormLabel htmlFor="status" mb="0">
                    {
                        formik.values.status ? 'Active' : 'Inactive'
                    }
                    </FormLabel>
                </FormControl>
            </div>
          </div>

      

            <div className="prev-button">
                <button type="button" onClick={previousStep}>Prev</button>
            </div>
            <div className="next-button">
                <button type="submit"
                   
                >Submit</button>
            </div>
        </Form>
    )}
    </Formik>

</div>
  )
}
