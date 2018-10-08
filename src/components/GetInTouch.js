import React from 'react'

export default () => (
  <section id="three">
    <h2>Get In Touch</h2>
    <p>
      Want to learn more? Please feel free to reach out to us in any of the
      following ways.
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
            <div>
              <input type="submit" value="Send Message" />
            </div>
          </div>
        </form>
      </div>
      <div className="4u 12u$(small)">
        <ul className="labeled-icons">
          <li>
            <h3 className="icon fa-home">
              <span className="label">Address</span>
            </h3>
            56 Howard Street
            <br />
            Keene, NH 03431
            <br />
            United States
          </li>
          <li>
            <h3 className="icon fa-mobile">
              <span className="label">Phone</span>
            </h3>
            (603) 903-7205
          </li>
          <li>
            <h3 className="icon fa-envelope-o">
              <span className="label">Email</span>
            </h3>
            <a href="mailto:sam@keenecrossway.org">sam@keenecrossway.org</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
)
