import React from 'react';

interface JobApplicationDeclinedProps {
  name: string;
  jobTitle: string;
}

export const JobApplicationDeclinedEmailTemplate: React.FC<Readonly <JobApplicationDeclinedProps>> = ({
  name,  
  jobTitle,
}) => {
  return (
    <html>
      <head>
        <title>Job Application Declined</title>
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
                We regret to inform you that your job application for the
                position of <strong>{jobTitle}</strong> has been declined.
              </p>
              <p className="paragraph">
                We appreciate the time and effort you put into your application
                and want to thank you for considering us as an employer.
              </p>
              <p className="paragraph">
                Although your application was not successful on this occasion,
                we encourage you to continue pursuing opportunities with our
                organization in the future.
              </p>
              <p className="paragraph">
                We wish you the best of luck with your job search and thank you
                once again for your interest in our company.
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