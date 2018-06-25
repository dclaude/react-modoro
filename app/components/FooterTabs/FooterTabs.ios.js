import React from 'react'
import PropTypes from 'prop-types'
import { TabBarIOS } from 'react-native'
import { colors } from '../../styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { HomeContainer, LeaderboardContainer } from '../../containers'

FooterTabs.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
  onTabSelect: PropTypes.func.isRequired, // will dispatch the 'setFooterTab()' action creator
}

export default function FooterTabs(props) {
  return (
    <TabBarIOS tintColor={colors.active}>
      <Icon.TabBarItem
        iconSize={35}
        iconName='ios-home-outline'
        title='Home'
        selected={props.activeFooterTab === 'home'}
        onPress={() => {
          /*
          TRES TRES IMPORTANT
          - qd on clique sur le tab dans la UI
          on va appeler la callback onTabSelect()
          qui dispatcher le setFooterTab() action creator
          ce qui va changer le state du reducer activeFooterTabs()
          - ca va trigger un re-render
          car on recoit props.activeFooterTab du redux store (grace a <FooterTabsContainer>)
          et donc on va passer dans le code de la props 'selected' ci-dessus
          et du coup notre tab va devenir active et on va afficher les children de ce <Icon.TabBarItem>
          - donc on va render <HomeContainer>
          */
          props.onTabSelect('home')
        }}>
          <HomeContainer navigator={props.navigator}/>
      </Icon.TabBarItem>
      <Icon.TabBarItem
        iconSize={35}
        iconName='ios-trophy-outline'
        title='Leaderboard'
        selected={props.activeFooterTab === 'leaderboard'}
        onPress={() => {
          props.onTabSelect('leaderboard')
        }}>
          <LeaderboardContainer navigator={props.navigator}/>
      </Icon.TabBarItem>
    </TabBarIOS>
  )
} 

