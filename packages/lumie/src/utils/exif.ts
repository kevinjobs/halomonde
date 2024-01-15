import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ExifReader, { Tags as ExifTags, } from 'exifreader';

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
}

const extractExifs = (exif: ExifTags): IExif => {
  // TODO: 部分图片的方向不对到导致读取的长宽对调
  const createDate = dayjs(exif['DateTime']?.description, 'YYYY:MM:DD HH:mm:ss', true).unix();
  const modifyDate = dayjs(exif.ModifyDate?.value).unix();
  const fileType = exif.FileType?.value;
  const iso = Number(exif.ISOSpeedRatings?.value);
  const width = exif['Image Width']?.value | exif.ImageWidth?.value;
  const height = exif['Image Height']?.value | exif.ImageHeight?.value;
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
  };
}
