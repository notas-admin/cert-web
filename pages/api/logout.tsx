
import {unsetAuthCookies} from 'next-firebase-auth';
import initAuth from '../../initAuth'; // the module you created above
import type {NextApiRequest, NextApiResponse} from 'next';

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await unsetAuthCookies(req, res);
  } catch (e) {
    console.log(e);
    return res.status(500).json({error: 'Unexpected error.'});
  }
  return res.status(200).json({success: true});
};

export default handler;
