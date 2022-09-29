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
function default_1(EquityGeneralURL) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!EquityGeneralURL) {
            console.error("Dividends:", `Please insert 'EquityGeneralURL' parameter`);
            return false;
        }
        let tempAny = "";
        let tempArray = [];
        let different = false;
        const value = {
            code: "",
            name: "",
            volume: 0,
            price: 0,
            change: 0,
            status: "",
        };
        try {
            let { data } = yield axios_1.default.get(`${EquityGeneralURL}`);
            if (data.includes("float_lang_base_1 relativeAttr")) {
                different = true;
                data = data.replace(/float_lang_base_1 relativeAttr/g, "instrument-header_title__GTWDv");
                data = data.replace(/float_lang_base_2 bold/g, "key-info_dd-numeric__2cYjc");
                data = data.replace(/genTbl closedTbl technicalSummaryTbl/g, "instrument-tech-summary_instrument-tech-summary__2AoP7");
            }
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
            //volume
            $(".key-info_dd-numeric__2cYjc").each(function (i, e) {
                tempAny = $(e).first().text();
                tempArray = [...tempArray, tempAny];
            });
            value.volume = parseInt(tempArray[8].replace(/,/g, ""));
            if (different)
                value.volume = parseInt(tempArray[6].replace(/,/g, ""));
            //price
            tempArray = [];
            if (different) {
                $(".overViewBox").each(function (i, e) {
                    tempArray = $(e).first().text().split("%")[0].split("\n");
                    value.price = parseInt(tempArray[6].replace(/,/g, ""));
                    value.change = parseFloat(tempArray[9]);
                });
            }
            else {
                $(".instrument-price_instrument-price__3uw25 .text-2xl").each(function (i, e) {
                    tempAny = $(e).first().text();
                    value.price = parseInt(tempAny.replace(/,/g, ""));
                });
            }
            //change
            if (!different) {
                $(".instrument-price_change-percent__19cas").each(function (i, e) {
                    tempAny = $(e).first().text().replace("(", "").replace(")", "");
                    value.change = parseFloat(tempAny);
                });
            }
            //status
            $(".instrument-tech-summary_instrument-tech-summary__2AoP7").each(function (i, e) {
                if (different) {
                    tempAny = $(e).first().text().split("Summary")[1].split("\n")[4];
                }
                else {
                    tempAny = $(e)
                        .first()
                        .text()
                        .split("Summary")[2]
                        .replace(/lB/g, "l:B")
                        .replace(/lS/g, "l:S")
                        .replace(/lN/g, "l:N")
                        .replace(/yB/g, "y:B")
                        .replace(/yS/g, "y:S")
                        .replace(/yN/g, "y:N")
                        .split(":")[3];
                }
                value.status = tempAny;
            });
            return value;
        }
        catch (err) {
            console.error("TechnicalSummary:", err.message);
            return;
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=TechnicalSummary.js.map