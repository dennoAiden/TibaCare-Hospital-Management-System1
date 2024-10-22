import React from "react";
// import Slider from "react-slick";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 


function About() {
// const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

  return (
    <div>
      <section className="about-section">
        <Navbar />

        {/* <div className="slideshow-container">
          <Slider {...settings}>
            <div>
              <img src="/images/image1.jpg" alt="Slide 1" className="slide-image" />
            </div>
            <div>
              <img src="/images/image2.jpg" alt="Slide 2" className="slide-image" />
            </div>
            <div>
              <img src="/images/image3.jpg" alt="Slide 3" className="slide-image" />
            </div>
          </Slider>
        </div> */}

        <div className="about-container">
          <div className="about-content">
            <h1 className="about-title">About Us</h1>

            {/* Mission Statement */}
            <div className="about-block">
              <h2 className="about-heading">Our Mission</h2>
              <p className="about-text">
                Providing compassionate care, groundbreaking treatments, and a healing touch — because your health is our mission.
              </p>
            </div>

            {/* Team Mantra */}
            <div className="about-block">
              <h2 className="about-heading">Team Mantra</h2>
              <p className="about-text">
                Together, we’re the heartbeat of healthcare, every patient, every day.
              </p>
            </div>

            {/* Vision Statement */}
            <div className="about-block">
              <h2 className="about-heading">Our Vision</h2>
              <p className="about-text">
                To lead the future of healthcare with cutting-edge innovation, a healthier community, and a patient-centered approach that redefines medical excellence.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;

