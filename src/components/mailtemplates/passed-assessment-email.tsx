import React from 'react';

interface AssessmentPassedEmailProps {
  name: string;
  certificateUrl: string;
}

export const AssessmentPassedEmailTemplate: React.FC<Readonly <AssessmentPassedEmailProps>> = ({
  name,
  certificateUrl,
}) => {
  return (
    <html>
      <head>
        <title>Assessment Passed</title>
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
              <p className="paragraph">Congratulations! You have passed your assessment on our recruitment website.</p>
              <p className="paragraph">Your performance was outstanding, and we appreciate your dedication and hard work.</p>
              <p className="paragraph">We are pleased to inform you that you have successfully completed this assessment.</p>
              <p className="paragraph">You can download your certificate by clicking the button below:</p>
              <a className="button" href={certificateUrl} download>Download Certificate</a>
              <p className="paragraph">Keep up the great work and continue to excel in your learning journey.</p>
            </div>
          </div>

          <p className="paragraph">Best regards,</p>
          <p className="paragraph">The Recruitment Website Team</p>
        </div>
      </body>
    </html>
  );
};