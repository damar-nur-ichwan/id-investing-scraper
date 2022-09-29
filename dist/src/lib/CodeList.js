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
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        let tempArray1 = [];
        let tempArray2 = [];
        const value = {
            code_list: [],
        };
        try {
            const { data } = yield axios_1.default.get("https://britama.com/index.php/perusahaan-tercatat-di-bei/");
            const $ = cheerio.load(data);
            //id
            $(".entry-content").each(function (i, e) {
                tempArray1 = $(e).first().text().split(`\n`);
                tempArray1.forEach((v) => {
                    if (v.length === 4 && v != "Kode")
                        tempArray2 = [...tempArray2, v];
                });
            });
            tempArray2.forEach((v) => {
                if (v.replace(/^\D+/g, "").length === 0 && v.length === 4)
                    value.code_list = [...value.code_list, v];
            });
            return value;
        }
        catch (err) {
            console.error("CodeList:", err.message);
            return;
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=CodeList.js.map