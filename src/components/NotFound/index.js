import Header from '../Header'
import CartContext from '../../context/CartContext'

import {NotFoundContainer, Heading, Desc, Image} from './styledComponents'

const NotFound = () => (
  <CartContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const imageUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      const isDarkHeading = isDarkTheme ? '#ffffff' : '#000000'
      const isDarkDesc = isDarkTheme ? '#ffffff' : '#000000'
      const isDarkContainer = isDarkTheme ? '#000000' : '#ffffff'

      return (
        <>
          <Header />
          <NotFoundContainer isDark={isDarkContainer}>
            <Image src={imageUrl} alt="not found" />
            <Heading isDark={isDarkHeading} isDarkTheme>
              Page Not Found
            </Heading>
            <Desc isDark={isDarkDesc}>
              we are sorry, the page you requested could not be found.
            </Desc>
          </NotFoundContainer>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default NotFound
