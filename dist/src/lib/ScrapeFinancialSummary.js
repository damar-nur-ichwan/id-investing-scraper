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
const get_indonesia_time_1 = __importDefault(require("get-indonesia-time"));
const utils_1 = require("../utils");
exports.default = (EquityGeneralURL) => __awaiter(void 0, void 0, void 0, function* () {
    let tempAny = "";
    const { year, month, date } = (0, get_indonesia_time_1.default)();
    const value = {
        updatedAt: parseInt(`${year}${month < 10 ? "0" + month : month}${date < 10 ? "0" + date : date}`),
        code: "",
        name: "",
        summary: "",
    };
    try {
        const { data } = yield axios_1.default.get(`${EquityGeneralURL}-financial-summary`);
        if (!data)
            return;
        const $ = cheerio.load(data);
        //code & name
        $("h1").each(function (i, e) {
            tempAny = $(e).first().text();
            value.code = tempAny
                .substring(tempAny.length - 1, tempAny.length - 6)
                .replace(")", "")
                .replace("(", "")
                .replace("TX_p", "CNTX");
            value.name = tempAny.substring(tempAny.length - 8, 0);
        });
        // summary
        $(".instrumentSummaryBody").each(function (i, e) {
            tempAny = $(e).first().text().replace(/\n/g, "");
            value.summary = tempAny;
        });
        return value;
    }
    catch (err) {
        (0, utils_1.ConsoleError)({
            path: __filename,
            functionName: "ScrapeFinancialSummary",
            err,
            params: { EquityGeneralURL },
        });
        return;
    }
});
//# sourceMappingURL=ScrapeFinancialSummary.js.map