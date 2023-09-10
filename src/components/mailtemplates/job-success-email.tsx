import React from "react";

interface JobApplicationSuccessProps {
  name: string;
  jobTitle: string;
}

export const JobApplicationSuccessEmailTemplate: React.FC<
  Readonly<JobApplicationSuccessProps>
> = ({ name, jobTitle }) => {
  return (
    <html>
      <head>
        <title>Job Application Received</title>
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

          body {
            font-family: 'Inter', Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }

          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 4px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          }

          .column {
            display: flex;
            flex-direction: column;
          }

          .row {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
          }

          .column:first-child {
            margin-right: 10px;
          }

          .heading {
            color: #333333;
            font-size: 24px;
            margin-top: 0;
          }

          .paragraph {
            color: #666666;
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 1em 0;
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
        `}
        </style>
      </head>
      <body>
        <div className="container">
          <div className="row">
            <div className="column">
              <h1 className="heading">Hi {name},</h1>
              <p className="paragraph">
                Thank you for submitting your application for the position of{" "}
                <strong>{jobTitle}</strong> at our company.
              </p>
              <p className="paragraph">
                We have received your application and it is currently being
                reviewed by our team.
              </p>
              <p className="paragraph">
                We appreciate your interest in joining our team and will be in
                touch if your qualifications and experience match our
                requirements.
              </p>
              <p className="paragraph">
                Please note that due to the high volume of applications we
                receive, we may not be able to provide individual feedback on
                your application.
              </p>
              <p className="paragraph">
                Once again, thank you for considering us as your potential
                employer.
              </p>
            </div>
          </div>

          <p className="paragraph">Best regards,</p>
          <p className="paragraph">The Recruitment Team</p>
        </div>
      </body>
    </html>
  );
};
