import { ArticlesSheets } from '@tqlong1609/functions';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = JSON.parse(req.body) as {
      numberOfRows: number;
    };
    await ArticlesSheets.removeSheets(data.numberOfRows);
    res.status(200).json({
      message: 'Remove success',
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default handler;
