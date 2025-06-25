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
        name: "salaryGroup_generate_pdf",
        description: `将Markdown文本转换为PDF并获取下载链接
    返回值:
    {
      "success": true,
      "result": {
        "pdfUrl": "string" // 上传后的PDF文件URL
      }
    }
    `,
        inputSchema: getInputSchema({
            markdownText: {
                type: "string",
                description: "需要转换的Markdown文本内容",
            },
        }, ["markdownText"]),
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
    {
        name: "salaryGroup_tableData",
        description: `薪酬报表，包含人力成本统计、薪资结构构成、固定薪资水平分析、实发工资水平分析、人均成本等
    返回值
    {
      "type": "object",
      "required": [],
      "properties": {
        "result": {
          "type": "object",
          "required": [],
          "properties": {
            "followSalaryAuth": {
              "type": "boolean"
            },
            "hasCal": {
              "type": "boolean"
            },
            "hasSetLaborCosts": {
              "type": "boolean"
            },
            "hasSetSalaryBill": {
              "type": "boolean"
            },
            "laborCosts": {
              "type": "object",
              "description": "本月人力成本统计总记",
              "required": [],
              "properties": {
                "averageCosts": {
                  "type": "number",
                  "description": "人均成本的值，单位：万元"
                },
                "averageCostsGrowth": {
                  "type": "number",
                  "description": "人均成本的相对上月增长，单位：% "
                },
                "demoFlag": {
                  "type": "string"
                },
                "laborCostsChainGrowth": {
                  "type": "number",
                  "description": "人力成本总额的相对上月增长，单位：% "
                },
                "laborCostsSum": {
                  "type": "number",
                  "description": "人力成本总额的值，单位：万元"
                },
                "numberSum": {
                  "type": "number",
                  "description": "发薪人数的值，单位：人"
                },
                "numberSumGrowth": {
                  "type": "number",
                  "description": "发薪人数的相对上月增长，单位：%"
                },
                "reportsId": {
                  "type": "string"
                }
              }
            },
            "laborCostsStat": {
              "type": "object",
              "required": [],
              "properties": {
                "demoFlag": {
                  "type": "string"
                },
                "laborCostsStatDataVO": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": [],
                    "description": "按一级部门统计人力成本",
                    "properties": {
                      "dept_id1": {
                        "type": "string",
                        "description": "一级部门的部门名称"
                      },
                      "totalCost": {
                        "type": "string",
                        "description": "人力成本总额，单位：万元"
                      },
                      "number": {
                        "type": "number",
                        "description": "发薪人数，单位：人"
                      }
                    }
                  }
                },
                "reportsId": {
                  "type": "string"
                }
              }
            },
            "netWage": {
              "type": "object",
              "description": "实发工资水平分析",
              "required": [],
              "properties": {
                "average": {
                  "type": "number"
                  "description": "平均实发工资，单位：万元",
                },
                "demoFlag": {
                  "type": "string"
                },
                "reportsId": {
                  "type": "string"
                },
                "sum": {
                  "type": "number"
                  "description": "实发工资总额，单位：万元",
                }
              }
            },
            "regularWage": {
              "type": "object",
              "description": "固定薪资水平分析",
              "required": [],
              "properties": {
                "average": {
                  "type": "number",
                  "description": "平均基本工资，单位：万元",
                },
                "demoFlag": {
                  "type": "string"
                },
                "reportsId": {
                  "type": "string"
                },
                "sum": {
                  "type": "number",
                  "description": "基本工资总额，单位：万元",
                }
              }
            },
            "salaryStructure": {
              "type": "object",
              "required": [],
              "description": "薪资结构构成",
              "properties": {
                "dataVO": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": [],
                    "properties": {
                      "ratio": {
                        "type": "string",
                        "description": "薪资项、统计项 的 比例、占比"
                      },
                      "salaryItem": {
                        "type": "string",
                        "description": "薪资项,、统计项 的 名称"
                      }
                    }
                  }
                },
                "demoFlag": {
                  "type": "string"
                },
                "reportsId": {
                  "type": "string"
                }
              }
            },
            "showLaborCostsSetting": {
              "type": "boolean"
            },
            "showReportAuthSetting": {
              "type": "string"
            },
            "systemMonth": {
              "type": "string"
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
            systemMonth: {
                type: "string",
                description: "薪资月，格式yyyyMMM，比如202503M，代表2025年3月",
            },
        }, ["systemMonth"]),
    },
];
