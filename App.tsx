 import React from 'react';
 import 'react-native-gesture-handler';
 import { MainNavigationStack } from './src/MainNavigationStack'
 import { Provider } from 'mobx-react'
 import { store } from './src/Store/AppStore'
 import { ModuleBuilder } from './src/ModuleBuilder/ModuleBuilder'

//  const getMoviesFromApi = () => {
//   console.log('%c++[   here     ]','background: pink', );
//   fetch('https://reactnative.dev/movies.json')
//     .then((response) => response.json())
//     .then((json) => {
//       console.log('%c++[   here     ]','background: red', json);
//       return json.movies;
//     })
//     .catch((error) => {
//       console.error(error);
//     }).finally(() => {
//       console.log('%c++[   here     ]','background: red', );
//     })
// };

// getMoviesFromApi()


 const App = () => {
   
    new ModuleBuilder().buildCurrencyProvider()
   return (
     <Provider store={ store }>
        <MainNavigationStack />
     </Provider>
   );
 };

 export default App;
