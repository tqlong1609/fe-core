The Generate library supports generating javascript code to serve the common features in front end.

## 📃Table of Contents

🪝Hooks:

- [useCopyToClipboard](#copy-to-clipboard-hook)
- [useCopyClipboardComponentImage](#copy-clipboard-component-image-hook)
- [useSessionStorageTabs](#session-storage-tabs-hook)
- [useInterval](#interval-hook)
- [useQueryParams](#query-params-hook)
- [useWindowSize](#window-size-hook)
- [useVisiblePage](#visible-page-hook)
- [useIsVisible](#is-visible-hook)
- [useIsMobile](#is-mobile-hook)

💼 Modules:

- [services](#services)
- [timer](#timer)
- [context](#context)
- [filter](#filter)
- [pagination](#pagination)
- [verify code phone](#verify-code-phone)

🎲 Functions:

- [location state singleton](#location-state-singleton)
- [create context by hook](#create-context-by-hook)
- [lazy load component](#lazy-load-component)
- [log error](#log-error)
- [cookies](#cookies)
- [sheets api](#sheets-api)

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

#### Window Size Hook

---

🚀 Description:

The useWindowSize hook is a custom React hook that provides the current window size.

🗝️ Install:

```
npx @tqlong1609/generate --generate hooks --type window-size
```

⚓ Example:

```
import { useWindowSize } from './useWindowSize';

export function Home() {
  const { height, width } = useWindowSize();
  return (
    <>
      <div>
        <p>Width: {width}</p>
        <p>Height: {height}</p>
      </div>
    </>
  );
}

export default Home;
```

#### Visible Page Hook

---

🚀 Description:

The `useVisiblePage` is a custom React hook that allows you to execute specific functions when the visibility of the page changes. This hook is particularly useful when you want to perform different actions based on whether the user is currently viewing the page or not.

🗝️ Install:

```
npx @tqlong1609/generate --generate hooks --type visible-page
```

❓ How it works:

`useVisiblePage` takes three parameters:

1. `visibleFn`: A function that will be executed when the page becomes visible.
2. `notVisibleFn`: A function that will be executed when the page becomes hidden.
3. `deps`: An array of dependencies that the effect will re-run when they change, similar to the dependency array in useEffect.

⚓ Example:

```
import { useVisiblePage } from './useVisiblePage';

function MyComponent() {
  useVisiblePage(
    () => console.log('Page is visible'),
    () => console.log('Page is hidden'),
  );

  // Rest of the component...
}
```

#### Is Visible Hook

---

🚀 Description:

The `useIsVisible` hook is a custom React hook that uses the Intersection Observer API to determine whether a given element is currently visible in the viewport. This value will be true if at least 25% of the element is visible, and false otherwise.

🗝️ Install:

```
npx @tqlong1609/generate --generate hooks --type is-visible
```

⚓ Example:

```
import { useRef } from 'react';
import { useIsVisible } from './useIsVisible';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref);

  return (
    <div ref={ref}>
      {isVisible ? 'I am visible!' : 'I am not visible.'}
    </div>
  );
}
```

#### Is Mobile Hook

---

🚀 Description:

The `useIsMobile` hook is a custom React hook that determines whether the viewport width is less than a certain breakpoint, indicating that the user is likely on a mobile device.

🗝️ Install:

```
npx @tqlong1609/generate --generate hooks --type is-mobile
```

⚓ Example:

```
import { useIsMobile } from './useIsMobile';

function MyComponent() {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? 'You are likely on a mobile device.' : 'You are likely not on a mobile device.'}
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

#### Timer

---

🚀 Description:

The Timer module is a part of the application that provides functionality related to countdown timer.

🗝️ Install:

```
npx @tqlong1609/generate --generate modules --type timer
```

🗝️ Dependencies:

- React for building the user interface.
- moment for handling dates and times.
- @tqlong1609/useVisiblePage

🤖 Usage:

`useCountDown`

- Is a custom React hook that provides functionality for a countdown timer.
- It's written in TypeScript and uses Web Workers to manage the countdown process in a separate thread.

```
const {
  timerWorker,
  secondsRemaining,
  minute,
  second,
  handleStart,
  handleStop,
  handleReset
}
= useCountDown(TIMER_SECOND);
```

`TimerBoxContainer`

- Is a container component for the TimerBox component.
- It manages the state and logic for a countdown timer.
- The timer's initial time and maximum count.
- Allowing it to persist across page refreshes.

```
import TimerBoxContainer from './timer';

export function Home() {
  const onTimeOff = () => {
    console.log('Time off');
  };
  return (
    <>
      <TimerBoxContainer onTimeOff={onTimeOff} />
    </>
  );
}

export default Home;
```

#### Context

---

🚀 Description:

This file exports a utility function createCtx that creates a React context with a built-in state. This can be useful when you want to create a context that holds some state.

🗝️ Install:

```
npx @tqlong1609/generate --generate modules --type context
```

🤖 Usage:

`createCtx`

- Creates a new context with built-in state. It takes a default value as a parameter and returns a tuple containing the context and a provider component for the context

```
import { createCtx } from '../context';
import { status } from './options';
import { FilterContextState } from './type';

export const defaultFilterState: FilterContextState = {
  status: status[0],
  dateRange: null,
  searchText: '',
  pager: {
    index: 0,
  },
};

const [ctx, Provider] = createCtx<FilterContextState>(defaultFilterState);
export const FilterContext = ctx;
export const FilterProvider = Provider;
```

#### Filter

---

🚀 Description:

Providing filtering functionality in your application

🗝️ Install:

```
npx @tqlong1609/generate --generate modules --type filter
```

🤖 Usage:

`withFilterContext`

- This file exports a higher-order component (HOC) withFilterContext that wraps a given component with the FilterProvider context provider

`useFilterQueryParams`

- The useFilterQueryParams hook is a custom React hook that provides functionality for managing filter query parameters.

- The hook returns an object with several functions that can be used to change specific query parameters or reset all query parameters.

```
import { useFilterQueryParams } from './useFilterQueryParams';

function MyComponent() {
  const {
    onChangeDateRange,
    onChangePagerIndex,
    onChangeSearchText,
    onChangeStatus,
    onResetFilter,
  } = useFilterQueryParams();

  // Use the functions here to change query parameters based on user interaction
}
```

`useFilterValues`

- The useFilterValues hook returns the state value from the FilterContext. This state is likely an object that represents the current filter settings in your application. The exact shape of this object will depend on how you've defined your FilterContext

```
import React from 'react';
import {
  useFilterQueryParams,
  withFilterContext,
  useFilterValues,
} from '../modules/filter';
import _ from 'lodash';

export function Home() {
  const { searchText } = useFilterValues();
  return (
    <div>
      <div>searchText {`${searchText}`} </div>
      <SearchText initValue={searchText} />
    </div>
  );
}

function SearchText({ initValue }: { initValue: string }) {
  const { onChangeSearchText } = useFilterQueryParams();
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    if (initValue === searchText) return;
    setSearchText(initValue);
  }, [initValue]);

  const onDebounceInput = React.useCallback(
    _.debounce((newValue) => {
      onChangeSearchText(newValue);
    }, 500),
    []
  );

  return (
    <input
      type="text"
      value={searchText}
      onChange={(e) => {
        setSearchText(e.target.value);
        onDebounceInput(e.target.value);
      }}
    />
  );
}

export default withFilterContext(Home);
```

#### Pagination

---

🚀 Description:

The Pagination component uses a PaginationData component to manage the state of the current page and to calculate the range of pages to display. It provides buttons for navigating to the first, previous, next, and last pages, as well as buttons for each individual page in the current range.

🗝️ Install:

```
npx @tqlong1609/generate --generate modules --type pagination
```

The Pagination component accepts the following props:

- onChangePage: An optional function that is called when the current page changes. The new page number is passed as an argument.
- currentPage: The current page number.
- itemPerPage: The number of items per page.
- totalPage: The total number of pages.

The PaginationData component accepts the following props:

- total: The total number of items.
- limit: The number of items per page.
- pageCount: The number of pages to display in the pagination interface.
- currentPage: The current page number.
- children: A function that renders the pagination interface. This function is passed an object with the current pagination state and a `getPageItemProps` function for generating the props for each page button.

🤖 Usage:

```
import Pagination from './Pagination';

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Pagination
      onChangePage={handlePageChange}
      currentPage={currentPage}
      itemPerPage={10}
      totalPage={50}
    />
  );
}
```

#### Verify Code Phone

---

🚀 Description:

A React component that provides an interface for inputting a verification code received via phone.

🗝️ Install:

```
npx @tqlong1609/generate --generate modules --type verify-code-phone
```

The VerifyCodePhone component accepts the following props:

- autoFocus: Determines whether the first input field should be auto-focused.
- inputProps: Additional props for the input fields.
- length: The length of the verification code.
- onChange: A function that is called when the value of an input field changes.
- onCompleted: A function that is called when the verification code is fully entered.
- placeholder: The placeholder for the input fields.
- type: The type of the verification code. It can be 'alphanumeric', 'number', or 'string'.
- value: The default value of the verification code.
- isLocked: Determines whether the input fields should be disabled.

🤖 Usage:

```
import { VerifyCodePhone } from './VerifyCodePhone';

function MyComponent() {
  const handleOnChange = (data: string) => {
    console.log('Changed:', data);
  };

  const handleOnCompleted = (data: string) => {
    console.log('Completed:', data);
  };

  return (
    <VerifyCodePhone
      autoFocus={true}
      length={6}
      onChange={handleOnChange}
      onCompleted={handleOnCompleted}
      placeholder="·"
      type="number"
      isLocked={false}
    />
  );
}
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

#### Create Context By Hook

---

🚀 Description:

The createContextByHook function is a utility function for creating a context using a custom hook in React

🗝️ Install:

```
npx @tqlong1609/generate --generate functions --type create-context-by-hook
```

Example

```
import { useState } from 'react';
import CreateContextByHook from '.';

type ExampleContext = {};

function useExample() {
  const [data, setData] = useState<ExampleContext>({});

  return { ...data, setData };
}

export const [ExampleProvider, useExampleContext] =
  CreateContextByHook(useExample);

const {} = useExampleContext();
```

#### Lazy Load Component

---

🚀 Description:

React component that lazily renders its children when they become visible in the viewport.

🗝️ Install:

```
npx @tqlong1609/generate --generate functions --type lazy-load-component
```

Example

```
import { LazyLoadComponent } from './LazyLoadComponent';

function MyComponent() {
  return (
    <LazyLoadComponent isMemo={true}>
      <div>Content that will be lazily loaded</div>
    </LazyLoadComponent>
  );
}
```

#### Log Error

---

🚀 Description:

React Higher Order Component that used for logging error and unhandled rejection events.

🗝️ Install:

```
npx @tqlong1609/generate --generate functions --type log-error
```

Example

```
import { withLogError } from '@tqlong1609/functions';
import React from 'react';

const index: React.FC = () => {
  return (
    <div>
      <button
        onClick={() => {
          throw new Error('Test error');
        }}
      >
        click
      </button>
    </div>
  );
};

export default withLogError(index)((message) => {
  console.log('Log Error:', message);
});
```

#### Cookies

---

🚀 Description:

These utilities are used for managing cookies in a web application. They provide functions to get, set, and delete cookies.

🗝️ Install:

```
npx @tqlong1609/generate --generate functions --type cookies
```

Example

```
import { getCookie, setCookie, deleteCookie } from './index';

// Set a cookie that expires in 9 hours
setCookie('myCookie', 'myValue', 9 * 60 * 60 * 1000);

// Get the value of the cookie
const myCookieValue = getCookie('myCookie');
console.log(myCookieValue); // 'myValue'

// Delete the cookie
deleteCookie('myCookie');
```

🗝️ Install:

```
npx @tqlong1609/generate --generate functions --type cookies
```

#### Sheets Api

---

🚀 Description:

This TypeScript class provides methods to interact with Google Sheets using the Google Sheets API v4.

🗝️ Install:

```
npx @tqlong1609/generate --generate functions --type sheets-api
```

📄 Environment variables

- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: The email address of your Google service account.
- `GOOGLE_PRIVATE_KEY`: The private key of your Google service account. Note that newline characters in this key should be represented as `\n`.
- `GOOGLE_SHEET_ID`: The ID of the Google Sheet you want to interact with.

🎲 Methods

- `constructor(sheetName: string, colChar: string, rowCount: number)`: Initializes a new instance of the `SheetsService` class.
- `getInstance(isReadonly = false)`: Returns an instance of the Google Sheets API client.
- `getSheets()`: Fetches the values from the specified range of the Google Sheet.
- `updateSheets(data: string[][], isClearBeforeUpdate = false)`: Updates the values in the specified range of the Google Sheet.
- `clearSheets()`: Clears the values in the specified range of the Google Sheet.
- `removeSheets(numberOfRows: number)`: Removes the specified row from the Google Sheet.
- `appendSheets(data: string[])`: Appends the specified data to the Google Sheet.

Example

```
import { ArticlesSheets } from '@tqlong1609/functions';

function transformArray(input: any[][]): any[] {
  const [header, ...data] = input;
  return data.map((row) => {
    let obj: { [key: string]: any } = {};
    row.forEach((item, index) => {
      obj[header[index]] = item;
    });
    return obj;
  });
}

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
  Content?: string;
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
      const Content = formData.get('content');

      const responseFetch = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify({
          Title,
          Author,
          Date,
          Content,
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
          Content: response.Content,
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
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content"></textarea>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
```

/api/removeSheets

```
import { ArticlesSheets } from '@tqlong1609/functions';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = JSON.parse(req.body) as {
      numberOfRows: number;
    };
    await ArticlesSheets.removeSheets(data.numberOfRows);
    res.status(200).json({
      message: 'Remove success',
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default handler;
```

## Author

Name: Tran Quang Long

Email: tqlong1609@gmail.com

Linkedin: https://www.linkedin.com/in/tranlongdev/

Facebook: https://www.facebook.com/tqlong1609

Instagram: https://www.instagram.com/tqlong1609/
