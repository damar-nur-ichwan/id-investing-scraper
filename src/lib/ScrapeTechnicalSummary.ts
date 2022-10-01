import * as cheerio from "cheerio";
import axios from "axios";
import { TechnicalSummary } from "../../models";
import GetIndonesiaTime from "get-indonesia-time";

export default async function (EquityGeneralURL: string) {
  if (!EquityGeneralURL) {
    console.error("Dividends:", `Please insert 'EquityGeneralURL' parameter`);
    return false;
  }

  let tempAny = "";
  let tempArray = [];
  let different = false;
  const { year, month, date } = GetIndonesiaTime();

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
      }`
    ),
  };

  try {
    let { data } = await axios.get(`${EquityGeneralURL}`);
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
      value.name = tempAny.substring(tempAny.length - 8, 0);
    });

    //volume
    $(".key-info_dd-numeric__2cYjc").each(function (i, e) {
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
      $(".instrument-price_instrument-price__3uw25 .text-2xl").each(function (
        i,
        e
      ) {
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
    $(".instrument-tech-summary_instrument-tech-summary__2AoP7").each(function (
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
          .split(":")[3];
      }
      value.status = tempAny;
    });

    return value;
  } catch (err) {
    console.error("TechnicalSummary:", EquityGeneralURL, "-", err.message);
    return;
  }
}
