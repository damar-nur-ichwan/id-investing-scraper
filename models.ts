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
  updatedAt: number;
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
  updatedAt: number;
}

export interface RatioValue {
  name: string;
  company: string;
  industry: string;
}

export interface Ratios extends Primary {
  ratios: RatioValue[];
  updatedAt: number;
}

export interface FinancialSummary extends Primary {
  summary: string;
  updatedAt: number;
}

export interface TechnicalSummary extends Primary {
  volume: number;
  price: number;
  change: number;
  status: string;
  createdAt: number;
}

export interface CodeList {
  code_list: string[];
}
