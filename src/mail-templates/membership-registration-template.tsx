import React from "react";

interface WebinarRegistrationSuccessProps {
  name: string;
  event: string;
  date: string;
  time: string;
  location: string;
}

export const MembershipRegistrationSuccessEmailTemplate: React.FC<
  Readonly<WebinarRegistrationSuccessProps>
> = ({ name, event, date, time, location }) => {
  return (
    <html>
      <head>
        <title>Registration Successful</title>
      </head>
      <body>
        <style>
          {`
            @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap");

            body {
              font-family: "Inter", Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }

            .button {
              display: inline-block;
              background-color: #29c0f3;
              color: white;
              text-decoration: none;
              font-size: 16px;
              padding: 10px 20px;
              border-radius: 4px;
            }

            /* Header */
            .header {
              width: 100%;
              position: relative;
            }

            .header-image {
              width: 100%;
              height: 200px;
              position: relative;
            }

            .overlay {
              width: 100%;
              height: 200px;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              top: 0;
              left: 0;
            }

            .header-heading {
              color: white;
              text-align: center;
            }

            /* Content */
            .content {
              max-width: 60%;
              margin: 0 auto;
              padding: 20px;
              border-radius: 4px;
            }

            .welcome-text {
              font: 300 15px;
              color: #333;
              line-height: 1.5rem;
              margin-bottom: 1.2rem;
            }

            .text-1 {
              font: 300 15px;
              color: #333;
              line-height: 1.5rem;
            }

            .span-1 {
              font: 300 15px;
              color: #333;
              line-height: 1.5rem;
            }

            .second-section {
              margin-top: 1.5rem;
            }

            .text-2 {
              font: 300 15px;
              color: #333;
              line-height: 1.5rem;
              margin-bottom: 1.2rem;
            }

            .span-2 {
              font: 300 15px;
              color: #333;
              line-height: 0.5rem;
              margin-left: 0.5rem;
            }

            .third-section {
              margin-top: 2.5rem;
            }

            .text-3 {
              font: 300 15px;
              color: #333;
              line-height: 1.5rem;
              margin-bottom: 1.2rem;
            }

            footer {
              width: 100%;
              margin: 3rem 0;
            }
          `}
        </style>

        <div className="container">
          <div className="content">
            <h2 className="heading">Dear {name},</h2>

            <p>
              Congratulations! We are thrilled to inform you that your
              registration for the upcoming event <strong>{event}</strong> was
              successful. We can&apos;t wait to have you join us for this
              exciting event.
            </p>

            <div className="second-section">
              <h3>Event Details:</h3>
              <p className="text-1">
                Event Name: <span className="span-1">{event}</span>
              </p>
              <p className="text-1">
                Date: <span className="span-1">{date}</span>
              </p>
              <p className="text-1">
                Time: <span className="span-1">{time}</span>
              </p>
              <p className="text-1">
                Location: <span className="span-1">{location}</span>
              </p>
            </div>

            <p>
              You&apos;re now officially part of an engaging gathering that
              brings together enthusiasts, professionals, and experts to
              explore, learn, and network. The event promises to be a valuable
              opportunity to expand your knowledge, connect with like-minded
              individuals, and gain meaningful insights.
            </p>

            <p className="text-3">
              In the coming days, you can expect to receive more detailed
              information about the event via email. This information will
              include the event agenda, speaker lineup, workshop details, and
              any other pertinent information to ensure you have a seamless and
              enriching experience.
            </p>

            <p className="text-3">
              If you have any questions leading up to the event or require any
              assistance, please don&apos;t hesitate to reach out to our
              dedicated support team. We are here to make sure your
              participation in {event}
              is as enjoyable and beneficial as possible.
            </p>

            <p className="text-3">
              Thank you for choosing to be a part of our event. We look forward
              to welcoming you and sharing an inspiring day of learning and
              networking.
            </p>

            <br />

            <footer>
              <p className="text-3">Best regards,</p>
              <b>The Recruitment Website Team</b>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
};
