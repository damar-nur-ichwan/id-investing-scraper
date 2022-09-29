import axios from "axios";
import * as cheerio from "cheerio";
import { CodeList } from "../../models";

export default async function () {
  let tempArray1 = [];
  let tempArray2 = [];

  const value: CodeList = {
    code_list: [],
  };

  try {
    const { data } = await axios.get(
      "https://britama.com/index.php/perusahaan-tercatat-di-bei/"
    );
    const $ = cheerio.load(data);

    //id
    $(".entry-content").each(function (i, e) {
      tempArray1 = $(e).first().text().split(`\n`);
      tempArray1.forEach((v) => {
        if (v.length === 4 && v != "Kode") tempArray2 = [...tempArray2, v];
      });
    });

    tempArray2.forEach((v) => {
      if (v.replace(/^\D+/g, "").length === 0 && v.length === 4)
        value.code_list = [...value.code_list, v];
    });
    return value;
  } catch (err) {
    console.error("CodeList:", err.message);
    return;
  }
}
