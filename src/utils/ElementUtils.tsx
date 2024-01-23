import { useFetchCategoryAndClassificationQuery } from "../store/createElement";

export interface lookUps{
    lookupId: number;
    lookupValueId: number;
}

export const ElementLookupValues = ({
    lookupId,
    lookupValueId,
}: lookUps) => {
    const {data} = useFetchCategoryAndClassificationQuery({
        lookupId,
        lookupValueId,
    });
    return data?.name
}

export const convertTimestamp = (timestamp: string): string => {
    const inputDate = new Date(timestamp);
  
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
  
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
  
    const formattedDate = inputDate.toLocaleDateString(undefined, dateOptions);
    const formattedTime = inputDate.toLocaleTimeString(undefined, timeOptions);
  
    return `${formattedDate} || ${formattedTime}`;
  };
