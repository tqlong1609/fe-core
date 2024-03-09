import React, { FormEvent, useState } from 'react';
import { transformArray } from '../utils';
import { ArticlesSheets } from '@tqlong1609/functions';

export async function getServerSideProps() {
  const response = (await ArticlesSheets.getSheets()) as any;
  const formattedData = transformArray(response.data.values as any[]);
  return {
    props: {
      data: formattedData,
    },
  };
}

type ArticlesType = {
  ID: string;
  Title: string;
  Author: string;
  Date: string;
  Content123?: string;
};

const index: React.FC<{
  data: ArticlesType[];
}> = ({ data: initData }) => {
  const [data, setData] = useState<ArticlesType[]>(initData);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const Title = formData.get('title');
      const Author = formData.get('author');
      const Date = formData.get('date');
      const Content123 = formData.get('content123');

      const responseFetch = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify({
          Title,
          Author,
          Date,
          Content123,
        }),
      });
      const { response } = (await responseFetch.json()) as {
        status: string;
        response: ArticlesType;
      };
      setData([
        ...data,
        {
          ID: response.ID,
          Title: response.Title,
          Author: response.Author,
          Date: response.Date,
          Content123: response.Content123,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  const onDelete = async (id: string) => {
    try {
      const numberOfRows = data.findIndex((item) => item.ID === id) + 1;
      if (!numberOfRows) return;

      await fetch('/api/removeSheets', {
        method: 'POST',
        body: JSON.stringify({
          numberOfRows: numberOfRows + 1,
        }),
      });
      const newData = data.filter((item) => item.ID !== id);
      setData(newData);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: ArticlesType) => (
            <tr key={item.ID}>
              {Object.keys(item).map((key) => (
                <td key={key}>
                  <p>{item[key as keyof ArticlesType]}</p>
                </td>
              ))}
              <td>
                <button onClick={() => onDelete(item.ID)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" name="author" />
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" />
        <label htmlFor="content123">Content123:</label>
        <textarea id="content123" name="content123"></textarea>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default index;
