import React from 'react';
import {SafeAreaView, Text} from 'react-native';

import Scanner from './src/components/scanner/Scanner';

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Scanner />
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({

// });

export default App;
