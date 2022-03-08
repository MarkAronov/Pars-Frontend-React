import React from 'react';
import { ProvideAuth } from './hooks/useAuth';
import { ProvideGlobalProps } from './hooks/useGlobalProps';
import ThemeEngine from './components/organisms/ThemeEngine';

/**
 * Main function
 * @return {JSX.Element} the app
 */
const App = () => (
  <ProvideGlobalProps>
    <ProvideAuth>
      <ThemeEngine />
    </ProvideAuth>
  </ProvideGlobalProps>
);

export default App;
