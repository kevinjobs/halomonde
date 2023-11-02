import dayjs from 'dayjs';
import { Tags as ExifTags } from 'exifreader';

export function random_int(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}


export const extractExifs = (exif: ExifTags) => {
  const createDate = dayjs(exif.CreateDate.value).unix();
  const modifyDate = dayjs(exif.ModifyDate.value).unix();
  const fileType = exif.FileType.value;
  const iso = exif.ISOSpeedRatings.value;
  const width = exif['Image Width'].value;
  const height = exif['Image Height'].value;
  const lens = exif.Lens.value;
  const focal = exif.FocalLength.description;
  const focalNumber = exif.FNumber.description;
  const exposure = exif.ExposureTime.description;
  const model = exif.Model.description;
  return {
    createDate,
    modifyDate,
    fileType,
    iso,
    width,
    height,
    lens,
    focal,
    focalNumber,
    exposure,
    model,
  };
}