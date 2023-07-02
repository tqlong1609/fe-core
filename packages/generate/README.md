# Generate v0.0.5

The Generate library supports generating javascript code to serve the common features in front end.

## Table of Contents

- [Redux setup](#redux-setup)
- [useCopyToClipboard](#copy-to-clipboard-hook)
- [useCopyClipboardComponentImage](#copy-clipboard-component-image-hook)
- [useSessionStorageTabs](#session-storage-tabs-hook)

### Redux setup

Note: Not ready to use

---

generate redux setup code

```
npx @tqlong1609/generate --generate redux
```

### Copy To Clipboard Hook

---

Copy text clipboard

Install

```
npx @tqlong1609/generate --generate hooks --type copy-clipboard
```

Example

```
import { useCopyToClipboard } from './useCopyToClipboard.ts';

function Home() {
  const [copiedText, copy] = useCopyToClipboard();
  return (
    <>
      <button
        onClick={() => {
          copy('hello123');
        }}
      >
        Click
      </button>
      {copiedText}
    </>
  );
}

```

### Copy Clipboard Component Image Hook

---

Copy image clipboard of the React component

Install

```
npx @tqlong1609/generate --generate hooks --type copy-clipboard-component-image
```

Example

```
import { useCopyComponentImageToClipboard } from './useCopyComponentImageToClipboard.ts';

function Home() {
  const [printRef, { handleDownloadImage }] = useCopyComponentImageToClipboard();

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
        <div>Hello World!</div>
      </div>
    </>
  );
}
```

### Session Storage Tabs Hook

---

All tabs in your browser will have access tokens synced with each other

Install

```
npx @tqlong1609/generate --generate hooks --type session-storage-tabs
```

Example

```
import {
  useSessionStorageTabs,
  putSessionStorageTabs,
} from './useSessionStorageTabs.ts';

const key = 'token';

function Home() {
  const { token } = useSessionStorageTabs(key);
  return (
    <>
      <button
        onClick={() => {
          putSessionStorageTabs({
            key: key,
            value: 'my-token',
          });
        }}
      >
        Click
      </button>
      <div>value: {token}</div>
    </>
  );
}
```

## Author

Name: Tran Quang Long

Email: tqlong1609@gmail.com
