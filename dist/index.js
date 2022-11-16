"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapeTechnicalSummaryHourly = exports.ScrapeCodeList = exports.ScrapeTechnicalSummary = exports.ScrapeFinancialSummary = exports.ScrapeRatios = exports.ScrapeDividends = exports.ScrapeCompanyProfile = exports.FindGeneralEquityURL = void 0;
const ScrapeCodeList_1 = __importDefault(require("./src/lib/ScrapeCodeList"));
exports.ScrapeCodeList = ScrapeCodeList_1.default;
const ScrapeCompanyProfile_1 = __importDefault(require("./src/lib/ScrapeCompanyProfile"));
exports.ScrapeCompanyProfile = ScrapeCompanyProfile_1.default;
const ScrapeDividends_1 = __importDefault(require("./src/lib/ScrapeDividends"));
exports.ScrapeDividends = ScrapeDividends_1.default;
const ScrapeFinancialSummary_1 = __importDefault(require("./src/lib/ScrapeFinancialSummary"));
exports.ScrapeFinancialSummary = ScrapeFinancialSummary_1.default;
const FindGeneralEquityURL_1 = __importDefault(require("./src/lib/FindGeneralEquityURL"));
exports.FindGeneralEquityURL = FindGeneralEquityURL_1.default;
const ScrapeRatios_1 = __importDefault(require("./src/lib/ScrapeRatios"));
exports.ScrapeRatios = ScrapeRatios_1.default;
const ScrapeTechnicalSummary_1 = __importDefault(require("./src/lib/ScrapeTechnicalSummary"));
exports.ScrapeTechnicalSummary = ScrapeTechnicalSummary_1.default;
const ScrapeTechnicalSummaryHourly_1 = __importDefault(require("./src/lib/ScrapeTechnicalSummaryHourly"));
exports.ScrapeTechnicalSummaryHourly = ScrapeTechnicalSummaryHourly_1.default;
(0, ScrapeTechnicalSummaryHourly_1.default)("https://www.investing.com/equities/merdeka-copper-gold-tbk-pt").then((res) => console.log(res));
//# sourceMappingURL=index.js.map