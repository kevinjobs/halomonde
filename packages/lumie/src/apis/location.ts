import api from "@/utils/axios"

const LOC_URL = 'https://api.kertennet.com/geography/locationInfo';

export interface Location {
  address?: string;
  province?: string;
  distance?: string;
  city?: string;
  streetNumber?: string;
  street?: string;
  district?: string;
  direction?: string;
}

export async function getLocation(lat: number, lng: number) :Promise<Location> {
  return;
}