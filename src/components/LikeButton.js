import React, { PureComponent } from 'react'

class LikeButton extends PureComponent {
  constructor(props) {
    super(props)
    this.code = (d, s, id) => {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: process.env.FB_APP_ID,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v3.1',
        })
      }
      ;(function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
          return
        }
        js = d.createElement(s)
        js.id = id
        js.src = '//connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      })(document, 'script', 'facebook-jssdk')
      if (window.FB) window.FB.XFBML.parse()
    }
    this.state = {
      href: '',
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        href: window.location.href,
      })
      this.code(document, 'script', 'facebook-jssdk')
    }, 0)
  }
  componentWillUnmount() {
    // this.js.remove()
    // document.getElementById('fb-root').childNodes.forEach(el => el.remove())
  }
  render() {
    const { href } = this.state
    return (
      <div
        className="fb-like"
        data-href={href}
        data-width="100%"
        data-layout="standard"
        data-action="like"
        data-show-faces="true"
      />
    )
  }
}

export default LikeButton
