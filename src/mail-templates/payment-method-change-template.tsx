import React from "react";

interface AssessmentPassedEmailProps {
  name: string;
  assessment: string;
  cutOff: string;
  score: string;
}

export const AssessmentPassedEmailTemplate: React.FC<
  Readonly<AssessmentPassedEmailProps>
> = ({ name, assessment, cutOff, score }) => {
  return (
    <html>
      <head>
        <title>Assessment Passed!</title>
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

        {/* Body */}
        <div className="container">
          <div className="content">
            <h2 className="heading">Dear {name},</h2>

            <p>
              We are thrilled to share some fantastic news with you! Your hard
              work and dedication have paid off, and we are pleased to inform
              you that you have successfully passed the assessment for the{" "}
              <b>{assessment}</b> course.
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
                Congratulations on achieving the remarkable score of {score}% on
                the assessment, which meets and exceeds the required cut-off
                mark of 80%. Your performance demonstrates your strong grasp of
                the course material and your commitment to mastering the
                essential skills covered in the program.
              </p>

              <p className="text-3">
                We commend you for your dedication to your learning journey and
                your pursuit of excellence. Your success in this assessment is a
                testament to your hard work and determination, and we are
                confident that you will continue to excel in your studies and
                professional pursuits.
              </p>
            </div>
          </div>

          <p className="paragraph">Best regards,</p>
          <p className="paragraph">The Recruitment Website Team</p>

          <div className="fourth-section">
            <h3>Next Steps</h3>
            <p className="text-2">
              1.
              <span className="span-2">
                Course Progress: With this accomplishment, you are making
                excellent progress. Keep up the great work and continue engaging
                with the course materials and activities.
              </span>
            </p>
            <p className="text-2">
              2.
              <span className="span-2">
                Future Modules: As you progress through the course, you will
                have the opportunity to explore more advanced topics and further
                enhance your skills.
              </span>
            </p>
            <p className="text-2">
              3.
              <span className="span-2">
                Support: Should you have any questions, require additional
                resources, or need support, our team is here to assist you.
              </span>
            </p>
          </div>

          <div className="fifth-section">
            <p className="text-3">
              We are excited to have you as a valuable member of the community.
              Your achievements contribute to the success of the course and
              inspire fellow participants on their learning journeys.
            </p>

            <p className="text-3">
              Once again, congratulations on this remarkable accomplishment. We
              look forward to witnessing your continued growth and success in
              the course and beyond.
            </p>
          </div>

          <br />

          <footer>
            <p className="text-3">Best regards,</p>
            <b>The Recruitment Website Team</b>
          </footer>
        </div>
      </body>
    </html>
  );
};
