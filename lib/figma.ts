import { APP_URL } from "./constants";

export const FIGMA_API_ENDPOINT = "https://api.figma.com/v1";
export const FIGMA_TOKEN_ENDPOINT = `${FIGMA_API_ENDPOINT}/oauth/token`;
export const FIGMA_OAUTH_CALLBACK_URL = `${APP_URL}/figma/oauth/callback`;
export const DEFAULT_TOKEN_EXPIRES_IN = 86400;

export const getFigmaOAuthUrl = ({
  redirectUrl,
  scope,
  state,
}: {
  redirectUrl: string;
  scope: string;
  state: string;
}) =>
  `https://www.figma.com/oauth?client_id=${process.env.FIGMA_CLIENT_ID}&redirect_uri=${redirectUrl}&scope=${scope}&state=${state}&response_type=code`;
