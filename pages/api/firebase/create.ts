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
      const { displayName, email, password , role } = req.body

      if (!displayName || !password || !email || !role) {
          return res.status(400).send({ message: 'Missing fields' })
      }


      const { uid } = await admin.auth().createUser({
          displayName,
          password,
          email
      })
      await admin.auth().setCustomUserClaims(uid, { role })

      return res.status(201).send({ uid })
  } catch (err) {
      console.log(err)
      return handleError(res, err)
  }
}

function handleError(res: NextApiResponse, err: any) {
  return res.status(500).send({ message: `${err.code} - ${err.message}` });
}