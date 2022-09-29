import * as cheerio from "cheerio";
import axios from "axios";

export default async function FindGeneralEquityURL(code: string) {
  let tempAny = "";
  let tempArray = [];
  let GeneralEquityURL = "NOT_FOUND";

  try {
    const url = `https://search.yahoo.com/search?p=%28${code}%29+-+id.investing.com+Indonesia&fr=yfp-t&fr2=p%3Afp%2Cm%3Asb&ei=UTF-8&fp=1`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    //investing
    $("a").each(function (i, e) {
      tempAny = $(e).first().attr("href");

      if (
        tempAny.includes("https://id.investing.com/") &&
        !tempAny.includes("https://id.investing.com/indices/") &&
        !tempAny.includes("https://id.investing.com/markets/") &&
        !tempAny.includes("https://id.investing.com/commodities/") &&
        tempAny !== "https://id.investing.com/" &&
        tempAny !== "https://id.investing.com/equities/" &&
        tempAny !== "https://id.investing.com/equities/indonesia"
      )
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
  } catch (err) {
    console.log("FindGeneralEquityURL:", err.message);
    return GeneralEquityURL;
  }
}
