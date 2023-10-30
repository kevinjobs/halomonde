import jwt from 'jsonwebtoken';
import Koa from 'koa';
import config from '../configs';
import { IUser } from '../types';

export default function Auth(level = 5) {
  return async function (ctx: Koa.Context, next: Koa.Next) {
    const authToken = ctx.headers['authorization'];

    if (!authToken) ctx.throw(400, 'No token given.');

    if (!isLegalToken(authToken)) ctx.throw(400, 'Only accept Bearer token.');

    const token = extractToken(authToken);
    const user = verifyToken(token) as IUser;

    if (!user) ctx.throw(400, 'Invalid token.');
    
    // 判断用户等级是否满足，数值越小，权限越大
    if (user["role"] > level) ctx.throw(400, '权限不足');
    
    await next();
  }
}

/**
 * 判断 token 是否合法
 * @param token 原始 token 字符
 * @returns boolean
 */
const isLegalToken = (token: string) => {
  const parts = token.split(' ');
  const type = parts[0];
  return type.toLowerCase() === 'bearer';
}

/**
 * 取出 token 字符部分
 * @param token 原始 token 字符 
 * @returns 
 */
const extractToken = (token: string) => {
  const parts = token.split(' ');
  return parts[1];
}

/**
 * 校验 token 以判断用户是否登录，未登录或过期均无法通过校验
 * @param token 需要被校验的字符
 * @returns 校验结果
 */
const verifyToken = (token: string) => {
  return jwt.verify(token, config.token.secret);
}
