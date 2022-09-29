import * as cheerio from "cheerio";
import axios from "axios";
import { CompanyProfile, topExecutivesValue } from "../../models";

export default async function (EquityGeneralURL: string) {
  if (!EquityGeneralURL) {
    console.error("Dividends:", `Please insert 'EquityGeneralURL' parameter`);
    return false;
  }

  let tempAny = "";
  let tempArray = [];
  let tempNumber = 0;

  const value: CompanyProfile = {
    code: "",
    name: "",
    description: "",
    contact: {
      address: [],
      phone: "",
      web: "",
      fax: "",
    },
    topExecutives: [],
  };
  try {
    const { data } = await axios.get(`${EquityGeneralURL}-company-profile`);
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

    // description
    $(".companyProfileBody").each(function (i, e) {
      tempAny = $(e).first().text();
      value.description = tempAny.replace(/\n/g, "");
    });

    // address
    $(".companyAddress span").each(function (i, e) {
      tempAny = $(e).first().text();
      if (tempNumber > 2) tempArray = [...tempArray, tempAny];

      tempNumber++;
    });
    value.contact["address"] = tempArray;

    // phone
    tempArray = [];
    tempNumber = 0;
    $(".companyPhone span").each(function (i, e) {
      tempAny = $(e).first().text();
      if (i > 1) tempArray = [...tempArray, tempAny];
      i++;
    });
    value.contact["phone"] = tempArray[0];

    // fax
    tempArray = [];
    tempNumber = 0;
    $(".companyFax span").each(function (i, e) {
      tempAny = $(e).first().text();
      if (i > 1) tempArray = [...tempArray, tempAny];
      i++;
    });
    value.contact["fax"] = tempArray[0];

    // web
    $(".companyWeb span a").each(function (i, e) {
      tempAny = $(e).first().attr("href");
    });
    value.contact["web"] = tempAny;

    // top exec
    tempArray = [];
    tempNumber = 0;
    $(".topExecsTbl td").each(function (i, e) {
      tempAny = $(e).first().text();
      if (tempArray.length < 4) {
        tempArray = [...tempArray, tempAny];
      } else {
        const newValue: topExecutivesValue = {
          name: tempArray[0],
          age: tempArray[1],
          since: tempArray[2],
          title: tempArray[3],
        };
        value.topExecutives = [...value.topExecutives, newValue];
        tempArray = [];
        tempArray = [...tempArray, tempAny];
      }
    });

    return value;
  } catch (err) {
    console.error("CompanyProfile:", err.message);
    return;
  }
}
