/* eslint-disable react/react-in-jsx-scope */
import {StatusBar} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {THEME} from './src/theme';

export default function App() {
  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  }
  return (
    <NativeBaseProvider theme={THEME} config={config}>
      <StatusBar
        barStyle={'light-content' }
        backgroundColor="transparent"
        translucent
      />
    </NativeBaseProvider>
  );
}