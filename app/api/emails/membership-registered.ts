
// import { MembershipRegistrationSuccessEmailTemplate } from "@/mail-templates/membership-registration-template";
// import { authOptions } from "";
// import type { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth/next";
// import { Resend } from "resend";

// const resend = new Resend(`${process.env.RESEND_API_KEY}`);
// const sender = process.env.EHA_MEMBERSHIP_MAIL;

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     try {
//         const session = await getServerSession(req, res, authOptions);
//         const { event, date, time, location } = req.body;

//         if (!session) {
//             res.status(401).end({
//                 error: "You must be authenticated to access this resource",
//             });
//         }

//         const email = session?.user.email;
//         const firstName = session?.firstName;
//         const lastName = session?.lastName;

//         // const data = await resend.emails.send({
//         //   from: `Recruitment Team EHA Clinics <${sender}>`,
//         //   to: [`${email}`],
//         //   subject: "Event Registration Successful!",
//         //   react: MembershipRegistrationSuccessEmailTemplate({
//         //     name: `${firstName} ${lastName}`,
//         //     event: event,
//         //     date: date,
//         //     time: time,
//         //     location: location,
//         //   }),
//         // });

//         // return res.status(200).json(data);
//     } catch (error) {
//         return res.status(400).json(error);
//     }
// }
