import * as cheerio from "cheerio";
import axios from "axios";
import { FinancialSummary } from "../../models";

export default async function (EquityGeneralURL: string) {
  if (!EquityGeneralURL) {
    console.error("Dividends:", `Please insert 'EquityGeneralURL' parameter`);
    return false;
  }

  let tempAny = "";

  const value: FinancialSummary = {
    code: "",
    name: "",
    summary: "",
  };

  try {
    const { data } = await axios.get(`${EquityGeneralURL}-financial-summary`);
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
  } catch (err) {
    console.error("FinancialSummary:", err.message);
    return;
  }
}
