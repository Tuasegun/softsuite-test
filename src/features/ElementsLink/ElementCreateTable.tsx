import DataTable from 'react-data-table-component';
import {ElementLinkInterface} from '../../constants'
import {ElementLookupValues, SubOrganizationValue, DepartmentValue} from '../../utils'
import {Flex, Box} from '@chakra-ui/react'
import { RiEdit2Line } from "react-icons/ri";
import "../../styles/ElemTable.scss";
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useFetchElementLinksQuery} from '../../store/createElement'                                                  
export const ElementCreateTable = () => {
  const {id: linkId} = useParams()
  const {data} = useFetchElementLinksQuery(linkId)

  
    const customStyles = {
        rows: {
          style: {
            maxHeight: '52px', // override the row height
          }
        },
        headCells: {
          style: {
            paddingLeft: '15px', // override the cell padding for head cells
            paddingRight: '15px',
            backgroundColor: '#2D416F',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 500,
            fontFamily: 'Gilroy',
          },
        },
        cells: {
          style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            fontSize: '14px',
            paddingTop: '8px',
            paddingBottom: '8px',
            fontWeight: 400,
            fontFamily: 'Gilroy',
            color: '#2D416F',
          },
        },
    }

    const columns = [
        {
            name: 'Name',
            selector: (row: ElementLinkInterface) => row?.name.toString()
        },
        {
            name: 'Sub-Organization',
            selector: (row: ElementLinkInterface) => <SubOrganizationValue id={row.suborganizationId} />
        },
        {
            name: 'Department',
            selector: (row: ElementLinkInterface) => <DepartmentValue suborganizationId={row.suborganizationId} id={row.departmentId} />
        },
        {
      name: 'Employee Category',
      cell: ({ employeeCategoryId, employeeCategoryValueId }: ElementLinkInterface) => (
        <ElementLookupValues
          lookupId={employeeCategoryId}
          lookupValueId={employeeCategoryValueId}
        />
      ),
    },
        {
            name: 'Amount',
            selector: (row: ElementLinkInterface) => row.amount,
        },
        {
            name: 'Details',
            selector: () => <Link to={''}>View Details</Link>
        },
        {
            name: 'Action',
            cell: () => {
            
                return(
                        <Box
                        >
                                <Flex alignItems="center" justifySelf={"center"}>
                                <div className="pop-item">
                                        <RiEdit2Line/>
                                    </div>
                                    <div className="pop-item delete">
                                    <img src="/assets/icons/Delete.svg" alt="vertical-menu" />         
                                    </div>
                                </Flex>
                        </Box>

                )
            }
        }
    ]

  return (
    <div>
    <DataTable
            // @ts-ignore
            columns={columns}
            pagination
            responsive
            // @ts-ignore
            data={data && data?.data?.content}
            customStyles={customStyles}
            // progressPending={isLoading}
          />

    </div>
  )
}
