import {
  useSessionStorageTabs,
  putSessionStorageTabs,
} from '@tqlong1609/hooks';

const key1 = 'abc1';

export function Home() {
  const { token: token1 } = useSessionStorageTabs(key1);
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
        Click 1
      </button>
      <div>value 1: {token1}</div>
    </>
  );
}

export default Home;
