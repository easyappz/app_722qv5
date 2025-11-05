import { getMe, updateMe } from './auth';

export { getMe, updateMe };

export const myAds = async () => {
  const profile = await getMe();
  return profile?.ads || [];
};
