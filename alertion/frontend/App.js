import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AlarmBtn from './components/AlarmBtn';
import NavDiv from './components/NavDiv';
import BelowNavContent from './components/BelowNavContent';

export default function App() {
  
  return (
    <View className>
      <AlarmBtn></AlarmBtn>
      <NavDiv></NavDiv>
      <BelowNavContent></BelowNavContent>
    </View>
  );
}