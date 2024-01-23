import {Route, Routes} from 'react-router-dom'
import {Element, ElementsLink} from '../pages'

export const Webroutes = () =>{
    return(
    <>
    <Routes>
        <Route index path="/" element={<Element/>} />
        <Route path="/elementslink/:id" element={<ElementsLink/>} />
    </Routes>
    </>
    )
}


