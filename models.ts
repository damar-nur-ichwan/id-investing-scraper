export interface Primary {
  code: string;
  name: string;
}

export interface DividendValue {
  exDate: string;
  dividend: string;
  payDate: string;
  yield: string;
}

export interface Dividends extends Primary {
  dividends: DividendValue[];
}

export interface topExecutivesValue {
  name: string;
  age: string;
  since: string;
  title: string;
}

export interface contactValue {
  address: string[];
  phone: string;
  fax: string;
  web: string;
}

export interface CompanyProfile extends Primary {
  description: string;
  contact: contactValue;
  topExecutives: topExecutivesValue[];
}

export interface RatioValue {
  name: string;
  company: string;
  industry: string;
}

export interface Ratios extends Primary {
  ratios: RatioValue[];
}

export interface FinancialSummary extends Primary {
  summary: string;
}

export interface TechnicalSummary extends Primary {
  volume: number;
  price: number;
  change: number;
  status: string;
}

export interface CodeList {
  code_list: string[];
}
