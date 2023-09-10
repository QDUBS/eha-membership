export class ApiRoutes {
  public static readonly corporateUserApiRoute = "/api/users/corporate";
  public static readonly corporateUserJobApiRoute = "/api/jobs/corporate";
  public static readonly corporateUserRatingRoute =
    "/api/jobs/candidates/rating";
  public static readonly corporateAllCandidatesApiRoute =
    "/api/jobs/candidates/all";
  public static readonly corporateCandidatesApiRoute = "/api/jobs/candidates";
  public static readonly individualUserApiRoute = "/api/users/individual";
  public static readonly getAllJobsApiRoute = "/api/jobs/all";
  public static readonly getAllPublishedJobsApiRoute =
    "/api/jobs/all/published";
  public static readonly applyToJobApiRoute = "/api/jobs/apply";
  public static readonly deleteJobApplicationApiRoute = "/api/jobs/delete";
  public static readonly createJob = "/api/jobs";
  public static readonly updateJob = "/api/jobs/update";

  public static readonly profileCulture = "/api/profile/culture";
  public static readonly profileIndividual = "/api/profile/individual";
  public static readonly profilePreferences = "/api/profile/preferences";

  public static readonly uploadFile = "/api/upload";
  public static readonly uploadResume = "/api/upload/resume";
  public static readonly uploadCoverLetter = "/api/upload/cover-letter";

  public static readonly contactsApiRoute = "/api/contacts";
  public static readonly contactsRequestApiRoute = "/api/contacts/request";
  public static readonly messagingSocketApiRoute = "/api/contacts/messaging";
  public static readonly messagingSocketChatApiRoute =
    "/api/contacts/messaging/chat";
  public static readonly conversationApiRoute =
    "/api/contacts/messaging/conversation";
  public static readonly chatUserApiRoute = "/api/contacts/messaging/user";
  public static readonly validateContactConversationApiRoute =
    "/api/contacts/messaging/validate";

  public static readonly youtubeVideoApiRoute =
    "https://www.youtube.com/watch?v=KFl0hLakN0I";

  // Routes Methods
  public static jobDetail(jobId: string): string {
    return `/api/jobs/detail?id=${jobId}`;
  }

  public static signupCorporateProfileApiRoute(email: string): string {
    return `/api/user?email=${email}`;
  }
}
