import {Route, Routes} from 'react-router-dom'
import {Element} from '../pages'

export const Webroutes = () =>{
    return(
    <>
    <Routes>
        <Route index path="/" element={<Element/>} />
    </Routes>
    </>
    )
}


