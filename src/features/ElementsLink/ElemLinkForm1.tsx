import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  ElemInput,
  ElemSelect,
  ElemSelectOption,
} from "../../components";
import {
  ElementLinkInterface,
} from "../../constants";
import "../../styles/ElemLayout.scss";
import { useFetchLookUpMutation} from "../../store/createElement";
import {
  useFetchSubOrganizationMutation,
  useFetchDepartmentQueryMutation,
} from "../../store/createElement";
import { lookupValuesInt } from "../Elements";
interface ElementLinkForm1Props{
  handleNext: (values: ElementLinkInterface) => void;
  initialValues: ElementLinkInterface;
  closeModal: () => void;
}
interface lookObject{
  id?: number;
  lookupId?: number;
  name?: string;
  label?: string;
  value?: number;
}

export const ElemLinkForm1 = ({handleNext, initialValues, closeModal}: ElementLinkForm1Props) => {
  const [jobTitleOptions, setJobTitleOptions] = useState<lookupValuesInt[]>([]);
  const [locationOptions, setLocationOptions] = useState<lookupValuesInt[]>([]);
  const [employeeTypeOptions, setEmployeeTypeOptions] = useState<
    lookupValuesInt[]
  >([]);
  const [employeeCategoryOptions, setEmployeeCategoryOptions] = useState<
    lookupValuesInt[]
  >([]);
  const [subOrgData, { isLoading: subOrgLoading }] =
    useFetchSubOrganizationMutation();
  const [lookupData] = useFetchLookUpMutation();
  const [subOrgOptions, setSubOrgOptions] = useState<ElemSelectOption[]>([]);
  const [subOrgId, setSubOrgId] = useState<number>(0);
  const [departmentData] =
    useFetchDepartmentQueryMutation();
  const [departmentOptions, setDepartmentOptions] = useState<
    ElemSelectOption[]
  >([]);
  const fetchSubOrg = () => {
    if (!subOrgLoading) {
      subOrgData("arg")
        .unwrap()
        .then((result) => {
          const options = result?.data?.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
          setSubOrgOptions(options);
        });
    }
  };
  const handleSubOrgChange = (event: any, formik: any) => {
    setSubOrgId(event.target.value);
    formik.setFieldValue("suborganizationId", event.target.value);
  };

  const handleOptions = (lookupValues: lookupValuesInt[]) => {
    const transformedOptions = lookupValues.map((item: lookObject) => ({
      label: item?.name,
      value: item?.id,
      lookupId: item?.lookupId,
    }));
    return transformedOptions;
  };

  const handleEmployeeCategoryChange = (selectedId: number, formik: any) => {
    const selectedOption = employeeCategoryOptions.find(
      (option: lookupValuesInt) => option.value == selectedId
    );
    formik.setFieldValue("employeeCategoryId", selectedOption?.value);
    formik.setFieldValue("employeeCategoryValueId", selectedOption?.lookupId);
  }

  const handleEmployeeTypeChange = (selectedId: number, formik: any) => {
    const selectedOption = employeeTypeOptions.find(
      (option: lookupValuesInt) => option.value == selectedId
    );
    formik.setFieldValue("employeeTypeId", selectedOption?.value);
    formik.setFieldValue("employeeTypeValueId", selectedOption?.lookupId);
  }


  const fetchLookupValues = (
    id: number,
    setOptions: (options: lookupValuesInt[]) => void
  ) => {
    lookupData(id)
      .unwrap()
      .then((result: lookupValuesInt[]) => {
        console.log(result);
        const options = handleOptions(result);
        //@ts-ignore
        setOptions(options);
      })
      .catch((error: Error) => {
        console.error(`Error fetching lookup values for id ${id}:`, error);
      }); 
  };

  useEffect(() => {
    fetchSubOrg();
    fetchLookupValues(3, setEmployeeCategoryOptions);
    fetchLookupValues(4, setEmployeeTypeOptions);
    fetchLookupValues(6, setJobTitleOptions);
    fetchLookupValues(7, setLocationOptions);
    console.log(employeeCategoryOptions);
  }, []);

  useEffect(() => {
    if (subOrgId) {
      console.log(subOrgId);
      departmentData(subOrgId)
        .unwrap()
        .then((result) => {
          const options = result?.data?.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
          setDepartmentOptions(options);
        });
    } else {
      return;
    }
  }, [subOrgId, departmentData]);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required("Name Required"),
          suborganizationId: Yup.number().required("Sub Organization Required"),
        })}
        onSubmit={(values) => {
          console.log(values);
          handleNext(values);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(formik) => (
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              formik.handleSubmit();
            }}
          >
            <div className="form-row top-spacer">
              <ElemInput
                Name="name"
                Placeholder="Name"
                Value={formik.values.name}
                Type="text"
                Required={true}
                Disabled={false}
                OnChange={formik.handleChange}
                OnBlur={formik.handleBlur}
                LabelText="Name"
                ErrorText={formik?.errors?.name}
              />
            </div>
            <div className="form-row">
              <ElemSelect
                Name="suborganizationId"
                Placeholder="Select Sub Organization"
                Options={subOrgOptions}
                Disabled={false}
                OnChange={(event: any) => handleSubOrgChange(event, formik)}
                Value={formik.values.suborganizationId}
                OnBlur={formik.handleBlur}
                LabelText="Sub Organization"
                ErrorText={formik?.errors?.suborganizationId}
              />
              <ElemSelect
                Name="departmentId"
                Placeholder="Select Department"
                Options={departmentOptions}
                Disabled={formik.values.suborganizationId ? false : true}
                OnChange={formik.handleChange}
                Value={formik.values.departmentId}
                OnBlur={formik.handleBlur}
                LabelText="Department"
                ErrorText={formik?.errors?.departmentId}
              />
            </div>
            <div className="form-row">
              <ElemSelect
                Name="jobTitleId"
                Placeholder="Select Job Title"
                Options={jobTitleOptions}
                Disabled={false}
                OnChange={formik.handleChange}
                Value={formik.values.jobTitleId}
                OnBlur={formik.handleBlur}
                LabelText="Job Title"
                ErrorText={formik?.errors?.jobTitleId}
              />
              <ElemSelect
                Name="locationId"
                Placeholder="Select Location"
                Options={locationOptions}
                Disabled={false}
                OnChange={formik.handleChange}
                Value={formik.values.locationId}
                OnBlur={formik.handleBlur}
                LabelText="Location"
                ErrorText={formik?.errors?.locationId}
              />
            </div>
            <div className="form-row">
              <ElemSelect
                Name="employeeTypeId"
                Placeholder="Select Employee Type"
                Options={employeeTypeOptions}
                Disabled={false}
                OnChange={(e)=> handleEmployeeTypeChange(Number(e.target.value), formik)}
                Value={formik.values.employeeTypeId}
                OnBlur={formik.handleBlur}
                LabelText="Employee Type"
                ErrorText={formik?.errors?.employeeTypeId}
              />
              <ElemSelect
                Name="employeeCategoryId"
                Placeholder="Select Employee Category"
                Options={employeeCategoryOptions}
                Disabled={false}
                OnChange={(e)=> handleEmployeeCategoryChange(Number(e.target.value), formik)}
                Value={formik.values.employeeCategoryId}
                OnBlur={formik.handleBlur}
                LabelText="Employee Category"
                ErrorText={formik?.errors?.employeeCategoryId}
              />
            </div>
            <div className="button-container">
            <div className="cancel-button">
              <button type="button" onClick={closeModal}>Cancel</button>
            </div>
            <div className="submit-button">
              <button type="submit">Next</button>
            </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
