import React from "react";

interface EnrollmentEmailTemplateProps {
  name: string;
  duration: string;
  course:string;
}

export const EnrollmentEmailTemplate: React.FC<Readonly <EnrollmentEmailTemplateProps>> = ({
  name,
  duration,
  course,
}) => {
  return (
    <html>
      <head>
        <title>Enrollment Confirmation</title>
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

          h1 {
            color: #333333;
            font-size: 24px;
            margin-top: 0;
          }

          p {
            color: #666666;
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 1em 0;
          }

          .row {
            display: flex;
            margin-bottom: 10px;
          }

          .column {
            flex: 50%;
          }

          .column:first-child {
            margin-right: 10px;
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
          <h1>Hi {name},</h1>
          <p>
            Congratulations! You have successfully enrolled in the course{" "}
            <strong>{course}</strong> on our recruitment website.
          </p>
          <p>
            The course will start on {duration}. We are excited to have you as
            part of the learning community.
          </p>
          <p>
            You can access the course materials and resources by logging into
            your account on our website.
          </p>

          <div className="row">
            <div className="column">
              <p>
                <strong>Course Name:</strong>
              </p>
              <p>{course}</p>
            </div>
            <div className="column">
              <p>
                <strong>Duration:</strong>
              </p>
              <p>{duration}</p>
            </div>
          </div>

          <p>
            If you have any questions or need further assistance, please do not
            hesitate to contact our support team.
          </p>

          <p>Best regards,</p>
          <p>The Recruitment Website Team</p>
        </div>
      </body>
    </html>
  );
};

