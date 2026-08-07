import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
} from '@commercetools/ts-client';

export const projectKey = process.env.CTP_PROJECT_KEY ?? '';

const scopes = [process.env.CTP_SCOPES ?? ''];
const host = process.env.CTP_AUTH_URL ?? '';
const apiUrl = process.env.CTP_API_URL ?? '';
const clientId = process.env.CTP_CLIENT_ID ?? '';
const clientSecret = process.env.CTP_CLIENT_SECRET ?? '';

if (!projectKey || !host || !scopes || !apiUrl || !clientId || !clientSecret) {
  throw new Error('ENV VARIABLES NOT FOUND!');
}

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  httpClient: fetch,
};

const httpAPIHTTPMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiUrl,
  httpClient: fetch,
};

export const ctpClientHTTPAPI = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpAPIHTTPMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const httpApiRoot = createApiBuilderFromCtpClient(ctpClientHTTPAPI).withProjectKey({
  projectKey,
});
