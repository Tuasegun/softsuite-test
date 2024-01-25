export interface ElementLinkInterface {
    name: string;
    elementId: number;
    suborganizationId: number;
    locationId: number;
    departmentId: number;
    employeeCategoryId: number;
    employeeCategoryValueId: number;
    employeeTypeId: number;
    employeeTypeValueId: number;
    jobTitleId: number;
    grade: number;
    gradeStep: number;
    unionId: number;
    amountType: string;
    amount: number;
    rate: number;
    effectiveStartDate: string;
    effectiveEndDate: string;
    status: string;
    automate: string;
    additionalInfo: {
      lookupId: number;
      lookupValueId: number;
    }[];
  }
  
  // Initial values for ElementLink
  export const ElementLinkInitialValues: ElementLinkInterface = {
    name: '',
    elementId: 0,
    suborganizationId: 0,
    locationId: 0,
    departmentId: 0,
    employeeCategoryId: 0,
    employeeCategoryValueId: 0,
    employeeTypeId: 0,
    employeeTypeValueId: 0,
    jobTitleId: 0,
    grade: 0,
    gradeStep: 0,
    unionId: 0,
    amountType: '',
    amount: 0,
    rate: 0,
    effectiveStartDate: '',
    effectiveEndDate: '',
    status: '',
    automate: '',
    additionalInfo: [],
  };
  
  