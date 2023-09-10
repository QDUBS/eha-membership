import VerifyEmail from "@components/authentication/ui/VerifyEmail";
import { AppRoutes } from "@/src/constants/app_routes";
import { getVerificationToken, regenerateToken } from "@/src/db/verification";

const Token = ({ title, message, url, action }) => {
  return (
    <VerifyEmail title={title} message={message} url={url} action={action} />
  );
};

export const getServerSideProps = async (context) => {
  const { token } = context.query;
  const verificationToken = await getVerificationToken(token?.toString());

  let title = "";
  let message = "";
  let url = "";
  let action = "";
  if (!verificationToken) {
    (title = "No previous account signup!"),
      (message =
        "Your previous sign up could not be verified at this time. Please click the link below to sign up for an account.");
    url = AppRoutes.SignUpIndividual;
    action = "Click here to sign up";
  } else {
    await regenerateToken(verificationToken.token);
    (title = "Verification link sent!"),
      (message =
        "An activation email was sent successfully. Please click the link sent to your email to activate your account");
    action = "Click here to Log in";
  }
  return {
    props: {
      title,
      message,
      url,
    },
  };
};

export default Token;
