import React from 'react';
import { ProvideAuth } from './hooks/useAuth';
import ThemeEngine from './components/organisms/ThemeEngine';

/**
 * Main function
 * @return {JSX.Element} the app
 */
const App = (): JSX.Element => (
  <ProvideAuth>
    <ThemeEngine />
  </ProvideAuth>
);

export default App;
