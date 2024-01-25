import {useEffect, useState} from 'react'
import DataTable from 'react-data-table-component';
import {useGetCreatedElementMutation} from '../../store/createElement'
import {CreateElementValuesInterface} from '../../constants'
import {ElementLookupValues, convertTimestamp} from '../../utils'
import {Popover, PopoverContent, Flex, Box, PopoverTrigger} from '@chakra-ui/react'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import "../../styles/ElemTable.scss";
import {useNavigate} from 'react-router-dom'

export const ElementCreateTable = () => {
    const [apiCall, isLoading] = useGetCreatedElementMutation()
    const [data, setData] = useState()
    const navigate = useNavigate()

    const fetchData =()=>{
      if(isLoading){
        const result = apiCall("arg").unwrap().then((result)=>{
            setData(result?.data?.content)  
        }).catch((error: Error)=>{
            console.log(error)
        })
        result
      }else{
        console.log("loading")
      }
    }
    
    useEffect(()=>{
        fetchData()
        console.log(data)
    },[])

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
            selector: (row: CreateElementValuesInterface) => row.name.toString()
        },
        {
            name: 'Element Category',
            selector: (row: CreateElementValuesInterface) => <ElementLookupValues lookupId={row.categoryId} lookupValueId={row.categoryValueId}/>
        },
        {
            name: 'Element Classification',
            selector: (row: CreateElementValuesInterface) => <ElementLookupValues lookupId={row.classificationId} lookupValueId={row.classificationValueId}/>
        },
        {
            name: 'Status',
            selector: (row: CreateElementValuesInterface) => row.status.toString()
        },
        {
            name: 'Date & Time Modified',
            selector: (row: CreateElementValuesInterface) => convertTimestamp(row?.createdAt.toString()),
        },
        {
            name: 'Modified By',
            selector: (row: CreateElementValuesInterface) => row.modifiedBy.toString(),
        },
        {
            name: 'Action',
            cell: (row: CreateElementValuesInterface) => {
            
                return(
                        <Box>
                            <Popover>
                            <PopoverTrigger>
                                <Flex>
                                    <img src="/assets/icons/table-menu.svg" alt="vertical-menu" />
                                </Flex>
                            </PopoverTrigger>
                         
                                <PopoverContent width="100%">
                                    <div className="popover-items">
                                    <div className="pop-item"
                                  onClick={() => navigate(`${row.id}/elementslink`)}
                                    >
                                        <MdOutlineRemoveRedEye/>
                                        <p>View ElementLinks</p>
                                    </div>
                                    <div className="pop-item">
                                        <RiEdit2Line/>
                                    <p>Edit Element</p>
                                    </div>
                                    <div className="pop-item delete">
                                    <img src="/assets/icons/Delete.svg" alt="vertical-menu" />
                                    <p>Delete</p>
                                    </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
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
            data={data || []}
            customStyles={customStyles}
            // progressPending={isLoading}
          />

    </div>
  )
}
