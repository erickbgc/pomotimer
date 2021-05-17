import React, { useContext } from 'react';
import Navigation from './screens/navigation';
import Context from './providers/ThemeContext';

const App = () => {

  return (
    <Context.Provider value={{ value: 'yellow' }}>
      <Navigation />
    </Context.Provider>
  );
}

export default App;