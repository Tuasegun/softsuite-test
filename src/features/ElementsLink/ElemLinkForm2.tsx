import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  ElemSelect,
} from "../../components";
import { useFetchLookUpMutation} from "../../store/createElement";
import { lookupValuesInt } from "../Elements";
import { useFetchGradeMutation, useFetchGradeStepMutation } from "../../store/createElement";
import { ElementLinkInterface } from "../../constants";
interface ElementLinkForm2Props{
  handleNext: (values: ElementLinkInterface) => void;
  initialValues: ElementLinkInterface;
  prevButton: () => void;
}
interface lookObject{
  id?: number;
  lookupId?: number;
  name?: string;
  label?: string;
  value?: number;
}

export const ElemLinkForm2 = ({handleNext, initialValues, prevButton}:ElementLinkForm2Props) => {
  const [gradeOptions, setGradeOptions] = useState<lookupValuesInt[]>([]);
  const [gradeStepOptions, setGradeStepOptions] = useState<lookupValuesInt[]>([]);
  const [gradeData, { isLoading: gradeLoading }] = useFetchGradeMutation();
  const [gradeStepData] = useFetchGradeStepMutation();
  const [gradeId, setGradeId] = useState<number>(0);
  const [unionOptions, setUnionOptions] = useState<lookupValuesInt[]>([]);
  const [lookupData, { isLoading: lookupLoading }] = useFetchLookUpMutation();
  const [housingOptions, setHousingOptions] = useState<lookupValuesInt[]>([]);
  const [wardrobeOptions, setWardrobeOptions] = useState<lookupValuesInt[]>([]);
  const [securityOptions, setSecurityOptions] = useState<lookupValuesInt[]>([]);
  const fetchGrade = () => {
    if (!gradeLoading) {
      gradeData("arg").unwrap().then((result) => {
          const options = result?.data?.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
          setGradeOptions(options);
        })
        .catch((error) => {
          console.error("Error fetching grade:", error);
        });
    }
  };
  const handleOptions = (lookupValues: lookupValuesInt[]) => {
    const transformedOptions = lookupValues.map((item: lookObject) => ({
      label: item.name,
      value: item.id,
      lookupId: item.lookupId,
    }));
    return transformedOptions;
  }

  const fetchLookUp = (id: number, setOptions: (options: lookupValuesInt[]) => void) => {
    if (!lookupLoading) {
      lookupData(id)
        .unwrap()
        .then((result) => {
          const options = handleOptions(result);
          //@ts-ignore
          setOptions(options);
        })
        .catch((error) => {
          console.error(`Error fetching lookup values for id ${id}:`, error);
        });
    }
  }
  
  const handleGradeChange = (event: any, formik: any) => {
      setGradeId(event.target.value);
      formik.setFieldValue("grade", event.target.value);
  }
  
  

  useEffect(() => {
    fetchGrade();
    fetchLookUp(8, setUnionOptions);
    fetchLookUp(9, setHousingOptions);
    fetchLookUp(10, setWardrobeOptions);
    fetchLookUp(11, setSecurityOptions);
  },[])

  useEffect(() => {
    if(gradeId){
      gradeStepData(gradeId).unwrap().then((result) => {
        const options = result?.data?.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
        setGradeStepOptions(options);
      }).catch((error: Error) => {
        console.error("Error fetching grade step:", error);
      });
    }else{
      setGradeStepOptions([]);
    }
  }, [gradeId, gradeStepData])





  return (
    <div>
      <Formik
        onSubmit={(values: ElementLinkInterface) => {
          handleNext(values);
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={Yup.object({
          grade: Yup.number().required("Grade Required"),
          gradeStep: Yup.number().required("Grade Step Required"),
          additionalInfo: Yup.array().of(
            Yup.object().shape({
              lookupId: Yup.number().required("Required"),
            })
          ),
        })}
        initialValues={initialValues}
      >
        {(formik)=>(
          <Form
            onSubmit={(event)=>{
              event.preventDefault();
              formik.handleSubmit();
            }}
          >
            <div className="form-row top-spacer">
              <ElemSelect
              Name="grade"
              Placeholder="Select Grade"
              Value={formik.values.grade}
              OnChange={(e)=> handleGradeChange(e, formik)}
              OnBlur={formik.handleBlur}
              LabelText="Grade"
              ErrorText={formik?.errors?.grade}
              Options={gradeOptions}
              Disabled={false}
              />
              <ElemSelect
              Name="gradeStep"
              Placeholder="Select Grade Step"
              Value={formik.values.gradeStep}
              OnChange={formik.handleChange}
              OnBlur={formik.handleBlur}
              LabelText="Grade Step"
              ErrorText={formik?.errors?.gradeStep}
              Options={gradeStepOptions}
              Disabled={formik.values.grade ? false : true}
              />
            </div>
            <div className="form-row">
              <ElemSelect 
              Name="unionId"
              Placeholder="Select Union"
              Value={formik.values.unionId}
              OnChange={formik.handleChange}
              OnBlur={formik.handleBlur}
              LabelText="Union"
              ErrorText={formik?.errors?.unionId}
              Options={unionOptions}
              Disabled={false}
              />
            </div>  
            <div className="additional-info-container">
              {/* additional info with 3 select named Housing, wardrobe and security */}
              <div className="additional-info">
                <div className="additional-info-title">
                  <h5>Additional Information</h5>
                </div>
                <div className="additional-info-content">
                  <div className="additional-info-row">
                    <ElemSelect 
                    Name="housing"
                    Placeholder="Select Housing"
                    Value={formik.values.additionalInfo[0]?.lookupId} 
                    OnChange={formik.handleChange}
                    OnBlur={formik.handleBlur}
                    LabelText="Housing"
                    ErrorText={""}
                    Options={housingOptions}
                    Disabled={false}
                    />
                    <ElemSelect 
                    Name="wardrobe"
                    Placeholder="Select Wardrobe"
                    Value={formik.values.additionalInfo[1]?.lookupId}
                    OnChange={formik.handleChange}
                    OnBlur={formik.handleBlur}
                    LabelText="Wardrobe"
                    ErrorText={""}
                    Options={wardrobeOptions}
                    Disabled={false}
                    />
                    <ElemSelect 
                    Name="additionalInfo"
                    Placeholder="Select Security"
                    Value={formik.values.additionalInfo[2]?.lookupId}
                    OnChange={formik.handleChange}
                    OnBlur={formik.handleBlur}
                    LabelText="Security"
                    ErrorText={""}
                    Options={securityOptions}
                    Disabled={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="button-container">
            <div className="cancel-button">
              <button type="button" onClick={prevButton}>Previous</button>
            </div>
            <div className="submit-button">
              <button type="submit">Next</button>
            </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
