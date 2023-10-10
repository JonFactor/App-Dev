import { View, Text } from 'react-native'
import React from 'react'

const BelowNavContent = (selectedNavTab) => {
  return (
    <View>
      {selectedNavTab == 'settings' && 
        <View></View>
      }
      {selectedNavTab == 'info' && 
        <View></View>
      }
      <View>
        <Text>Nothing is selected</Text>
      </View>
    </View>
  )
}

export default BelowNavContent