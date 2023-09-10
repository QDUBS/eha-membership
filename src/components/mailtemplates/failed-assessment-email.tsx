import React from 'react';

interface AssessmentFailedEmailProps {
  name: string;
//   assessmentName: string;
  reason: string;
}

export const AssessmentFailedEmailTemplate: React.FC<Readonly <AssessmentFailedEmailProps>> = ({
  name,
//   assessmentName,
  reason,
}) => {
  return (
    <html>
      <head>
        <title>Assessment Failed</title>
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
              <p className="paragraph">We regret to inform you that you did not pass the assessment on our recruitment website.</p>
              <p className="paragraph">Based on the evaluation, your performance fell below the required standards.</p>
              <p className="paragraph">Reason for failure: {reason}</p>

              <p className="paragraph">Do not be discouraged by this setback. Use this as an opportunity to identify areas for improvement and continue learning and practicing. We encourage you to try again and strive for success.</p>
            </div>
          </div>

          <p className="paragraph">Best regards,</p>
          <p className="paragraph">The Recruitment Website Team</p>
        </div>
      </body>
    </html>
  );
};

