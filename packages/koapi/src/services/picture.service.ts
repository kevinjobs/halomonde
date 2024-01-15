import httpStatus from 'http-status';

/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-03-16 11:27:01
 * @LastEditTime : 2022-03-18 11:56:38
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \koa-restful-api\src\services\picture.service.ts
 * @Description  : 
 */
import { IPicture, } from '@/types';

import { PictureModel, } from '../db/models';
import { ApiError, } from '../utils';

export default class PictureService {
  static async getOneByUid(uid: string) {
    const result = await PictureModel.findOne({where: {uid}});
    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Cannot find picture. uid: ${uid}`);
    } else return result;
  }

  static async addOne(picture: IPicture) {
    const result = await PictureModel.create(picture);
    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Add new picture failed.`);
    } else return result;
  }

  static async updateOneByUid(uid: string, picture: IPicture) {
    const [result] = await PictureModel.update(picture, {where: {uid}});
    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Update picture: ${uid} failed`);
    } else return result;
  }

  static async deleteOneByUid(uid: string) {
    const result = await PictureModel.destroy({where: {uid: uid}});
    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Cannot find the picture: ${uid}`);
    } else return result;
  }

  static async getAll(offset: number, limit: number, orderBy: string, order: string) {
    const { count, rows } = await PictureModel.findAndCountAll({
      order: [
        [orderBy as string, order as string],
      ],
      offset: Number(offset),
      limit: Number(limit),
    });
    if (rows.length < 0) {
      throw new ApiError(httpStatus.NO_CONTENT, 'No Picture')
    } else {
      return {
        rows,
        totals: count,
        offset: offset,
        limit: limit
      }
    }
  }
}
