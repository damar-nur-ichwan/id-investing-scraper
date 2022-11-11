import * as cheerio from "cheerio";
import axios from "axios";
import { FinancialSummary } from "../../models";
import GetIndonesiaTime from "get-indonesia-time";
import { ConsoleError } from "../utils";

export default async (EquityGeneralURL: string) => {
  let tempAny: string | undefined = "";

  const { year, month, date } = GetIndonesiaTime();

  const value: FinancialSummary = {
    updatedAt: parseInt(
      `${year}${month < 10 ? "0" + month : month}${
        date < 10 ? "0" + date : date
      }`
    ),
    code: "",
    name: "",
    summary: "",
  };

  try {
    const { data } = await axios.get(`${EquityGeneralURL}-financial-summary`);
    if (!data) return;
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
    ConsoleError({
      path: __filename,
      functionName: "ScrapeFinancialSummary",
      err,
      params: { EquityGeneralURL },
    });
    return;
  }
};
