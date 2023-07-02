import {
  useSessionStorageTabs,
  putSessionStorageTabs,
} from '@tqlong1609/hooks';

const key1 = 'abc1';

export function Home() {
  const { token } = useSessionStorageTabs(key1);
  return (
    <>
      <button
        onClick={() => {
          putSessionStorageTabs({
            key: key1,
            value: 'hello1',
          });
        }}
      >
        Click
      </button>
      <div>value: {token}</div>
    </>
  );
}

export default Home;
