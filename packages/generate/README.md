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

### useCountDown

---

The useCountdown hook is useful for creating a countdown timer. By specifying an endTime and various options such as the interval between ticks and callback functions for each tick and completion, the hook sets up an interval that updates the count and triggers the appropriate callbacks until the countdown reaches zero. The countdown value is returned, allowing you to easily incorporate and display the countdown in your components.

Install

```
npx @tqlong1609/generate --generate hooks --type count-down
```

Example

```
import {
  useCountDown
} from './useCountDown.ts';

function Home() {
  const { minute, second, handleStart } = useCountDown();
  return (
    <>
      <button
        onClick={() => {
          handleStart()
        }}
      >
        Start
      </button>
      <div>{minute}:{second} mins</div>
    </>
  );
}
```

### useInterval

---

The useInterval hook provides a convenient way to create and manage intervals. The hook sets up an interval that repeatedly invokes the callback function at the specified interval. The interval is automatically cleared when the component unmounts or when the interval duration changes. This hook is useful for scenarios where you need to perform a certain action or update the component periodically, such as polling for data updates or implementing animations.

Install

```
npx @tqlong1609/generate --generate hooks --type interval
```

Example

```
import {
  useInterval
} from './useInterval.ts';

const TIME_COUNT = 1000;

function Home() {
  const [secondsRemaining, setSecondsRemaining] = useState(120);
  useInterval(
    () => {
      setSecondsRemaining(pre => pre - 1)
    },
    TIME_COUNT
  );
  return (
    <>
      <div>{secondsRemaining}</div>
    </>
  );
}
```

## Author

Name: Tran Quang Long

Email: tqlong1609@gmail.com
