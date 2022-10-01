import * as cheerio from "cheerio";
import axios from "axios";
import { Dividends, DividendValue } from "../../models";
import GetIndonesiaTime from "get-indonesia-time";

export default async function (EquityGeneralURL: string) {
  if (!EquityGeneralURL) {
    console.error("Dividends:", `Please insert 'EquityGeneralURL' parameter`);
    return false;
  }

  let tempAny = "";
  let tempArray = [];

  const { year, month, date } = GetIndonesiaTime();
  const value: Dividends = {
    updatedAt: parseInt(
      `${year}${month < 10 ? "0" + month : month}${
        date < 10 ? "0" + date : date
      }`
    ),
    code: "",
    name: "",
    dividends: [],
  };

  try {
    const { data } = await axios.get(`${EquityGeneralURL}-dividends`);
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
    $(".dividendTbl td").each(function (i, e) {
      tempAny = $(e).first().text();
      if (tempArray.length < 5) {
        tempArray = [...tempArray, tempAny];
      } else {
        const newValue: DividendValue = {
          exDate: tempArray[0],
          dividend: tempArray[1],
          payDate: tempArray[3],
          yield: tempArray[4],
        };
        value.dividends = [...value.dividends, newValue];
        tempArray = [];
        tempArray = [...tempArray, tempAny];
      }
    });

    return value;
  } catch (err) {
    console.error(
      "Dividends:",
      EquityGeneralURL + "-dividends",
      "-",
      err.message
    );
    return;
  }
}
