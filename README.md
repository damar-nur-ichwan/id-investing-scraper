_DEVELOPED BY: Damar Nur Ichwan_

# INVESTING SCRAPPER

This module has the task of retrieving Indonesian stock data in [investing.com](https://www.investing.com/).

## Instalasi

**NPM Package**

```cmd
npm i id-investing-scrapper
```

**Yarn Package**

```cmd
yarn add id-investing-scrapper
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

### Scrape Company Profile

**ExampleExample:**

```ts
import { ScrapeCompanyProfile } from "investing-scrapper";

const BBCA = "https://www.investing.com/equities/bnk-central-as";
const GeneralEquityURL = BBCA;

ScrapeCompanyProfile(GeneralEquityURL).then((res) => console.log(res));
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

### Scrape Dividends

**Example:**

```ts
import { ScrapeDividends } from "investing-scrapper";

const BBCA = "https://www.investing.com/equities/bnk-central-as";
const GeneralEquityURL = BBCA;

ScrapeDividends(GeneralEquityURL).then((res) => console.log(res));
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

### Scrape Ratios

**Example:**

```ts
import { ScrapeRatios } from "investing-scrapper";

const BBCA = "https://www.investing.com/equities/bnk-central-as";
const GeneralEquityURL = BBCA;

ScrapeRatios(GeneralEquityURL).then((res) => console.log(res));
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

### Scrape Financial Summary

**Example:**

```ts
import { FinancialSummary } from "investing-scrapper";

const BBCA = "https://www.investing.com/equities/bnk-central-as";
const GeneralEquityURL = BBCA;

ScrapeFinancialSummary(GeneralEquityURL).then((res) => console.log(res));
```

**Output Model:**

```ts
interface FinancialSummary {
  code: string;
  name: string;
  summary: string;
}
```

### Scrape Technical Summary

**Example:**

```ts
import { TechnicalSummary } from "investing-scrapper";

const BBCA = "https://www.investing.com/equities/bnk-central-as";
const GeneralEquityURL = BBCA;

ScrapeTechnicalSummary(GeneralEquityURL).then((res) => console.log(res));
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

### Scrape Code List

**Example:**

```ts
import { ScrapeCodeList } from "investing-scrapper";

ScrapeCodeList().then((res) => console.log(res));
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
