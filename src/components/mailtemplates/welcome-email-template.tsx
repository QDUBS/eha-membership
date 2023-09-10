import React from "react";

interface WelcomeEmailTemplateProps {
  name: string;
  verificationUrl: any;
}

export const WelcomeEmailTemplate: React.FC<WelcomeEmailTemplateProps> = ({
  name,
  verificationUrl,
}) => (
  <html>
    <head>
      <title>WELCOME TO EHA RECRUITMENT</title>
      <style>
        {`
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
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

        .sub {
          color: #999999;
          font-size: 14px;
        }
      `}
      </style>
    </head>
    <body>
      <div className="container">
        <h1>Hello, {name}!</h1>
        <p>
          Welcome to EHA RECRUITMENT! We are excited to have you join our
          community of learners and job seekers. Here, you will find a wide range
          of online courses to enhance your skills and advance your career, as
          well as opportunities for recruitment and employment.
        </p>

        <ol>
          <li>
            Explore Our Courses: Browse our extensive collection of courses
            covering various subjects and disciplines. Whether you are interested
            in medicine, nursing, pharmacy or any medical related field, we have
            something for everyone.
          </li>
          <li>
            Enhance Your Profile: Complete your profile to provide more
            information about yourself, your skills, and your professional
            experience. A comprehensive profile will help employers find you
            easily and increase your chances of landing your dream job.
          </li>
          <li>
            Engage with the Community: Participate in our forums, discussions,
            and networking events. Connect with like-minded individuals, seek
            advice from industry experts, and share your knowledge and
            experiences with others.
          </li>
        </ol>

        <table align="center" width="100%" cellPadding="0" cellSpacing="0">
          <tr>
            <td align="center">
              <table
                style={{ border: "0" }}
                width="100%"
                cellSpacing="0"
                cellPadding="0"
              >
                <tr>
                  <td align="center">
                    <table
                      style={{ border: "0" }}
                      cellSpacing="0"
                      cellPadding="0"
                    >
                      <tr>
                        <td>
                          <a
                            href={verificationUrl}
                            className="button"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Do this Next
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <p>
          If you have any questions, feel free to{" "}
          <a href={`mailto:info@eha.ng`}>email our customer success team</a>.
          (We are lightning quick at replying.)
        </p>
        <p>Thanks, {name}</p>
        <p>
          <strong>P.S.</strong> Need immediate help getting started? Just reply
          to this email, the EHA RECRUITMENT support team is always ready to
          help!
        </p>

        <table className="body-sub">
          <tr>
            <td>
              <p className="sub">
                If you’re having trouble with the button above, copy and paste
                the URL below into your web browser.
              </p>
              <p className="sub">{verificationUrl}</p>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
);
