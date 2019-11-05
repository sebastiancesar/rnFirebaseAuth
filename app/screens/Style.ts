import { StyleSheet } from 'react-native';


export default StyleSheet.create({

  phoneInputForm: {
    paddingHorizontal: 20,
    paddingTop: '20%'
  },

  screenMainSubtitle: {
    marginTop: '10%',
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 10
  },

  subtitleButton: {
    marginBottom: '10%'
  },

  screenMainAction: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  
  mainActionButton: {
    backgroundColor: 'green'
  },

  headerContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    height: 100
  },

  screenEmailLabel: {
    fontSize: 18
  },
  
  screenEmailOverlayContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 20,
    paddingRight: 20
  }
});