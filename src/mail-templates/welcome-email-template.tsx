import React from "react";
import Image from "next/image";

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
      <title>Welcome To EHA Recruitment</title>
    </head>
    <body>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap");

          body {
            font-family: "Inter", Arial, sans-serif;
            background-color: #f3f3f3;
            margin: 0;
            padding: 0;
          }

          .header-image {
            position: relative;
            padding-top: 1rem;
          }

          /* Content */

          .content {
            max-width: 60%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            padding: 20px;
            border-radius: 4px;
          }

          .info-container {
            width: 80%;
            background-color: white;
            padding: 2rem 4rem;
            margin-top: 2rem;
          }

          .welcome-text {
            font: 400 35px sans-serif;
            color: black;
            text-align: center;
            margin-bottom: 1.2rem;
          }

          .text-1 {
            font: 300 18px sans-serif;
            color: #333;
            line-height: 1.7rem;
          }

          .second-section {
            margin-top: 1.5rem;
          }

          .text-2 {
            font: 300 18px sans-serif;
            color: #333;
            line-height: 1.7rem;
            margin-bottom: 1.2rem;
          }

          .span-2 {
            font: 300 18px sans-serif;
            color: #333;
            line-height: 0.5rem;
            margin-left: 0.5rem;
          }

          .button {
            display: block;
            background-color: #666;
            padding: 12px 30px;
            margin-top: 1rem;
            border-radius: 4px;
            border: none;
            cursor: pointer;
          }

          .button a {
            text-decoration: none;
            color: white;
            font-size: 16px;
          }

          footer {
            width: 100%;
            margin: 5rem 0 3rem 0;
          }

          .text-3 {
            font: 300 18px sans-serif;
            color: #333;
            text-align: center;
            line-height: 2rem;
          }
        `}
      </style>

    </body>
  </html>
);
