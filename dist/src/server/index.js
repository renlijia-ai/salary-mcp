import { Client } from "./client.js";
import { apiPrefixMapping, ENV } from "../constants/index.js";
import { convertExcelUrlToHtml } from "./utils.js";
export const switchApi = async (request) => {
    const params = { ...request.params.arguments };
    const client = new Client(params.rljN, apiPrefixMapping[(ENV || "prod")]);
    let response;
    switch (request.params.name) {
        case "salaryGroup_get_excel_info": {
            response = await convertExcelUrlToHtml(params.fileUrl);
            break;
        }
        case "salaryGroup_indexList": {
            const res = await client.post("v1/salaryGroup/indexList", {
                ...params,
                page: 0,
                pageSize: 20,
            });
            if (res.success) {
                res.result = res.result.startGroupList.map((v) => ({
                    statisticsDataOverview: v.statisticsDataOverview,
                    salaryGroupName: v.salaryGroupName,
                }));
                response = res;
            }
            else {
                response = res;
            }
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
