import { ArticlesSheets } from '@tqlong1609/functions';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getRandomIds } from 'packages/app-demo/utils/id';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = JSON.parse(req.body) as {
    Title: string;
    Author: string;
    Date: string;
    Content123: string;
  };
  const id = getRandomIds();
  const input: string[] = [
    id.toString(),
    data.Title,
    data.Author,
    data.Date,
    data.Content123,
  ];

  ArticlesSheets.appendSheets(input)
    .then(() => {
      res.status(200).json({
        status: 'success',
        response: {
          ID: id.toString(),
          Title: data.Title,
          Author: data.Author,
          Date: data.Date,
          Content123: data.Content123,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
}
