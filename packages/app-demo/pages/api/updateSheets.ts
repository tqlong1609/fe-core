import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json({
      message: 'success',
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default handler;
