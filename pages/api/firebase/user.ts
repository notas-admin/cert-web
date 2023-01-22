import * as admin from 'firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'
import certificado from '../../../cert-web.json'

  if (!admin.apps.length){
    admin.initializeApp({
            //@ts-ignore
            credential: admin.credential.cert(certificado),
            databaseURL: "painel-cert-hm.appspot.com",
            projectId: process.env.APP_ID});
  }


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
      const users = await admin.auth().listUsers();
      return res.status(200).send({ users })
  } catch (err) {
      return handleError(res, err)
  }
}

function handleError(res: NextApiResponse, err: any) {
  return res.status(500).send({ message: `${err.code} - ${err.message}` });
}