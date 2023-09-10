import React from "react";

interface EmailTemplateProps {
  name: string;
  verificationUrl: any;
}

export const VerifyMailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  verificationUrl,
}) => (
  <html>
    <head>
      <title>EHA RECRUITMENT</title>
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
        <h1>Thank you {name}!</h1>
        <p>
          Thank you for signing up with EHA RECRUITMENT! We noticed that you
          have not verified your email address yet. To complete your
          registration, please click on the button below:
        </p>

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
                            Verify Email
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
          If you have already verified your email address, please disregard this
          message.
        </p>

        <table className="body-sub">
          <tr>
            <td>
              <p className="sub">
                If you are still experiencing issues with verifying your email or
                have any questions, please do not hesitate to contact our support
                team at <a href="mailto:info@eha.ng">info@eha.ng</a>.
              </p>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
);
