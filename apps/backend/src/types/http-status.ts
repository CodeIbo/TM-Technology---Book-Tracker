export interface HttpStatusDetail {
  code: number;
  status: string;
}

export type HttpMethod = 'GET' | 'POST' | 'PATCH';

export type HttpStatusCodeKey =
  | 'OK'
  | 'CREATED'
  | 'NO_CONTENT'
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER_ERROR';

type HttpStatusModel = Record<HttpStatusCodeKey, HttpStatusDetail>;

const HttpStatusCodes: HttpStatusModel = {
  OK: { code: 200, status: 'OK' },
  CREATED: { code: 201, status: 'Created' },
  NO_CONTENT: { code: 204, status: 'No Content' },
  BAD_REQUEST: { code: 400, status: 'Bad Request' },
  NOT_FOUND: { code: 404, status: 'Not Found' },
  INTERNAL_SERVER_ERROR: { code: 500, status: 'Internal Server Error' },
};

export default HttpStatusCodes;
