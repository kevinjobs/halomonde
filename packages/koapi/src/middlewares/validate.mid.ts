import koa from 'koa';
import Ajv from 'ajv';
import Localize from 'ajv-i18n';
import addFormats from 'ajv-formats';
import { pick, ApiError } from '../utils';
import httpStatus from 'http-status';
import { IRoute } from '@/types';

export default function (validation: IRoute['validation']) {
  const schema = validation;
  const validSchema = pick(schema, ['params', 'body', 'query']);
  
  return async (ctx: koa.Context, next: koa.Next) => {
    const objects = pick(ctx.request, Object.keys(validSchema));
    const errors = [];

    const ajv = new Ajv();
    // 添加更多校验格式
    addFormats(ajv);

    for (let key in objects) {
      const validate = ajv.compile(validSchema[key]);
      // 进行校验
      const valid = validate(objects[key]);
      // 使用中文显示错误信息
      Localize.zh(validate.errors);

      if (!valid) {
        errors.push(...validate.errors.map(err => {
          return err.message;
        }));
      }
    }

    if (errors.length > 0) {
      const errorMsg = errors.join(', ');
      throw new ApiError(httpStatus.BAD_REQUEST, errorMsg);
    } else {
      await next();
    }
  }
}
