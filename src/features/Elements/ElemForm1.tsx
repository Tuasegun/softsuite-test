import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ElemInput, ElemSelect, ElemTextArea } from "../../components";
import { CreateElementValuesInterface } from "../../constants";
import "../../styles/ElemLayout.scss";
import { useDispatch } from "react-redux";
import { fetchLookupValues } from "../../store/lookups/lookupsSlice";
interface ElemForm1Props {
  handleNext: (values: CreateElementValuesInterface) => void;
  initialValues: CreateElementValuesInterface;
  closeModal: () => void;
}
export interface lookupValuesInt {
  label: string;
  value: number;
  lookupId: number;
}
interface FormikType {
  setFieldValue: (field: string, value: number) => void;
}

export const ElemForm1 = ({ handleNext, initialValues, closeModal }: ElemForm1Props) => {
  const dispatch = useDispatch();
  // const lookupValues = useSelector(selectLookupValues);
  const [classificationOptions, setClassificationOptions] = useState<
    lookupValuesInt[]
  >([]);
  const [categoryOptions, setCategoryOptions] = useState<lookupValuesInt[]>([]);
  const [payRunOptions, setPayRunOptions] = useState<lookupValuesInt[]>([]);

  const handleOptions = (lookupValues: lookupValuesInt[]) => {
    const transformedOptions = lookupValues.map((item: lookupValuesInt) => ({
      label: item.label,
      value: item.value,
      lookupId: item.lookupId,
    }));
    return transformedOptions;
  };

  useEffect(() => {
    const fetchOptions = (
      id: number,
      setOptions: (options: lookupValuesInt[]) => void
    ) => {
      //@ts-expect-error thunk is any
      dispatch(fetchLookupValues(id))
        .unwrap()
        .then((result: lookupValuesInt[]) => {
          const options = handleOptions(result);
          setOptions(options);
        })
        .catch((error: Error) => {
          console.error(`Error fetching lookup values for id ${id}:`, error);
        });
    };
    fetchOptions(2, setClassificationOptions);
    fetchOptions(1, setCategoryOptions);
    fetchOptions(5, setPayRunOptions);
  }, [dispatch]);

  const handleClassificationChange = (
    selectedId: number,
    formik: FormikType
  ) => {
    const selectedOption = classificationOptions.find(
      (option: lookupValuesInt) => option.value == selectedId
    );
    if (selectedOption) {
      formik.setFieldValue("classificationId", selectedOption.lookupId);
      formik.setFieldValue("classificationValueId", selectedOption.value);
    }
  };

  const handleCategoryChange = (selectedId: number, formik: FormikType) => {
    const selectedOption = categoryOptions.find(
      (option: lookupValuesInt) => option.value == selectedId
    );
    if (selectedOption) {
      formik.setFieldValue("categoryId", selectedOption.lookupId);
      formik.setFieldValue("categoryValueId", selectedOption.value);
    }
  };

  const handlePayRunChange = (selectedId: number, formik: FormikType) => {
    const selectedOption = payRunOptions.find(
      (option) => option.value == selectedId
    );

    if (selectedOption) {
      formik.setFieldValue("payRunId", selectedOption.lookupId);
      formik.setFieldValue("payRunValueId", selectedOption.value);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required("Name Required"),
          classificationValueId: Yup.number()
            .required("Classification Required")
            .typeError("Classification must be a number"),
          categoryValueId: Yup.number()
            .required("Category Required")
            .typeError("Category must be a number"),
          payRunValueId: Yup.number()
            .nullable()
            .required("Payrun Required")
            .typeError("Payrun must be a number"),
          description: Yup.string().required("Description Required"),
          reportingName: Yup.string().required("Reporting Name Required"),
        })}
        onSubmit={(values, { setFieldError }) => {
          if (
            values.categoryValueId === undefined ||
            values.categoryValueId === null ||
            values.categoryValueId === 0
          ) {
            setFieldError("categoryValueId", "Category Required");
          }
          if (
            values.payRunValueId === null ||
            values.payRunValueId === undefined ||
            values.payRunValueId === 0
          ) {
            setFieldError("payRunValueId", "Payrun Required");
          }
          if (
            values.classificationValueId === null ||
            values.classificationValueId === undefined ||
            values.classificationValueId === 0
          ) {
            setFieldError("classificationValueId", "Classification Required");
          }
          if (
            !values.categoryValueId ||
            !values.payRunValueId ||
            !values.classificationValueId
          ) {
            return;
          }
          handleNext(values);
        
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
              <ElemSelect
                Name={"classificationValueId"}
                Placeholder="Select Classification"
                Disabled={false}
                OnChange={(e) =>
                  handleClassificationChange(Number(e.target.value), formik)
                }
                OnBlur={formik.handleBlur}
                LabelText="Element Classification"
                ErrorText={
                  formik.touched.classificationValueId &&
                  formik.errors.classificationValueId
                    ? formik.errors.classificationValueId
                    : undefined
                }
                Options={classificationOptions}
                Value={formik.values.classificationValueId}
              />
            </div>
            <div className="form-row">
              <ElemSelect
                Name={"categoryValueId"}
                Placeholder="Select Category"
                Disabled={false}
                OnChange={(e) =>
                  handleCategoryChange(Number(e.target.value), formik)
                }
                OnBlur={formik.handleBlur}
                LabelText="Element Category"
                ErrorText={
                  formik.touched.categoryValueId &&
                  !!formik.errors.categoryValueId
                    ? formik.errors.categoryValueId
                    : undefined
                }
                Options={categoryOptions}
                Value={formik.values.categoryValueId || ""}
              />
              <ElemSelect
                Name={"payRunValueId"}
                Placeholder="Select Payrun"
                Disabled={false}
                OnChange={(e) =>
                  handlePayRunChange(Number(e.target.value), formik)
                }
                OnBlur={formik.handleBlur}
                LabelText="Element Payrun"
                ErrorText={
                  formik.errors.payRunValueId && formik.touched.payRunValueId
                    ? formik.errors.payRunValueId
                    : undefined
                }
                Options={payRunOptions}
                Value={formik.values.payRunValueId}
              />
            </div>

            <div className="form-row">
              <ElemTextArea
                Name="description"
                Placeholder="Description"
                Value={formik.values.description}
                Required={true}
                Disabled={false}
                OnChange={formik.handleChange}
                OnBlur={formik.handleBlur}
                LabelText="Description"
                ErrorText={formik.errors.description}
              />
            </div>
            <div className="form-row">
              <ElemTextArea
                Name="reportingName"
                Placeholder="Reporting Name"
                Value={formik.values.reportingName}
                Required={true}
                Disabled={false}
                OnChange={formik.handleChange}
                OnBlur={formik.handleBlur}
                LabelText="Reporting Name"
                ErrorText={formik.errors.reportingName}
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
