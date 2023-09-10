export class AppRoutes {
  // General Routes
  public static readonly Home = "/";
  public static readonly Landing = "/landing";
  public static readonly TermsConditions = "/";
  public static readonly PrivacyPolicy = "/";

  // Authentication Routes
  public static readonly Login = "/login";
  public static readonly Signup = "/signup";
  public static readonly SignUpComplete = "/signup/complete";
  public static readonly PasswordReset = "/";

  // Membership Routes
  public static readonly Start = "/membership/start";
  public static readonly ExistingMember = "/membership/start/existing-member";
  public static readonly Plan = "/membership/register/plan";
  public static readonly Duration = "/membership/register/duration";
  public static readonly Personal = "/membership/register/personal";
  public static readonly Beneficiaries = "/membership/register/beneficiaries";
  public static readonly Dependencies = "/membership/register/dependencies";
  public static readonly Payment = "/membership/payment";
  public static readonly Summary = "/membership/summary";
  public static readonly MembershipSignUpComplete = "/membership/complete";

  // Dashboard Routes
  public static readonly Overview = "/dashboard/individual/overview";
  public static readonly BillingPayment = "/dashboard/individual/plan_billing";
  public static readonly Inbox = "/dashboard/individual/inbox";
  public static readonly Reports = "/dashboard/individual/reports";
  public static readonly Support = "/dashboard/individual/support";

  // Other Routes
  public static readonly BeneficiariesList = "/beneficiaries";
  public static readonly DependentsList = "/dependants";
  public static readonly ContactForm =
    "/dashboard/individual/support/contact-form";
  public static readonly UpgradeMembership = "/upgrade-membership";
}
