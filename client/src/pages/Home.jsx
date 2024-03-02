import React from "react";
import {
  faRightLong,
  faPerson,
  faMoneyBill,
  faShieldHalved,
  faBook,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div>
      <div className="relative">
        <img
          className="w-full"
          src="https://wowslider.com/sliders/demo-18/data1/images/shanghai.jpg"
          alt="banner_img"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white mix-blend-hard-light">
          <h1 className="text-6xl font-bold mb-3">
            Find Your Dream House Today!
          </h1>
          <p className="text-2xl">
            The best place to get a quote for your future house.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-28">
        <div className="flex justify-center">
          <img src="https://w7.pngwing.com/pngs/18/895/png-transparent-social-media-graphic-design-self-introduction-miscellaneous-company-public-relations-thumbnail.png" />
        </div>
        <article className="mr-36">
          <h2 className="text-3xl font-bold mb-5">Introduction</h2>
          <p className="tracking-wider leading-8 text-justify">
            Welcome to our Civil House Quotation Web Page, where your dream home
            takes shape with precision and expertise. At our virtual doorstep,
            embark on a journey towards turning your vision of a perfect home
            into a tangible reality. Our comprehensive quotation service is
            tailored to meet the unique needs of your civil house project,
            providing you with accurate and transparent pricing. Discover the
            essence of quality craftsmanship and attention to detail as you
            navigate through our user-friendly platform.
          </p>
        </article>
      </div>

      <div className="flex justify-center mt-28 text-5xl font-bold">
        <p>Our features</p>
      </div>
      <div className="flex flex-wrap justify-center gap-32 mt-28 ml-52 mr-52">
        <div className="flex flex-col items-center w-64">
          <FontAwesomeIcon icon={faPerson} size="4x" />
          <h3 className="mt-5 text-xl font-bold">Personalized Quotations</h3>
          <p className="text-center">
            Receive detailed and personalized quotations based on your project
            specifications.
          </p>
        </div>
        <div className="flex flex-col items-center w-64">
          <FontAwesomeIcon icon={faMoneyBill} size="4x" />
          <h3 className="mt-5 text-xl font-bold">Transparent Pricing</h3>
          <p className="text-center">
            Explore itemized breakdowns of costs, helping you understand where
            every dollar is allocated in your project.
          </p>
        </div>
        <div className="flex flex-col items-center w-64">
          <FontAwesomeIcon icon={faShieldHalved} size="4x" />
          <h3 className="mt-5 text-xl font-bold">Secure Communication</h3>
          <p className="text-center">
            Engage in secure communicate channels to discuss your project
            details, ask questions, and seek clarification.
          </p>
        </div>
        <div className="flex flex-col items-center w-64">
          <FontAwesomeIcon icon={faBook} size="4x" />
          <h3 className="mt-5 text-xl font-bold">Expert Guidance</h3>
          <p className="text-center">
            Our team of professionals is dedicated to assisting you in making
            informed decisions, ensuring your project aligns seamlessly with
            your vision and budget.
          </p>
        </div>
        <div className="flex flex-col items-center w-64">
          <FontAwesomeIcon icon={faClock} size="4x" />
          <h3 className="mt-5 text-xl font-bold">Quick Turnaround</h3>
          <p className="text-center">
            Time is of the essence, and our platform ensures a quick turnaround
            for your quotations. Get timely responses without compromising on
            accuracy.
          </p>
        </div>
      </div>
    </div>
  );
}
