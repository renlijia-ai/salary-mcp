import { Tool } from "@modelcontextprotocol/sdk/types.js";

const getInputSchema = (
  properties: Tool["inputSchema"]["properties"],
  required: string[]
): Tool["inputSchema"] => {
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

export const MAPS_TOOLS: Tool[] = [
  {
    name: "salaryGroup_get_excel_info",
    description: `获取excel的sheet的信息
    返回值: 包含所有的sheet信息，以字符串的形式返回
    `,
    inputSchema: getInputSchema(
      {
        fileUrl: {
          type: "string",
          description: "文件oss地址",
        },
      },
      ["fileUrl"]
    ),
  },
  {
    name: "salaryGroup_indexList",
    description: `薪资组列表信息，可以通过薪资组名称搜索薪资组信息
    返回值
    {
      "type": "object",
      "required": [],
      "properties": {
        "currentCalBizId": {
          "type": "string",
          "description": "当前薪资月, 格式yyyyMMM，比如202503M，代表2025年3月"
        },
        "hasMore": {
          "type": "boolean",
          "description": "是否还有更多的薪资组，因为是列表滚动触底加载更多"
        },
        "nextCalBizId": {
          "type": "string",
          "description": "下一个薪资月，格式yyyyMMM，比如202504M，代表2025年4月"
        },
        "page": {
          "type": "string",
          "description": "分页信息"
        },
        "pageSize": {
          "type": "number",
          "description": "每页数量"
        },
        "previousCalBizId": {
          "type": "string",
          "description": "上一个薪资月，格式yyyyMMM，比如202502M，代表2025年2月"
        },
        "proTips": {
          "type": "string"
        },
        "showSalaryCalNewGuide": {
          "type": "boolean"
        },
        "startGroupList": {
          "type": "array",
          "items": {
            "type": "object",
            "required": [],
            "properties": {
              "authCode": {
                "type": "number",
                "description": "权限 => 0:无权限 1:仅查看 2:操作"
              },
              "calBizId": {
                "type": "string",
                "description": "薪资月，格式yyyyMMM，比如202503M，代表2025年3月"
              },
              "calVersion": {
                "type": "number"
              },
              "gotoSetting": {
                "type": "string",
                "description": "跳转的设置页面 done:已完成新建流程 其他则表示薪资组尚未创建完成"
              },
              "isLocked": {
                "type": "boolean",
                "description": "是否锁定"
              },
              "needRecalculate": {
                "type": "boolean",
                "description": "是否需要重新计算"
              },
              "newTaxRule": {
                "type": "string",
              },
              "operate": {
                "type": "string"
              },
              "salaryGroupId": {
                "type": "string",
                "description": "薪资组id"
              },
              "salaryGroupName": {
                "type": "string",
                "description": "薪资组名称"
              },
              "salaryPeriodType": {
                "type": "string"
              },
              "setting": {
                "type": "boolean"
              },
              "settingPeriod": {
                "type": "boolean"
              },
              "statisticsData": {
                "type": "array",
                "description": "统计项相关信息",
                "items": {
                  "type": "object",
                  "required": [],
                  "properties": {
                    "itemDesc": {
                      "type": "string",
                      "description": "统计项描述"
                    },
                    "itemId": {
                      "type": "string",
                      "description": "统计项id"
                    },
                    "itemName": {
                      "type": "string",
                      "description": "统计项名称"
                    },
                    "sValue": {
                      "type": "string",
                      "description": "统计项数据（值），带unit格式化后的值"
                    },
                    "unit": {
                      "type": "string"
                      "description": "统计项单位"
                    },
                    "value": {
                      "type": "number",
                      "description": "统计项数据（值），数字的统计项值"
                    }
                  }
                }
              }
            }
          }
        },
        "statisticCurrentMonth": {
          "type": "string",
          description: "统计当前月，格式yyyy年MMM月"
        },
        "stopGroupList": {
          "type": "array",
          "items": {
            "type": "string",
          }
        },
        "totalCount": {
          "type": "number"
        },
        "unCalGroupNum": {
          "type": "number"
        }
      }
    }
    `,
    inputSchema: getInputSchema(
      {
        calBizId: {
          type: "string",
          description: "薪资月，格式yyyyMMM，比如202503M，代表2025年3月",
        },
        // page: {
        //   type: "number",
        //   description: "分页信息, 默认值为0",
        //   default: 0,
        // },
        // pageSize: {
        //   type: "number",
        //   description: "每页数量, 默认值为30",
        //   default: 30,
        // },
        search: {
          type: "string",
          description: "薪资组名称",
        },
      },
      ["calBizId"]
    ),
  },
] as const;
