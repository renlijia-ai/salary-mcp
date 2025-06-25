import { CallToolRequest } from "@modelcontextprotocol/sdk/types.js";
import { Client } from "./client.js";
import { apiPrefixMapping, ENV } from "../constants/index.js";
import { convertMarkdownToPdfAndUpload } from "./pdf.js";

export const switchApi = async (request: CallToolRequest) => {
  const params = { ...request.params.arguments };
  const client = new Client(
    params.rljN as string,
    apiPrefixMapping[(ENV || "prod") as string]
  );

  let response;

  switch (request.params.name) {
    case "salaryGroup_generate_pdf": {
      const pdfUrl = await convertMarkdownToPdfAndUpload(
        params.markdownText as string
      );
      response = {
        success: true,
        result: { pdfUrl },
      };
      break;
    }
    case "salaryGroup_indexList": {
      const res = await client.post("v1/salaryGroup/indexList", {
        ...params,
        page: 0,
        pageSize: 20,
      });
      if (res.success) {
        res.result = res.result.startGroupList.map((v: any) => ({
          statisticsDataOverview: v.statisticsDataOverview,
          salaryGroupName: v.salaryGroupName,
        }));
        response = res;
      } else {
        response = res;
      }
      break;
    }
    case "salaryGroup_tableData": {
      response = await client.post("v1/reports/tableData", {
        ...params,
      });
      break;
    }
    default:
      throw new Error(`Unknown tool: ${request.params.name}`);
  }
  return {
    content: [
      {
        type: "text",
        text: `${JSON.stringify(response)}`,
      },
    ],
    isError: !response.success,
  };
};
