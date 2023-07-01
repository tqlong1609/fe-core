import { useCopyToClipboard } from '@tqlong1609/hooks';
export function Home() {
  const [copiedText, copy] = useCopyToClipboard();
  return (
    <>
      <button
        onClick={() => {
          copy('hello123 12 1233');
        }}
      >
        Click
      </button>
      {copiedText}
      {/* <Presentational /> */}
    </>
  );
}

export default Home;
