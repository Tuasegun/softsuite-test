import './App.css'
import { Webroutes } from './routes/webroutes'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
//@ts-expect-error chakra-ui-steps does not have a ts version
import { StepsTheme as Steps } from "chakra-ui-steps";
import {Provider} from 'react-redux'
import store from './store/store'
const theme = extendTheme({
  components: {
    Steps,
    Radio:{
      baseStyle:{
        control:{
          borderColor: '#4BAA79',
          _checked:{
            bg: '#4BAA79',
            borderColor: '#4BAA79'
          }
        },
        label:{
          fontFamily: 'Gilroy',
          fontSize: '16px',
          fontWeight: 400
        }
      }
    },
    Switch:{
      baseStyle:{
        track:{
          bg: 'red',
          _checked:{
            bg: '#4BAA79'
          }
        },
        thumb:{
          bg: '#fff'
        }
      }
    },
    }

      })

function App() {
  return (
    <>
    <Provider store={store}>
    <ChakraProvider theme={theme}>
     <Webroutes/>
    </ChakraProvider>
    </Provider>
    </>
  )
}

export default App
