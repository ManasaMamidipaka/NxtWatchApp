import './App.css'
import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import HomeRoute from './components/HomeRoute'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/protectedRoute'
import VideoItemDetails from './components/VideoItemDetailsView'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import SavedVideosRoute from './components/SavedVideosRoute'

import CartContext from './context/CartContext'

// Replace your code here

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideos: [],
    activeTab: 'HOME',
  }

  onChangeTheme = () => {
    this.setState(prev => ({isDarkTheme: !prev.isDarkTheme}))
  }

  addToSaveVideos = videoDetails => {
    const {savedVideos} = this.state
    const videoObject = savedVideos.find(
      eachVideo => eachVideo.id === videoDetails.id,
    )

    if (videoObject) {
      this.setState(prev => ({
        savedVideos: [...prev.savedVideos],
      }))
    } else {
      this.setState({savedVideos: [...savedVideos, videoDetails]})
    }
  }

  removeSaveVideos = id => {
    const {savedVideos} = this.state
    const updatedVideos = savedVideos.filter(eachVideo => eachVideo.id !== id)
    this.setState({savedVideos: updatedVideos})
  }

  activeTabItem = item => {
    this.setState({activeTab: item})
  }

  render() {
    const {isDarkTheme, savedVideos, activeTab} = this.state
    console.log(isDarkTheme)

    return (
      <CartContext.Provider
        value={{
          isDarkTheme,
          savedVideos,
          addToSaveVideos: this.addToSaveVideos,
          activeTabItem: this.activeTabItem,
          activeTab,
          onChangeTheme: this.onChangeTheme,
          removeSaveVideos: this.removeSaveVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
