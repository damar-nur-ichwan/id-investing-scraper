import * as cheerio from "cheerio";
import axios from "axios";
import { Ratios, RatioValue } from "../../models";

export default async function (EquityGeneralURL: string) {
  if (!EquityGeneralURL) {
    console.error("Dividends:", `Please insert 'EquityGeneralURL' parameter`);
    return false;
  }

  let tempAny = "";
  let tempArray1 = [];
  let tempArray2 = [];
  let tempNumber = 0;

  const value: Ratios = {
    code: "",
    name: "",
    ratios: [],
  };

  try {
    const { data } = await axios.get(`${EquityGeneralURL}-ratios`);
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

    // ratios
    $(".ratioTable td").each(function (i, e) {
      tempAny = $(e).first().text();
      if (
        !tempAny.includes("\n") &&
        (tempAny.match(/[a-zA-Z0-9]/g) || tempAny === "-") &&
        tempAny !== "Efficiency"
      )
        tempArray1 = [...tempArray1, tempAny];
    });

    tempArray1.forEach((v) => {
      if (tempNumber <= 2) tempArray2 = [...tempArray2, v];
      if (tempNumber == 2) {
        const newValue: RatioValue = {
          name: tempArray2[0],
          company: tempArray2[1],
          industry: tempArray2[2],
        };
        value.ratios = [...value.ratios, newValue];
        tempArray2 = [v];
        tempNumber = 0;
      }
      tempNumber++;
    });

    return value;
  } catch (err) {
    console.error("Ratios:", err.message);
    return;
  }
}
