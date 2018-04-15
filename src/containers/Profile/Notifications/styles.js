import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  textInactive: {
    fontFamily: 'montserrat-semibold',
    fontSize: 17,
    width: '100%',
    textAlign: 'center',
    color: '#d4af37',
    backgroundColor: 'transparent',
  },
  textActive: {
    color: '#fff',
  },
  buttonLeft: {
    flex: 1,
    borderColor: '#d4af37',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonRight: {
    flex: 1,
    borderColor: '#d4af37',
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonMiddle: {
    flex: 1,
    borderColor: '#d4af37',
    borderWidth: 1,
  },
  buttonActive: {
    flex: 1,
    backgroundColor: '#d4af37',
    borderColor: '#d4af37',
  },
});