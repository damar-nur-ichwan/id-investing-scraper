import axios from "axios";
import * as cheerio from "cheerio";
import { CodeList } from "../../models";
import { ConsoleError } from "../utils";

export default async () => {
  let tempArray1: string[] = [];
  let tempArray2: string[] = [];

  const value: CodeList = {
    code_list: [],
  };

  try {
    const { data } = await axios.get(
      "https://britama.com/index.php/perusahaan-tercatat-di-bei/"
    );
    if (!data) return;
    const $ = cheerio.load(data);

    //id
    $(".entry-content").each(function (i, e) {
      tempArray1 = $(e).first().text().split(`\n`);
      tempArray1.forEach((v) => {
        if (v.length === 4 && v != "Kode") tempArray2 = [...tempArray2, v];
      });
    });

    tempArray2.forEach((v) => {
      v = v.replace(/\t/g, "");
      if (v.replace(/^\D+/g, "").length === 0 && v.length === 4)
        value.code_list = [...value.code_list, v];
    });
    return value;
  } catch (err) {
    return ConsoleError({
      path: __filename,
      functionName: "ScrapeCodeList",
      err,
    });
  }
};
