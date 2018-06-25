import { FooterTabs } from '../../components'
import { connect } from 'react-redux'
import { setFooterTab } from '../../redux/modules/activeFooterTab'

// le forwarding de 'navigator' ci-dessous est inutile car le HOC connect() forward deja les props de <FooterTabsContainer> vers <FooterTabs>
function mapStateToProps({ activeFooterTab }, { navigator }) {
  return {
    activeFooterTab,
    navigator,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onTabSelect: (tab) => dispatch(setFooterTab(tab))
  }
}

/*
le component <FooterTabsContainer> est juste un wrapper de <FooterTabs> (celui de components)
qui permet juste a <FooterTabs> d'obtenir des props provenant du redux store (et du <Navigator>)
*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterTabs)

