The Generate library supports generating javascript code to serve the common features in front end.

## 📃Table of Contents

🪝Hooks:

- [useCopyToClipboard](#copy-to-clipboard-hook)
- [useCopyClipboardComponentImage](#copy-clipboard-component-image-hook)
- [useSessionStorageTabs](#session-storage-tabs-hook)
- [useCountDown](#count-down-hook)
- [useInterval](#interval-hook)
- [useQueryParams](#query-params-hook)

💼 Modules:

- [services](#services)

🎲 Functions:

- [location-state-singleton](#location-state-singleton)

### Hooks

#### Copy To Clipboard Hook

---

🚀 Description:

Copy text clipboard

🗝️ Install:

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

#### Copy Clipboard Component Image Hook

---

🚀 Description:

Copy image clipboard of the React component

🗝️ Install:

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

#### Session Storage Tabs Hook

---

🚀 Description:

All tabs in your browser will have access tokens synced with each other

🗝️ Install:

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

#### Count Down Hook

---

🚀 Description:

The useCountdown hook is useful for creating a countdown timer. By specifying an endTime and various options such as the interval between ticks and callback functions for each tick and completion, the hook sets up an interval that updates the count and triggers the appropriate callbacks until the countdown reaches zero. The countdown value is returned, allowing you to easily incorporate and display the countdown in your components.

🗝️ Install:

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

#### Interval Hook

---

🚀 Description:

The useInterval hook provides a convenient way to create and manage intervals. The hook sets up an interval that repeatedly invokes the callback function at the specified interval. The interval is automatically cleared when the component unmounts or when the interval duration changes. This hook is useful for scenarios where you need to perform a certain action or update the component periodically, such as polling for data updates or implementing animations.

🗝️ Install:

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

#### Query Params Hook

---

🚀 Description:

The useQueryParams hook used to interact with the query parameters of the current URL in a Next.js application.

🗝️ Install:

```
npx @tqlong1609/generate --generate hooks --type query-params
```

🤖 Functions:

The useQueryParams hook returns two functions:

getQueryParam(queryName: string): This function takes a query parameter name as an argument and returns its value from the current URL's search parameters.

setQueryParam(queryName: string, value: string): This function takes a query parameter name and a value as arguments. It updates the current URL's search parameters with the provided name-value pair. If the value is falsy, the query parameter is removed.

🫰 Usage:

You can use this hook in your Next.js components to easily get and set URL query parameters. This can be useful for implementing features like filters or search functionality where you want to reflect the current state in the URL.

🚨Note: The setQueryParam function uses the router.replace method to update the URL without adding a new entry to the history stack. This means that using the browser's back button won't undo the changes made by setQueryParam.

⚓ Example:

```
import {
  useQueryParams
} from './useQueryParams.ts';

const TIME_COUNT = 1000;

function Home() {
  const [queryParams, setQueryParams] = useQueryParams();

  const selected = queryParams('selected') || '';
  const search = queryParams('search') || '';

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setQueryParams('selected', event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(evt) => {
          setQueryParams('search', evt.target.value);
        }}
      />
      <select value={selected} onChange={onSelect}>
        <option value="">None</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          setQueryParams('search', search);
        }}
      >
        Click
      </button>
    </div>
  );
}
```

### Modules

#### Services

---

🚀 Description:

The "services" module is a pre-configured service structure designed for reuse across projects that require service setup. It streamlines the process of making API calls using Axios and also offers the capability to mock API responses.

Features:

1. Axios Integration: The module is equipped with Axios, a popular JavaScript library for making HTTP requests. It simplifies the process of connecting to APIs, handling requests, and managing responses.

2. API Calls: You can easily initiate API calls within your projects by leveraging the pre-configured Axios instance provided by this module. This simplifies the setup process, making it quicker to integrate external services.

3. API Response Mocking: The module includes tools for mocking API responses. This feature is invaluable for testing, development, and debugging when real API endpoints are unavailable or undesirable to use.

4. Validate Response: Ensure the consistency of data between the frontend and backend of your application. It serves as a validation layer that verifies and synchronizes data types, helping to prevent data inconsistencies and errors

🗝️ Install:

```
npx @tqlong1609/generate --generate modules --type services
```

How to use:

To start using the "services" module in your project, follow these steps:

Setup: Install the module as a dependency in your project:

```
npm install axios
npm install axios-mock-adapter --save-dev
npm install zod
```

Structure folder

```
services/
├──__mock__/
├── config/
├── entities/
├── lib/
├── index.ts
└── Services.ts
```

Initialization:

Import the module and initialize it in your project. Ensure that you configure it with the necessary API endpoints and other options specific to lib folder base on Services file. You also can define schema for validation response

Example: AuthService

```
interface IAuthService {
  get loginUrl(): string;
  login(data: LoginParams): Promise<AuthenticationResponse>;
}

export class AuthService extends Services implements IAuthService {
  url: string = API_URL + '/auth';
  abortController?: AbortController;

  loginUrl: string = this.url + '/login';

  login = async (data: LoginParams): Promise<AuthenticationResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        LoginParams,
        typeof authenticationResponseSchema,
        AuthenticationResponse
      >({
        method: 'POST',
        url: this.loginUrl,
        schema: authenticationResponseSchema,
        data,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return {
        message: response.message,
        token: response.token,
      };
    } catch (error) {
      if (this.isCancel(error)) {
        // Handle other errors
        throw error;
      } else if (isAxiosError(error)) {
        throw new Error(
          error.response ? error.response.data.message : unknownError
        );
      }
      throw new Error(unknownError);
    }
  };
}
```

Making API Calls:

```
const authServices = new AuthService()

authServices.login({
  email: 'tqlong1609@gmail.com', password: '123456', isRememberMe: true
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})

```

### Functions

#### Location State Singleton

---

🚀 Description:

The LocationStateSingleton is a TypeScript class that provides a singleton instance to manage location state in your application. It is located in the LocationStateSingleton.ts file.

🗝️ Install:

```
npx @tqlong1609/generate --generate functions --type location-state-singleton
```

How to use:

- `getInstance()`: This static method returns the singleton instance of the LocationStateSingleton class. If the instance does not exist, it creates one.

- `pushValue(key: string, value: any)`: This method adds a new key-value pair to the map.

- `popValue(key: string)`: This method retrieves the value associated with the provided key and removes it from the map.

- `getValue(key: string)`: This method retrieves the value associated with the provided key without removing it from the map.

Example

```
import { LocationStateSingleton, KEY_I } from './LocationStateSingleton';

// Get the singleton instance
const locationState = LocationStateSingleton.getInstance();

// Add a value to the map
locationState.pushValue(KEY_I, 'value');

// Get a value from the map
const value = locationState.getValue(KEY_I);

// Remove a value from the map and get its value
const poppedValue = locationState.popValue(KEY_I);
```

## Author

Name: Tran Quang Long

Email: tqlong1609@gmail.com

Linkedin: https://www.linkedin.com/in/tranlongdev/

Facebook: https://www.facebook.com/tqlong1609

Instagram: https://www.instagram.com/tqlong1609/
