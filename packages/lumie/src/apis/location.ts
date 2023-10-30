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
  try {
    const resp = await api.get(LOC_URL, {params: {lat, lng}});
    if (resp.data.code === 200) return resp.data.data;
    return;
  } catch (e) {
    return;
  }
}