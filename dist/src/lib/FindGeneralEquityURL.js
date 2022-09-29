"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
function FindGeneralEquityURL(code) {
    return __awaiter(this, void 0, void 0, function* () {
        let tempAny = "";
        let tempArray = [];
        let GeneralEquityURL = "NOT_FOUND";
        try {
            const url = `https://search.yahoo.com/search?p=%28${code}%29+-+id.investing.com+Indonesia&fr=yfp-t&fr2=p%3Afp%2Cm%3Asb&ei=UTF-8&fp=1`;
            const { data } = yield axios_1.default.get(url);
            const $ = cheerio.load(data);
            //investing
            $("a").each(function (i, e) {
                tempAny = $(e).first().attr("href");
                if (tempAny.includes("https://id.investing.com/") &&
                    !tempAny.includes("https://id.investing.com/indices/") &&
                    !tempAny.includes("https://id.investing.com/markets/") &&
                    !tempAny.includes("https://id.investing.com/commodities/") &&
                    tempAny !== "https://id.investing.com/" &&
                    tempAny !== "https://id.investing.com/equities/" &&
                    tempAny !== "https://id.investing.com/equities/indonesia")
                    tempArray = [...tempArray, tempAny];
            });
            GeneralEquityURL = tempArray[0].replace("https://id", "https://www");
            const del = [
                "-company-profile",
                "-historical-data",
                "-related-indices",
                "-chart",
                "-advanced-chart",
                "-financial-summary",
                "-income-statement",
                "-balance-sheet",
                "-cash-flow",
                "-ratios",
                "-dividends",
                "-earnings",
                "-technical",
                "-candlestick",
                "-consensus-estimates",
                "-commentary",
                "-scoreboard",
                "-user-rankings",
                "-advanced",
                "-news",
                "/2",
            ];
            del.forEach((val) => {
                if (GeneralEquityURL.includes(val))
                    GeneralEquityURL = GeneralEquityURL.replace(val, "");
            });
            return GeneralEquityURL;
        }
        catch (err) {
            console.log("FindGeneralEquityURL:", err.message);
            return GeneralEquityURL;
        }
    });
}
exports.default = FindGeneralEquityURL;
//# sourceMappingURL=FindGeneralEquityURL.js.map