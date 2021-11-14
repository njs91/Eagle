import React, { useEffect, useState } from 'react';
import { Page } from '../components/Page';
import { testApiMeta } from './MetaTags';

interface Data {
  id: number;
  notes: string;
}

const TestApiPage: React.VFC = () => {
  const [data, setData] = useState<null | Array<Data>>(null);

  const getData = async (): Promise<void> => {
    // add try/catch for using errors
    // const response = await fetch('http://127.0.0.1:8000/api/pages'); // not needed due to proxy in package.json
    const response = await fetch('/api/pages');
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  if (!data?.length) {
    return <p>No data could be fetched</p>;
  }

  console.log('data: ', data);

  return (
    <Page meta={testApiMeta}>
      <h1>Test API Page</h1>
      <p>See JS console for the data.</p>
    </Page>
  );
};

export default TestApiPage;
