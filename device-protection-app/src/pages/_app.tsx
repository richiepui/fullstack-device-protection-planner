import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';

function MyApp({Component, pageProps}: AppProps){
  return(
    <Provider store={store}>
        <ChakraProvider>
          <Component {...pageProps}/>
        </ChakraProvider>
    </Provider>
  )
}

export default MyApp;