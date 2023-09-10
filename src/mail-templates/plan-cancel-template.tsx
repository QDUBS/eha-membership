import React from "react";

interface AssessmentFailedEmailProps {
  name: string;
  assessment: string;
  cutOff: string;
}

export const AssessmentFailedEmailTemplate: React.FC<
  Readonly<AssessmentFailedEmailProps>
> = ({ name, assessment, cutOff }) => {
  return (
    <html>
      <head>
        <title>Assessment Failed</title>
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
              We hope this message finds you well. We wanted to inform you about
              the results of your recent assessment for the
              <b>{assessment}</b> assessment. Unfortunately, we regret to inform
              you that you did not meet the required cut-off mark of {cutOff}%
              to pass the assessment.
            </p>

            <div className="second-section">
              <h3>Assessment Details</h3>
              <p className="text-1">
                Assessment Name: <span className="span-1">{assessment}</span>
              </p>
              <p className="text-1">
                Cut-off Mark: <span className="span-1">{cutOff}%</span>
              </p>
            </div>

            <div className="third-section">
              <p className="text-3">
                While we understand that this news may be disappointing, we want
                to assure you that this outcome is not a reflection of your
                dedication or potential. Our assessments are designed to gauge
                your understanding of the course material and ensure that you
                have a solid grasp of the concepts presented.
              </p>

              <h4>Reason for the Result:</h4>
              <p className="text-3">
                Upon reviewing your assessment, we found that your score did not
                meet the minimum requirement of {cutOff}%. It&apos;s important
                to note that we have established this standard to ensure that
                participants are fully equipped to succeed in the course and
                excel in the field of technology.
              </p>
            </div>

            <div className="fourth-section">
              <h3>Next Steps</h3>
              <p className="text-2">
                1.
                <span className="span-2">
                  Review: We encourage you to review the course materials
                  thoroughly, paying close attention to the areas where you may
                  need further understanding.
                </span>
              </p>
              <p className="text-2">
                2.
                <span className="span-2">
                  Study Support: Should you require any additional assistance or
                  clarification on specific topics, feel free to reach out to
                  our support team.
                </span>
              </p>
              <p className="text-2">
                3.
                <span className="span-2">
                  Reassessment: Depending on the course policy, you may have the
                  opportunity to retake the assessment. Please refer to the
                  course guidelines or reach out to our support team for more
                  information.
                </span>
              </p>
            </div>

            <div className="fifth-section">
              <p className="text-3">
                We are here to support you on your learning journey and help you
                achieve your goals. We believe that with dedication,
                persistence, and continued effort, you can overcome any
                challenges and make progress toward mastering the skills covered
                in the course.
              </p>

              <p className="text-3">
                Thank you for your commitment to {assessment} assessment. We
                look forward to assisting you in your ongoing learning
                endeavors.
              </p>
            </div>

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
