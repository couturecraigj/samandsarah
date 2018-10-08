import React, { PureComponent } from 'react'

class Comments extends PureComponent {
  constructor(props) {
    super(props)
    this.code = (d, s, id) => {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: 'your-app-id',
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
      console.log(window)
    }
    this.state = {
      href: '',
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.code(document, 'script', 'facebook-jssdk')
      if (window.FB) window.FB.XFBML.parse()
      this.setState({
        href: window.location.href,
      })
    }, 0)
  }
  componentWillUnmount() {
    // this.js.remove()
    // document.getElementById('fb-root').childNodes.forEach(el => el.remove())
  }
  render() {
    const { href } = this.state
    const { numPosts = 5 } = this.props
    return (
      <div className="fb-comments" data-href={href} data-numposts={numPosts} />
    )
  }
}

export default Comments
