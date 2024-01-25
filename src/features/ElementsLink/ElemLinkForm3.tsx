import { Formik, Form } from "formik";
import {
  ElemInput,
  ElemSelect,
} from "../../components";
import {
  ElementLinkInterface,
} from "../../constants";
import "../../styles/ElemLayout.scss";
import {RadioGroup, Radio, Stack, FormControl, FormLabel, Switch} from '@chakra-ui/react'
import { useCreateElementLinkMutation } from "../../store/createElement";
import {useParams} from 'react-router-dom'
interface ElementLinkForm3Props{
  initialValues: ElementLinkInterface;
  prevButton: () => void;
}
export const ElemLinkForm3 = ({initialValues, prevButton}: ElementLinkForm3Props) => {
  const [apiCall] = useCreateElementLinkMutation();
  const {id: elemId} = useParams<{id: string}>()
  return (
    <div>
      <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values)
        const data = {
          body: values,
          id: elemId
        }
        apiCall({data}).unwrap().then((result)=>{
          console.log(result)
          confirm("Element Link created successfully")
        }).catch((error)=>{
          console.log(error)
        })
      }}
      >
       {(formik)=>(
         <Form
         onSubmit={(event) => {
           event.preventDefault();
           formik.handleSubmit();
         }}
       >
         <div className="form-row top-spacer">
         <ElemSelect
          Name="amountType"
          LabelText="Amount Type"
          Placeholder="Select Amount Type"
          Value={formik.values.amountType}
          Options={[
            {label: "Fixed", value: "Fixed"},
            {label: "Rate", value: "Rate"}
          ]}
          Disabled={false}
          OnChange={formik.handleChange}
          OnBlur={formik.handleBlur}
          ErrorText={formik.errors.amountType}
          />
          {
            formik.values.amountType === "Fixed" ? (
              <ElemInput
              Name="amount"
              Placeholder="Amount"
              Value={formik.values.amount}
              Type="number"
              Required={true}
              Disabled={false}
              OnChange={formik.handleChange}
              OnBlur={formik.handleBlur}
              LabelText="Amount"
              ErrorText={formik?.errors?.amount}
              />
            ) : (
              <ElemInput
              Name="rate"
              Placeholder="Rate"
              Value={formik.values.rate}
              Type="number"
              Required={true}
              Disabled={false}
              OnChange={formik.handleChange}
              OnBlur={formik.handleBlur}
              LabelText="Rate"
              ErrorText={formik?.errors?.rate}
              />
            )
          }
         </div>
         <div className="form-row">
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
         <div className="radio-container">
               <div className="radio-label">Automate</div>
               <RadioGroup
               border="1px solid #DADADA"
               width="full"
               py="17.5px"
               pl="8px"
               rounded="4px"
               defaultValue={ formik.values.automate ||'Yes'}
               name="automate"
               onChange={(e) => {
                  formik.handleChange(
                      formik.setFieldValue('automate', e)
                  )  
              }} 
               onBlur={formik.handleBlur}

               >
                   <Stack direction="row">
                   <Radio value="Yes"   
                   >Yes</Radio>
                   <Radio value="No"
                 
                   >No</Radio>
                   </Stack>
               </RadioGroup>
               {
                   formik.touched.automate && formik.errors.automate ? (
                       <div className="elem-input-error">
                           {formik.errors.automate}
                       </div>
                   ): null
               }
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
                    value={formik.values.status ? 'Active' : 'Inactive'}
                    />
                    <FormLabel htmlFor="status" mb="0">
                    {
                        formik.values.status ? 'Active' : 'Inactive'
                    }
                    </FormLabel>
                </FormControl>
            </div>
         </div>
       
         <div className="button-container">
            <div className="cancel-button">
                <button type="button" onClick={prevButton}>Back</button>
            </div>
            <div className="submit-button">
                <button type="submit"
                >Create a New Element Link</button>
            </div>
            </div>
       </Form>
       )}
      </Formik>
    </div>
  )
}
