import { usePrintComponentImage } from '@tqlong1609/hooks';

export function Home() {
  const [printRef, { handleDownloadImage }] = usePrintComponentImage();

  return (
    <>
      <button
        onClick={() => {
          handleDownloadImage(() => {
            alert('success');
          });
        }}
      >
        Click
      </button>
      <div ref={printRef}>
        <img
          src="tree-736885_1280.jpg"
          alt="image"
          width={'500px'}
          height={'500px'}
        />
        <div>xin chao hello</div>
      </div>
    </>
  );
}

export default Home;
