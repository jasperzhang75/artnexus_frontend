import  { createContext, useState, useContext } from 'react';

const BackgroundColorContext = createContext();

export const useBackgroundColor = () => {
  return useContext(BackgroundColorContext);
};

export const BackgroundColorProvider = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState('');

  return (
    <BackgroundColorContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      <div style={{ backgroundColor: backgroundColor, minHeight: '100vh' }}>
        {children}
      </div>
    </BackgroundColorContext.Provider>
  );
};