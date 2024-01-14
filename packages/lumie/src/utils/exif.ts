import dayjs from 'dayjs';
import ExifReader, { Tags as ExifTags } from 'exifreader';

export async function getExifs(file: File) {
  const tags = await ExifReader.load(file);
  return extractExifs(tags);
}

export type IExif = {
  createDate: number;
  modifyDate: number;
  fileType: string;
  iso: string;
  width: number;
  height: number;
  lens: string;
  focal: string;
  focalNumber: number;
  exposure: string;
  model: string;
}

const extractExifs = (exif: ExifTags) => {
  const createDate = dayjs(exif.CreateDate?.value).unix();
  const modifyDate = dayjs(exif.ModifyDate?.value).unix();
  const fileType = exif.FileType?.value;
  const iso = exif.ISOSpeedRatings?.value;
  const width = exif['Image Width']?.value | exif.ImageWidth?.value;
  const height = exif['Image Height']?.value | exif.ImageHeight?.value;
  const lens = exif.Lens?.value;
  const focal = exif.FocalLength?.description;
  const focalNumber = exif.FNumber?.description;
  const exposure = exif.ExposureTime?.description;
  const model = exif.Model?.description;
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
