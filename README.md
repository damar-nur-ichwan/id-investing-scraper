_DEVELOPED BY: Damar Nur Ichwan_

# INVESTING SCRAPPER

This module has the task of retrieving Indonesian stock data in [investing.com](https://www.investing.com/).

## Instalasi

**NPM Package**

```cmd
npm i investing-scrapper
```

**Yarn Package**

```cmd
yarn add investing-scrapper
```

## Parameters

- `GeneralEquityURL`
  ```ts
  // Example
  const BBCA = "https://www.investing.com/equities/bnk-central-as";
  const BMRI = "https://www.investing.com/equities/bank-mandiri-t";
  const BBRI = "https://www.investing.com/equities/bank-rakyat-in";
  ```
- `Code`
  ```ts
  // Example
  const code = "BBCA";
  ```

## Features & Usage

### Company Profile

**ExampleExample:**

```ts
import { CompanyProfile } from "investing-scrapper";

const BBCA = "https://www.investing.com/equities/bnk-central-as";
const GeneralEquityURL = BBCA;

CompanyProfile(GeneralEquityURL).then((res) => console.log(res));
```

**Output Model:**

```ts
interface CompanyProfile {
  code: string;
  name: string;
  description: string;
  contact: {
    address: string[];
    phone: string;
    fax: string;
    web: string;
  };
  topExecutives: {
    name: string;
    age: string;
    since: string;
    title: string;
  }[];
}
```

### Dividends

**Example:**

```ts
import { Dividends } from "investing-scrapper";

const BBCA = "https://www.investing.com/equities/bnk-central-as";
const GeneralEquityURL = BBCA;

Dividends(GeneralEquityURL).then((res) => console.log(res));
```

**Output Model:**

```ts
interface Dividends {
  code: string;
  name: string;
  dividends: {
    exDate: string;
    dividend: string;
    payDate: string;
    yield: string;
  }[];
}
```

### Ratios

**Example:**

```ts
import { Ratios } from "investing-scrapper";

const BBCA = "https://www.investing.com/equities/bnk-central-as";
const GeneralEquityURL = BBCA;

Ratios(GeneralEquityURL).then((res) => console.log(res));
```

**Output Model:**

```ts
interface Ratios {
  code: string;
  name: string;
  ratios: {
    name: string;
    company: string;
    industry: string;
  }[];
}
```

### Financial Summary

**Example:**

```ts
import { FinancialSummary } from "investing-scrapper";

const BBCA = "https://www.investing.com/equities/bnk-central-as";
const GeneralEquityURL = BBCA;

FinancialSummary(GeneralEquityURL).then((res) => console.log(res));
```

**Output Model:**

```ts
interface FinancialSummary {
  code: string;
  name: string;
  summary: string;
}
```

### Technical Summary

**Example:**

```ts
import { TechnicalSummary } from "investing-scrapper";

const BBCA = "https://www.investing.com/equities/bnk-central-as";
const GeneralEquityURL = BBCA;

TechnicalSummary(GeneralEquityURL).then((res) => console.log(res));
```

**Output Model:**

```ts
interface TechnicalSummary {
  code: string;
  name: string;
  volume: number;
  price: number;
  change: number;
  status: string;
}
```

### Code List

**Example:**

```ts
import { CodeList } from "investing-scrapper";

CodeList().then((res) => console.log(res));
```

**Output Model:**

```ts
interface CodeList {
  code_list: string[];
}
```

### FindGeneralEquityURL

**Example:**

```ts
import { FindGeneralEquityURL } from "investing-scrapper";

const BBCA = "https://www.investing.com/equities/bnk-central-as";
const GeneralEquityURL = BBCA;

FindGeneralEquityURL(GeneralEquityURL).then((res) => console.log(res));
```

**Output Model:**

```ts
interface FindGeneralEquityURL {
  code: string;
  url: string;
}
```
