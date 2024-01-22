export interface CreateElementValuesInterface {
    name: string;
    description: string;
    payRunId: number;
    payRunValueId: number;
    classificationId: number;
    classificationValueId: number;
    categoryId: number;
    categoryValueId: number;
    reportingName: string;
    processingType: string;
    status: string;
    prorate: string;
    effectiveStartDate: string;
    effectiveEndDate: string;
    selectedMonths: string[];
    payFrequency: string;
    modifiedBy: string;
  }
  
  export const createElementInititalValues: CreateElementValuesInterface = {
    name: '',
    description: '',
    payRunId: 0,
    payRunValueId: 0,
    classificationId: 0,
    classificationValueId: 0,
    categoryId: 0,
    categoryValueId: 0,
    reportingName: '',
    processingType: 'Open',
    status: 'Active',
    prorate: 'Yes',
    effectiveStartDate: '',
    effectiveEndDate: '',
    selectedMonths: [],
    payFrequency: 'Monthly',
    modifiedBy: 'Segun'
  };