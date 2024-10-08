import { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalStateContextProps {
  isAddTaskBarVisible: boolean;
  setAddTaskBarVisible: (visible: boolean) => void;
}

const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [isAddTaskBarVisible, setAddTaskBarVisible] = useState(false);

  return (
    <GlobalStateContext.Provider value={{ isAddTaskBarVisible, setAddTaskBarVisible }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};