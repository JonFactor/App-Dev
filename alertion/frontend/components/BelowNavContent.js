import { View, Text } from 'react-native'
import React from 'react'
import Settings from './BelowNav/Settings'
import Info from './BelowNav/Info'
import Contacts from './BelowNav/Contacts'
import AlertBtnSettings from './BelowNav/AlertBtnSettings'

const BelowNavContent = (selectedNavTab) => {
  return (
    <View>
      {selectedNavTab == 'settings' && 
        <View>
            <Settings></Settings>
        </View>
      }
      {selectedNavTab == 'info' && 
        <View>
            <Info></Info>
        </View>
      }
      {selectedNavTab == 'contacts' &&
        <View>
            <Contacts></Contacts>
        </View>
      }
      {selectedNavTab == 'alertbtnsettigns' &&
        <View>
            <AlertBtnSettings></AlertBtnSettings>
        </View>
      }
      <View>
        <Text>Nothing is selected</Text>
      </View>
    </View>
  )
}

export default BelowNavContent