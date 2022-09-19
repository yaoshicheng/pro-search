import axios from 'axios';

export type Option = {code: string, name: string, children?: Option[]}

export const getSACbyProvinceName = (provinceName: string): Promise<Option[]> => axios.get(
  `${location.protocol}//static-website.xforceplus.com/chinese-pcas/${encodeURIComponent(provinceName)}.json`,
  {
    withCredentials: false,
  },
)
  .then(response => response.data?.children)
  .catch((error) => {
    window.console.error(error);
  });
