import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerColumns = [
    [
      { label: 'Privacy Policy', link: '/footer/privacy-policy' },
      { label: 'Terms of Service', link: '/footer/terms-of-service' },
      { label: 'About Us', link: '/footer/about-us' },
    ],
    [
      { label: 'Contact Us', link: '/footer/contact-us' },
      { label: 'FAQ', link: '/footer/faq' },
      { label: 'Blog', link: '/blog' },
    ],
    [
      { label: 'Careers', link: '/footer/careers' },
      { label: 'Support', link: '/footer/support' },
      { label: 'Feedback', link: '/footer/feedback' },
    ],
  ];

  const socialMediaIcons = [
    { icon: 'facebook', link: 'https://www.facebook.com/example' },
    { icon: 'twitter', link: 'https://www.twitter.com/example' },
    { icon: 'instagram', link: 'https://www.instagram.com/example' },
  ];
  return (
    <div>
        <footer className={"footer"}>
          <div className={"footerColumns"}>
            {footerColumns.map((column, columnIndex) => (
              <div key={columnIndex} className={"footerColumn"}>
                {column.map((option, index) => (
                  <Link key={index} href={option.link} >
                    <a className={"footerOption"}>{option.label}</a>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className={"footerSocial"}>
            {socialMediaIcons.map((socialIcon, index) => (
              <a key={index} href={socialIcon.link} target="_blank" rel="noopener noreferrer">
                <img src={`/images/${socialIcon.icon}.png`} alt={socialIcon.icon} />
              </a>
            ))}
          </div>

          <div className={"footerCopyright"}>
            <p>&copy; 2024 Company. All rights reserved.</p>
          </div>
     </footer>
    </div>
  )
}

export default Footer;