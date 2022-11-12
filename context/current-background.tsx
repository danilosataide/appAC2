import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BackgroundContext = createContext({});

export function CurrentBackgroundContext({children}) {
  const [currentBackground, setCurrentBackground] = useState(AsyncStorage.getItem('BACKGROUND').then());

  useEffect(() => {
    AsyncStorage.setItem('BACKGROUND', currentBackground).then();
  }, [currentBackground]);

  return(
    <BackgroundContext.Provider
      value={{
        currentBackground,
        setCurrentBackground,
      }}
    >
      { children }
    </BackgroundContext.Provider>

  )
}
