import React from "react";
import "../styles/ElemInput.scss";
import {Select} from '@chakra-ui/react'
import { useField, useFormikContext } from 'formik';
interface ElemInputInterface {
  Name: string;
  Placeholder: string;
  Value: string | number;
  Type?: string;
  Required: boolean;
  Disabled: boolean;
  OnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  OnBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  OnFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  LabelText?: string;
  ErrorText?: string | string[] | undefined;
}

interface ElemTextAreaInterface {
  Name: string;
  Placeholder: string;
  Value: string | number;
  Type?: string;
  Required: boolean;
  Disabled: boolean;
  OnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  OnBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  OnFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  LabelText?: string;
  ErrorText?: string | string[] | undefined;
}



  export interface ElemSelectOption {
    label: string;
    value: number | string;
  }


interface ElemSelectInterface<T extends ElemSelectOption = ElemSelectOption> {
  Name: string;
  Placeholder: string;
  Disabled: boolean;
  OnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  OnBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  OnFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  Value: string | number;
  LabelText?: string;
  ErrorText?: string | string[] | undefined;
  Options: Array<T>;
}

export const ElemInput = ({
  Name,
  Placeholder,
  Value,
  Type,
  Required,
  Disabled,
  OnChange,
  OnBlur,
  OnFocus,
  LabelText,
  ErrorText,
}: ElemInputInterface) => {
  return (
    <div className="elem-input-wrapper">
      {LabelText && (
        <label className="elem-input-label" htmlFor={Name}>
          {LabelText}
        </label>
      )}
      <input
        name={Name}
        id={Name}
        placeholder={Placeholder}
        value={Value}
        type={Type}
        required={Required}
        disabled={Disabled}
        onChange={OnChange}
        onBlur={OnBlur}
        onFocus={OnFocus}
        className="elem-input"
      />
      {ErrorText && (
        <p className="elem-input-error">
          {Array.isArray(ErrorText)
            ? ErrorText.map((error, index) => <span key={index}>{error}</span>)
            : ErrorText}
        </p>
      )}
    </div>
  );
};


export const ElemSelect = ({
  Name,
  Placeholder,
  Disabled,
  OnChange,
  OnBlur,
  OnFocus,
  LabelText,
  ErrorText,
  Options,
  Value,
}: ElemSelectInterface) => {
    const [field] = useField(Name);
  const formik = useFormikContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    OnChange(e);
    //@ts-ignore
    OnBlur({ ...field, target: { ...field.target, name: Name } } as React.FocusEvent<HTMLInputElement>);
    formik.setFieldTouched(Name, true, true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    OnBlur(e);
     //@ts-ignore
    OnBlur({ ...field, target: { ...field.target, name: Name } } as React.FocusEvent<HTMLInputElement>);
    formik.setFieldTouched(Name, true, true);
  };

  return (
    <div className="elem-input-wrapper">
      <label className="elem-input-label">{LabelText}</label>
      <Select
        name={Name}
        placeholder={Placeholder}
        disabled={Disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={OnFocus}
        aria-placeholder={Placeholder}
        value={Value || ''}
        borderRadius="4px"
        border="1px solid #E5E5E5"
        _placeholder={{
          color: "#818DA9",
          fontSize: "16px",
          fontWeight: "500",
          textAlign: "left",
        }}
        height="58px"
      >
        {Options.map((option, index) => (
          <option key={index} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </Select>
      {ErrorText && (
        <p className="elem-input-error">
          {Array.isArray(ErrorText)
            ? ErrorText.map((error, index) => <span key={index}>{error}</span>)
            : ErrorText}
        </p>
      )}
    </div>
  );
};

export const ElemTextArea = ({
  Name,
  Placeholder,
  Value,
  Required,
  Disabled,
  OnChange,
  OnBlur,
  OnFocus,
  LabelText,
  ErrorText,
}: ElemTextAreaInterface) => {
  return (
    <div className="elem-input-wrapper">
      {LabelText && (
        <label className="elem-input-label" htmlFor={Name}>
          {LabelText}
        </label>
      )}
      <textarea
        name={Name}
        id={Name}
        placeholder={Placeholder}
        value={Value}
        required={Required}
        disabled={Disabled}
        onChange={OnChange}
        onBlur={OnBlur}
        onFocus={OnFocus}
        className="elem-input"
        
      />
      {ErrorText && (
        <p className="elem-input-error">
          {Array.isArray(ErrorText)
            ? ErrorText.map((error, index) => <span key={index}>{error}</span>)
            : ErrorText}
        </p>
      )}
    </div>
  );
};
