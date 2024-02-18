import React from 'react';
import Footer from '../footer/footer';

const Body = () => {
  return (
    <div>
      <div className="hero-section">
            <div className="content">
              <h1>Supercharge Your Meetings <br/> And Made It Effective</h1>
              <p>Make your meetings more effective with our powerful tools.</p>
              <button className="start-meeting-button">Start Meeting Now</button>
            </div>
            <div className="image">
              <img src="/images/person1.jpg" alt="Hero Image" />
            </div>
      </div>
      <div className="info-section">
        <h1>Used by Professionals On</h1>
        <div className="images">
          <img src="/images/1.png" alt="Image 1" />
          <img src="/images/2.png" alt="Image 2" />
          <img src="/images/3.jpeg" alt="Image 3" />
          <img src="/images/4.png" alt="Image 4" />
        </div>
        <div className="text-blocks">
          <p>200k+ users using the platform</p>
          <p>98% revenue growth+</p>
          <p>150+ companies</p>
          <p>10Pb downloads</p>
        </div>
      </div>
      <div className="pricing-plans">
        <h2>Simple Pricing and Clear Values</h2>
        <div className="plans">
          <div className="plan">
            <h3>Basic Plan</h3>
            <p>$10/month</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
            <button>Choose Plan</button>
          </div>
          <div className="plan">
            <h3>Standard Plan</h3>
            <p>$20/month</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
              <li>Feature 4</li>
            </ul>
            <button>Choose Plan</button>
          </div>
          <div className="plan">
            <h3>Premium Plan</h3>
            <p>$30/month</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
              <li>Feature 4</li>
              <li>Feature 5</li>
            </ul>
            <button>Choose Plan</button>
          </div>
        </div>
      </div>
      {/* <div className="avatars-section">
        <div className="avatars">
          <img src="/images/person1.jpg" alt="Avatar 1" />
          <img src="/images/person1.jpg" alt="Avatar 2" />
          <img src="/images/person1.jpg" alt="Avatar 2" />
          <img src="/images/person1.jpg" alt="Avatar 2" />
          <img src="/images/person1.jpg" alt="Avatar 2" />
          <img src="/images/person1.jpg" alt="Avatar 3" />
          {/* Add more avatar images as needed */}
        {/* </div>
        <div className="card">
          <h2>Have a conversation without missing anything</h2>
          <button>Learn More</button>
        </div>
      </div>  */}
      <Footer/>
    </div>
  )
}

export default Body;