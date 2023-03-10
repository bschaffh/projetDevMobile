import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import RootStack from './Navigation/Navigation';
import { Provider } from 'react-redux';
import { persistor, store } from './store/config';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer style={styles.container}>
          <RootStack style={styles.container}/>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
