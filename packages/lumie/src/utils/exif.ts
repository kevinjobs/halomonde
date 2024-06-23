import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ExifReader, { Tags as ExifTags } from 'exifreader';

export async function getExifs(file: File) {
  const tags = await ExifReader.load(file);
  return extractExifs(tags);
}

dayjs.extend(customParseFormat);

export type IExif = {
  createDate: number;
  modifyDate: number;
  fileType: string;
  iso: number;
  width: number;
  height: number;
  lens: string;
  focalLength: string;
  focalNumber: string;
  exposure: string;
  model: string;
  /** gps */
  gpsLatitude: number;
  gpsLongitude: number;
  gpsAltitude: string;
  gpsAltitudeRef: string;
  gpsLongitudeRef: string;
  gpsLatitudeRef: string;
  /**  */
  orientation: number;
};

const extractExifs = (exif: ExifTags): IExif => {
  console.log(exif);

  let createDate;

  if (exif.DateTime?.description) {
    createDate = dayjs(
      exif['DateTime']?.description,
      'YYYY:MM:DD HH:mm:ss',
      true,
    ).unix();
  } else if (exif.CreateDate.description) {
    createDate = dayjs(exif['CreateDate']?.description).unix();
  }

  const modifyDate = dayjs(exif.ModifyDate?.value).unix();

  const fileType = exif.FileType?.value;
  const iso = Number(exif.ISOSpeedRatings?.value);

  let width = exif['Image Width']?.value | exif.ImageWidth?.value;
  let height = exif['Image Height']?.value | exif.ImageHeight?.value;

  const lens = exif.LensModel?.description;
  const focalLength = exif.FocalLength?.description;
  const focalNumber = exif.FNumber?.description;
  const exposure = exif.ExposureTime?.description;
  const model = exif.Model?.description;

  const gpsLatitude = Number(exif.GPSLatitude?.description);
  const gpsLongitude = Number(exif.GPSLongitude?.description);
  const gpsAltitude = exif.GPSAltitude?.description;
  const gpsAltitudeRef = exif.GPSAltitudeRef?.description;
  const gpsLongitudeRef = exif.GPSLongitudeRef?.description;
  const gpsLatitudeRef = exif.GPSLatitudeRef?.description;

  // bug: 部分图片的方向不对到导致读取的长宽对调
  // fixed: 2024-06-23
  // by: Kevin Jobs
  // see: https://www.cnblogs.com/csonezp/p/5564809.html
  const orientation = Number(exif.Orientation?.value);
  // 下列数值表示图片发生了90度的旋转
  if ([5, 6, 7, 8].includes(orientation)) {
    [width, height] = [height, width];
  }

  return {
    createDate,
    modifyDate,
    fileType,
    iso,
    width,
    height,
    lens,
    focalLength,
    focalNumber,
    exposure,
    model,
    gpsAltitude,
    gpsAltitudeRef,
    gpsLongitude,
    gpsLongitudeRef,
    gpsLatitude,
    gpsLatitudeRef,
    orientation,
  };
};
