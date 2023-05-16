import React from 'react'

const Contact = () => {
  return (
    <div className="contact" id="contact">
        <div className="center">
            <h3>Get in touch</h3>
        </div>
        <div className="contact-section">
            <div className="contact-info">
                <p className="">Feel free to reach out to us using our email below or
                    fill out the form to directly to send a message from this page. 
                </p>
                <div>Team 5</div>
                <div>TeamFive@gmail.com</div>
                <div>San Jose, California</div>
                <div>Mon - Fri 8:00 AM - 5:00 PM</div>
            </div>
        </div>
        <div className="contact-form">
            <form action="mailto:elmar6999@gmail.com">
                <input type="" placeholder="Name" required />
                <input type="email" name="" id="" placeholder="Email" required />
                <textarea name="" id="" cols="30" rows="10" placeholder="Your Message..." required></textarea>
                <input type="submit" name="" value="Send Email "  className="send-btn" /> 
            </form>
        </div>
        </div>
  )
}

export default Contact