import { GetServerSidePropsContext, PreviewData } from 'next';
import { parseCookies } from 'nookies';
import { ParsedUrlQuery } from 'querystring';

import { Address } from '@/domain/address/models/address';

const latDeafult = process.env.NEXT_PUBLIC_DEFAULT_LAT as string;
const longDeafult = process.env.NEXT_PUBLIC_DEFAULT_LONG as string;

interface IHeaders {
  headers: {
    'Content-Type': string;
    'x-farmaciasapp-locationlatitude': string;
    'x-farmaciasapp-locationlongitude': string;
  };
}

interface IHeadersLegacy {
  headers: {
    'Content-Type': string;
    'X-Client-Latitude': string;
    'X-Client-Longitude': string;
  };
}

export const getGeolocationHeaders = (
  context:
    | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    | undefined = undefined,
): IHeaders => {
  const { 'fapp.address': cookieAddress } = parseCookies(context);
  const parseAddress: Pick<Address, 'lat' | 'long'> = {} as Address;
  const dataHeaders: IHeaders = {
    headers: {
      'Content-Type': 'application/json',
      'x-farmaciasapp-locationlatitude': latDeafult,
      'x-farmaciasapp-locationlongitude': longDeafult,
    },
  } as IHeaders;
  try {
    const address: Address = JSON.parse(decodeURIComponent(cookieAddress));
    parseAddress.lat = address.lat;
    parseAddress.long = address.long;

    dataHeaders.headers['x-farmaciasapp-locationlatitude'] =
      address.lat || latDeafult;
    dataHeaders.headers['x-farmaciasapp-locationlongitude'] =
      address.long || longDeafult;
  } catch {
    dataHeaders.headers['x-farmaciasapp-locationlatitude'] = latDeafult;
    dataHeaders.headers['x-farmaciasapp-locationlongitude'] = longDeafult;
  }
  return dataHeaders;
};

export const legacyGetGeolocationHeaders = (): IHeadersLegacy => {
  const { 'fapp.address': cookieAddress } = parseCookies();
  const parseAddress: Pick<Address, 'lat' | 'long'> = {} as Address;
  const dataHeaders: IHeadersLegacy = {
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Latitude': latDeafult,
      'X-Client-Longitude': longDeafult,
    },
  } as IHeadersLegacy;
  try {
    const address: Address = JSON.parse(decodeURIComponent(cookieAddress));
    parseAddress.lat = address.lat;
    parseAddress.long = address.long;

    dataHeaders.headers['X-Client-Latitude'] = address.lat || latDeafult;
    dataHeaders.headers['X-Client-Longitude'] = address.long || longDeafult;
    dataHeaders.headers['Content-Type'] = 'application/json';
  } catch {
    dataHeaders.headers['X-Client-Latitude'] = latDeafult;
    dataHeaders.headers['X-Client-Longitude'] = longDeafult;
  }
  return dataHeaders;
};
