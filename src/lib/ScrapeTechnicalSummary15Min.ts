import * as cheerio from "cheerio";
import axios from "axios";
import { TechnicalSummary } from "../../models";
import GetIndonesiaTime from "get-indonesia-time";
import { ConsoleError } from "../utils";

export default async (EquityGeneralURL: string) => {
  let tempAny: string | undefined = "";
  let tempArray: typeof tempAny[] = [];
  let different = false;
  const { year, month, date, hours, minutes } = GetIndonesiaTime();

  const value: TechnicalSummary = {
    code: "",
    name: "",
    volume: 0,
    price: 0,
    change: 0,
    status: "",
    createdAt: parseInt(
      `${year}${month < 10 ? "0" + month : month}${
        date < 10 ? "0" + date : date
      }${hours < 10 ? "0" + hours : hours}${
        minutes < 10 ? "0" + minutes : minutes
      }`
    ),
  };

  try {
    let { data } = await axios.get(`${EquityGeneralURL}`);
    if (!data) return;
    if (data.includes("float_lang_base_1 relativeAttr")) {
      different = true;
      data = data.replace(
        /float_lang_base_1 relativeAttr/g,
        "instrument-header_title__GTWDv"
      );
      data = data.replace(
        /float_lang_base_2 bold/g,
        "key-info_dd-numeric__2cYjc"
      );
      data = data.replace(
        /genTbl closedTbl technicalSummaryTbl/g,
        "instrument-tech-summary_instrument-tech-summary__2AoP7"
      );
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
      value.name = tempAny.substring(tempAny.length - 7, 0);
    });

    //volume
    $(".key-info_dd-numeric__5IsvY").each(function (i, e) {
      tempAny = $(e).first().text();

      tempArray = [...tempArray, tempAny];
    });
    value.volume = parseInt(tempArray[8].replace(/,/g, ""));
    if (different) value.volume = parseInt(tempArray[6].replace(/,/g, ""));

    //price
    tempArray = [];
    if (different) {
      $(".overViewBox").each(function (i, e) {
        tempArray = $(e).first().text().split("%")[0].split("\n");

        value.price = parseInt(tempArray[6].replace(/,/g, ""));
        value.change = parseFloat(tempArray[9]);
      });
    } else {
      $(".instrument-price_instrument-price__xfgbB .text-2xl").each(function (
        i,
        e
      ) {
        tempAny = $(e).first().text();

        value.price = parseInt(tempAny.replace(/,/g, ""));
      });
    }

    //change
    if (!different) {
      $(".instrument-price_change-percent__bT4yt").each(function (i, e) {
        tempAny = $(e).first().text().replace("(", "").replace(")", "");

        value.change = parseFloat(tempAny);
      });
    }

    //status
    $(".instrument-tech-summary_instrument-tech-summary__GLtIo").each(function (
      i,
      e
    ) {
      if (different) {
        tempAny = $(e).first().text().split("Summary")[1].split("\n")[4];
      } else {
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
          .split(":")[1];
      }
      value.status = tempAny;
    });
    return value;
  } catch (err) {
    ConsoleError({
      path: __filename,
      functionName: "ScrapeTechnicalSummary",
      err,
      params: { EquityGeneralURL },
    });
    return;
  }
};
