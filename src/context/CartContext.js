import React from 'react'

const CartContext = React.createContext({
  isDarkTheme: false,
  savedVideos: [],
  addToSavedVideos: () => {},
  activeTabItem: () => {},
  onChangeTheme: () => {},
  removeSaveVideos: () => {},
  activeTab: '',
})

export default CartContext
