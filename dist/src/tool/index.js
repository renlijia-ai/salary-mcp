const getInputSchema = (properties, required) => {
    return {
        type: "object",
        properties: {
            // rljN: {
            //   type: "string",
            //   description: "登录token",
            // },
            // env: {
            //   type: "string",
            //   description: "环境",
            //   enum: ["prod", "pre", "test", "daily"],
            // },
            ...properties,
        },
        required: [
            // "rljN", "env",
            ...required,
        ],
    };
};
export const MAPS_TOOLS = [
    {
        name: "salaryGroup_get_excel_info",
        description: `获取excel的sheet的信息
    返回值: 包含所有的sheet信息，以字符串的形式返回
    `,
        inputSchema: getInputSchema({
            fileUrl: {
                type: "string",
                description: "文件oss地址",
            },
        }, ["fileUrl"]),
    },
    {
        name: "salaryGroup_indexList",
        description: `薪资组列表信息，可以通过薪资组名称搜索薪资组信息
    返回值
    {
      "type": "object",
      "required": [],
      "properties": {
        "result": {
          "type": "array",
          "items": {
            "type": "object",
            "required": [],
            "properties": {
              "statisticsDataOverview": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": [],
                  "properties": {
                    "itemDesc": {
                      "type": "string",
                      "description": "统计项描述"
                    },
                    "itemId": {
                      "type": "string"
                      "description": "统计项id"
                    },
                    "itemName": {
                      "type": "string",
                      "description": "统计项名称"
                    },
                    "sValue": {
                      "type": "string",
                      "description": "统计值格式化后的值和unit配合使用"
                    },
                    "unit": {
                      "type": "string",
                      "description": "统计想格式化的值单位，和sValue配合使用"
                    },
                    "value": {
                      "type": "number",
                      "description": "统计值原始值"
                    }
                  }
                }
              },
              "salaryGroupName": {
                "type": "string",
                "description": "薪资组名称"
              },
              "salaryGroupId": {
                "type": "string"
                "description": "薪资组id"
              }
            }
          }
        },
        "rid": {
          "type": "string"
        },
        "success": {
          "type": "boolean"
        }
      }
    }
    `,
        inputSchema: getInputSchema({
            calBizId: {
                type: "string",
                description: "薪资月，格式yyyyMMM，比如202503M，代表2025年3月",
            },
            search: {
                type: "string",
                description: "薪资组名称",
            },
        }, ["calBizId"]),
    },
];
