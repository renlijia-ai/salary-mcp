import { CallToolRequest } from "@modelcontextprotocol/sdk/types.js";
import { Client } from "./client.js";
import { apiPrefixMapping, ENV } from "../constants/index.js";
import { convertExcelUrlToHtml } from "./utils.js";

export const switchApi = async (request: CallToolRequest) => {
  const params = { ...request.params.arguments };
  const client = new Client(
    params.rljN as string,
    apiPrefixMapping[(ENV || "prod") as string]
  );

  let response;

  switch (request.params.name) {
    case "salaryGroup_get_excel_info": {
      response = await convertExcelUrlToHtml(params.fileUrl as string);
      break;
    }
    case "salaryGroup_indexList": {
      const res = await client.post("v1/salaryGroup/indexList", {
        ...params,
        page: 0,
        pageSize: 30,
      });
      if (res.success) {
        res.result = JSON.stringify(res.result);
        response = res;
      } else {
        response = res;
      }
      break;
    }
    case "salarySetting_querySalarySetting": {
      response = await client.post(
        "v2/salarySetting/querySalarySetting",
        params
      );
      break;
    }
    case "salarySetting_saveSalaryItemList": {
      response = await client.post(
        "v3/salarySetting/saveSalaryItemList",
        params
      );
      break;
    }
    case "salaryBasePay_saveOneBasepayConfig": {
      response = await client.post(
        "v1/salaryBasePay/saveOneBasepayConfig",
        params
      );
      break;
    }
    case "salaryBasePay_queryConfig": {
      response = await client.post("v1/salaryBasePay/queryConfig", params);
      break;
    }
    case "salaryBasePay_getHrmField": {
      response = await client.post("v1/salaryBasePay/getHrmField", params);
      break;
    }
    case "salarySetting_getTemSalaryItemByAi": {
      response = await client.post(
        "v1/salarySetting/getTemSalaryItemByAi",
        params
      );
      break;
    }
    case "salarySetting_saveSalaryItemList_hrm":
    case "salarySetting_saveSalaryItemList_basePay":
    case "salarySetting_saveSalaryItemList_act":
    case "salarySetting_saveSalaryItemList_floatingData":
    case "salarySetting_saveSalaryItemList_other":
    case "salarySetting_saveSalaryItemList_socialSecurityData": {
      response = await client.post(
        "v3/salarySetting/saveSalaryItemList",
        params
      );
      break;
    }
    default:
      throw new Error(`Unknown tool: ${request.params.name}`);
  }

  return {
    content: [
      {
        type: "text",
        text: `${JSON.stringify(response, null, 2)}`,
      },
    ],
    isError: !response.success,
  };
};
