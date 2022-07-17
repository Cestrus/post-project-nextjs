import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

export type ContactDataType = {
  _id?: ObjectId;
  email: string;
  name: string;
  message: string;
};

export type ResponseDataType = {
  message: string;
  body?: ContactDataType;
};

const handler: NextApiHandler<ResponseDataType> = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType>
) => {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;
    const connectionUrl = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_claster}.3ozfb.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newMessage: ContactDataType = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(connectionUrl);
    } catch (err) {
      res.status(500).json({ message: 'Could not connect to mongoDb!' });
      return;
    }

    const db = client.db();

    try {
      await db.collection('messages').insertOne(newMessage);
    } catch (err) {
      client.close();
      res.status(500).json({ message: 'Could not send message!' });
      return;
    }

    res.status(201).json({ message: 'Success', body: newMessage });
  }
};

export default handler;
