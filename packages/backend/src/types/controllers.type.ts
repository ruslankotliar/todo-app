// eslint-disable-next-line import/no-extraneous-dependencies
import { ParamsDictionary } from 'express-serve-static-core';
import { Request } from 'express';

interface TypedRequestBody<T> extends Request {
  body: T;
}

interface TypedRequestParams<T extends ParamsDictionary> extends Request {
  params: T;
}

export type { TypedRequestBody, TypedRequestParams };
