import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import VideoCardTwo from '../GamingVideoItem'

import Header from '../Header'

import SideBar from '../SideBar'

import CartContext from '../../context/CartContext'

import {
  SearchVideosContainer,
  VideosContainer,
  ProductsLoaderContainer,
  HomeContainer,
  HomeSide,
  HomeSticky,
  NotFoundContainer,
  Image,
  Heading,
  Desc,
  Retry,
  NavLink,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GamingRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchedVideos: [],
  }

  componentDidMount() {
    this.getSuggestionVideos()
  }

  getSuggestionVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(eachVideo => ({
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
        title: eachVideo.title,
      }))
      this.setState({
        searchedVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.ok !== true) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <ProductsLoaderContainer
      className="products-loader-container"
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </ProductsLoaderContainer>
  )

  renderGamingView = () => (
    <CartContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {searchedVideos} = this.state
        const bgColor = isDarkTheme ? '#231f20' : '#f9f9f9'

        return (
          <SearchVideosContainer data-testid="gaming" bgColor={bgColor}>
            <h1>Gaming</h1>
            <VideosContainer bgColor={bgColor}>
              {searchedVideos.map(eachVideo => (
                <VideoCardTwo key={eachVideo.id} details={eachVideo} />
              ))}
            </VideosContainer>
          </SearchVideosContainer>
        )
      }}
    </CartContext.Consumer>
  )

  renderFailureView = () => (
    <NotFoundContainer>
      <Image
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img"
        alt="failure view"
        className="jobs-failure-img"
      />
      <Heading>Oops! Something Went Wrong</Heading>
      <Desc className="jobs-failure-description">
        We are having some trouble.
      </Desc>
      <NavLink>
        <Retry
          className="button"
          type="button"
          onClick={this.getSuggestionVideos}
        >
          Retry
        </Retry>
      </NavLink>
    </NotFoundContainer>
  )

  renderAllVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGamingView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'

          return (
            <div data-testid="home">
              <Header />
              <HomeContainer data-testid="home" bgColor={bgColor}>
                <HomeSticky>
                  <SideBar />
                </HomeSticky>
                <HomeSide bgColor={bgColor}>{this.renderAllVideos()}</HomeSide>
              </HomeContainer>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default GamingRoute
