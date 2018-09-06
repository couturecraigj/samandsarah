import React from 'react'

export default () => (
  <section id="three">
    <h2>Get In Touch</h2>
    <p>
      Accumsan pellentesque commodo blandit enim arcu non at amet id arcu magna.
      Accumsan orci faucibus id eu lorem semper nunc nisi lorem vulputate lorem
      neque lorem ipsum dolor.
    </p>
    <div className="row">
      <div className="8u 12u$(small)">
        <form
          method="post"
          data-netlify="true"
          action="/thanks"
          data-netlify-honeypot="bot-field"
          name="contact"
        >
          <div className="row uniform 50%">
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don’t fill this out
                <input name="bot-field" id="bot-field" />
              </label>
            </p>
            <div className="6u 12u$(xsmall)">
              <input type="text" name="name" id="name" placeholder="Name" />
            </div>
            <div className="6u 12u$(xsmall)">
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div className="12u">
              <textarea
                name="message"
                id="message"
                placeholder="Message"
                rows="4"
              />
            </div>
          </div>
        </form>
        <ul className="actions">
          <li>
            <input type="submit" value="Send Message" />
          </li>
        </ul>
      </div>
      <div className="4u 12u$(small)">
        <ul className="labeled-icons">
          <li>
            <h3 className="icon fa-home">
              <span className="label">Address</span>
            </h3>
            1234 Somewhere Rd.
            <br />
            Nashville, TN 00000
            <br />
            United States
          </li>
          <li>
            <h3 className="icon fa-mobile">
              <span className="label">Phone</span>
            </h3>
            000-000-0000
          </li>
          <li>
            <h3 className="icon fa-envelope-o">
              <span className="label">Email</span>
            </h3>
            <a href="mailto:wullysammoth@gmail.com">wullysammoth@gmail.com</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
)
