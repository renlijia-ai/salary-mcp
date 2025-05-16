const getInputSchema = (properties, required) => {
    return {
        type: "object",
        properties: {
            rljN: {
                type: "string",
                description: "登录token",
            },
            ...properties,
        },
        env: {
            type: "string",
            description: "环境",
            enum: ["prod", "pre", "test", "daily"],
        },
        required: ["rljN", "env", ...required],
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
        description: `薪资组列表信息 、可以通过薪资组名称搜索薪资组信息
    返回值 {
    "currentCalBizId": "202504M",
    "hasMore": true,
    "nextCalBizId": "202505M",
    "page": 0,
    "pageSize": 20,
    "previousCalBizId": "202503M",
    "proTips": false,
    "showSalaryCalNewGuide": true,
    "startGroupList": [
        {
            "authCode": 2,
            "calBizId": "202504M",
            "calVersion": 1,
            "gotoSetting": "done",
            "isLocked": false,
            "needRecalculate": false,
            "newTaxRule": "1",
            "operate": false,
            "salaryGroupId": "2b7f03e196274d79a98eb8c48d19754a",
            "salaryGroupName": "0304陈祥豪OA宜搭",
            "salaryPeriodType": 0,
            "setting": true,
            "settingPeriod": true
        }
    ],
    "statisticCurrentMonth": "2025年04月",
    "stopGroupList": [

    ],
    "totalCount": 156,
    "unCalGroupNum": 3
}
    `,
        inputSchema: getInputSchema({
            calBizId: {
                type: "string",
                description: "薪资月",
            },
            page: {
                type: "number",
                description: "分页信息",
                default: 0,
            },
            pageSize: {
                type: "number",
                description: "每页数量",
                default: 30,
            },
            search: {
                type: "string",
                description: "薪资组名称",
            },
        }, []),
    },
    {
        name: "salarySetting_querySalarySetting",
        description: `查询薪酬薪资组的配置信息 
    返回值 {
    "atcUrl": "https://attend.dingtalk.com/portal/index.html#/attendance/statisticsTotal",
    "errorMsg": {

    },
    "forVersion": 74,
    "hasStudyModeFeatures": true,
    "itemData": {
        "ITEMc8b35464e3bb44abac3f071cce402b72": 0,
    },
    "newAtc": true,
    "newTaxRule": "1",
    "salaryGroupName": "0304陈祥豪OA宜搭",
    "salaryItemGroupList": [
        {
            "salarySettingItemList": [
                {
                    "bizGroup": "attence_data",
                    "bizGroupName": "考勤数据",
                    "bizLabel": "attence_data",
                    "bizMessage": "钉钉考勤报表-迟到次数",
                    "bizSource": "atc_32902936",
                    "bizSourceName": "迟到次数",
                    "conversion": true,
                    "itemId": "ITEMc8b35464e3bb44abac3f071cce402b72",
                    "itemName": "迟到次数",
                    "mark": {

                    },
                    "remark": "",
                    "systemFlag": false,
                    "tem": {
                        "defaultBizSource": "atc_32902936",
                        "defaultBizSourceName": "迟到次数",
                        "temId": "atc",
                        "temType": 1
                    },
                    "valueType": "int"
                }
            ]
        }
    ],
    "salaryRuleAuth": true,
    "showGuide": false,
    "studyModeSwitch": false,
    "trialUserVO": {
        "calBizId": "202504M",
        "jobNumber": "",
        "mainDeptName": "静静测试",
        "position": "",
        "userId": "242145512528504",
        "userName": "潘潘",
        "users": [
            {
                "nodeType": 1,
                "user": {
                    "avatar": "",
                    "deptId": -1,
                    "disabled": false,
                    "name": "潘潘",
                    "status": 3,
                    "statusStr": "正式",
                    "unchecked": false,
                    "userId": "242145512528504"
                }
            }
        ]
    },
    "tryCalBtnShow": true
}
    `,
        inputSchema: getInputSchema({
            calBizId: {
                type: "string",
                description: "试算月份 202505M",
            },
            refresh: {
                type: "boolean",
                description: "刷新用户修改数据",
            },
            salaryGroupId: {
                type: "string",
                description: "薪资组id",
            },
        }, []),
    },
    {
        name: "salarySetting_saveSalaryItemList",
        description: `保存薪资项信息 
    返回值 {
    "errorMsg": "【测试】公式中#工号#和#职位#之间需要运算符。\n【个税】公式中#个人医疗保险#，#个人养老保险#，#个人失业保险#薪资项不存在。\n"
}
    `,
        inputSchema: getInputSchema({
            salaryGroupId: {
                type: "string",
                description: "薪资组",
            },
            salaryItemGroupList: {
                type: "string",
                description: "薪资组id",
                items: {
                    type: "object",
                    properties: {
                        itemGroupId: {
                            type: "string",
                            description: "薪资项分组id",
                        },
                        itemGroupName: {
                            type: "string",
                            description: "薪资项分组名称",
                        },
                        remark: {
                            type: "string",
                        },
                        salarySettingItemList: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    bizGroup: {
                                        type: "string",
                                        description: "薪资项分组名称",
                                    },
                                    bizGroupName: {
                                        type: "string",
                                        description: "字段类型；入参没用",
                                    },
                                    bizLabel: {
                                        type: "string",
                                        description: "字段类型； hrmregister 从智能人事花名册获取 , base_pay 从薪资档案获取 , basic_text 算薪所需要的员工信息通过薪资档案进行维护 , data_center 数据中心",
                                        enum: [
                                            "floating_data",
                                            "hrmregister",
                                            "base_pay",
                                            "basic_income",
                                            "attence_data",
                                            "data_center",
                                        ],
                                    },
                                    bizMessage: {
                                        type: "string",
                                        description: "字段信息；入参没用",
                                    },
                                    bizSource: {
                                        type: "string",
                                        description: "字段来源 数据来源 来源如果是考勤等外部数据需要使用getTemSalaryItem 的 bizSource",
                                    },
                                    bizSourceName: {
                                        type: "string",
                                        description: "好像没有用了啊；入参没用",
                                    },
                                    conversion: {
                                        type: "boolean",
                                        description: "薪资档案是否折算 ",
                                    },
                                    formula: {
                                        type: "object",
                                        properties: {
                                            formulaText: {
                                                type: "string",
                                                description: "公式内容；入参好像没用",
                                            },
                                            fractionalCount: {
                                                type: "integer",
                                                description: "小数保留位数 设置传入的保留小数位数,默认2位",
                                            },
                                            fractionalMode: {
                                                type: "string",
                                                description: "小数模式 运算规则，为空默认四舍五入",
                                            },
                                            originalFormulaText: {
                                                type: "string",
                                                description: "原始公式内容 带有#号的",
                                            },
                                        },
                                        additionalProperties: false,
                                        required: [
                                            "formulaText",
                                            "fractionalCount",
                                            "fractionalMode",
                                            "originalFormulaText",
                                        ],
                                    },
                                    itemGroupId: {
                                        type: "string",
                                        description: "字段分组ID",
                                    },
                                    itemId: {
                                        type: "string",
                                        description: "字段Id",
                                    },
                                    itemName: {
                                        type: "string",
                                        description: "字段名称",
                                    },
                                    mark: {
                                        type: "object",
                                        additionalProperties: false,
                                        description: "",
                                    },
                                    remark: {
                                        type: "string",
                                        description: "",
                                    },
                                    systemFlag: {
                                        type: "boolean",
                                        description: "",
                                    },
                                    valueType: {
                                        type: "string",
                                        description: "类型 int string；入参没用",
                                    },
                                },
                                additionalProperties: false,
                                required: [],
                            },
                        },
                    },
                },
            },
        }, ["salaryGroupId"]),
    },
    {
        name: "salaryBasePay_queryConfig",
        description: `薪资档案配置查询 
    返回值 {"data":[{"basePayId":"BASEPAYb71d778df91b45fba6e5aeb880f4e90b","basePayName":"岗位补贴2","must":false,"required":false,"selected":false,"system":false,"type":"数字"}],"hrmData":[{"basePayId":"user_id","basePayName":"UserID","must":false,"required":false,"selected":false,"show":true,"system":false,"type":"文本"}]}
    `,
        inputSchema: getInputSchema({}, []),
    },
    {
        name: "salaryBasePay_getHrmField",
        description: `获取花名册字段定义 
    返回值 [{"label":"姓名","type":"TextField","value":"name"}]
    `,
        inputSchema: getInputSchema({}, []),
    },
    {
        name: "salaryBasePay_saveOneBasepayConfig",
        description: `保存薪资档案、花名册配置信息
    返回值 [{"label":"姓名","type":"TextField","value":"name"}]
    `,
        inputSchema: getInputSchema({
            salaryType: {
                type: "string ",
                enum: ["salaryBasePay", "hrm"],
                description: "字段类型 salaryBasePay 薪资档案 、 hrm 花名册",
            },
            basePayId: {
                type: "string",
                description: "字段的id 新增的时候不用传入",
            },
            basePayName: {
                type: "string",
                description: "字段名称 ",
            },
            must: {
                type: "boolean",
                description: "是否必填 该属性前端页面不展示但数据库里需要存, 供定调薪审批设置使用",
            },
            placeholder: {
                type: "string",
                description: "占位提示（仅输入类组件）该属性前端页面不展示但数据库里需要存, 供定调薪审批设置使用 ",
            },
            required: {
                type: "boolean",
                description: "是否必填 该属性前端页面不展示但数据库里需要存, 供定调薪审批设置使用 ",
            },
            selected: {
                type: "boolean",
                description: "在定调审批模版内是否被选中 该属性前端页面不展示但数据库里需要存, 供定调薪审批设置使用",
            },
            type: {
                type: "string",
                description: "0 数字 、 1 文本  3、 数字选项 、4 文本选项 、7 日期",
                enum: ["数字", "文本", "数字选项", "文本选项", "日期"],
            },
            show: {
                type: "boolean",
                description: "人事字段在列表中是否展示 true-展示 false-不展示(默认)",
            },
            optionContent: {
                type: "array",
                items: {
                    type: "string",
                },
            },
        }, []),
    },
    {
        name: "salarySetting_getTemSalaryItemByAi",
        description: `获取所有可以被薪资项yin'y
    返回值  {"atcUrl":"https://attend.dingtalk.com/portal/index.html#/attendance/statisticsTotal","newAtc":true,"taxCalConfigType":"pts","temSalaryItemGroupVOS":[{"name":"人事信息","temSalaryItemVOS":[{"bizGroup":"hrmregister","bizSource":"job_number","hide":false,"itemName":"工号","status":0,"tem":{"defaultBizSource":"job_number","defaultBizSourceName":"工号","temId":"hrm","temType":1}}]}]}
    `,
        inputSchema: getInputSchema({
            salaryGroupId: {
                type: "string",
                description: "薪资组 id",
            },
        }, ["salaryGroupId"]),
    },
    {
        name: "salarySetting_saveSalaryItemList_hrm",
        description: `新增或者修改来源是 智能人数的数据（bizGroup=hrmregister 的薪资项
    `,
        inputSchema: getInputSchema({
            salaryGroupId: {
                type: "string",
                description: "薪资组",
            },
            salarySettingItemVO: {
                type: "object",
                description: "薪资项信息",
                itemGroupId: {
                    type: "string",
                    description: "薪资组id",
                },
                bizGroup: {
                    type: "string",
                    description: "字段类型",
                    enum: ["hrmregister"],
                    default: "hrmregister",
                },
                bizGroupName: {
                    type: "string",
                    description: "",
                },
                bizLabel: {
                    type: "string",
                    description: "薪资组id",
                },
                bizSource: {
                    type: "string",
                    description: "字段来源 ",
                },
                itemId: {
                    type: "string",
                    description: "更新的时候需要传入 ，创建的时候不需要",
                },
                itemName: {
                    type: "string",
                    description: "薪资项的名称",
                },
                remark: {
                    type: "string",
                    description: "备注信息",
                },
            },
        }, ["salaryGroupId", "salarySettingItemVO"]),
    },
    {
        name: "salarySetting_saveSalaryItemList_basePay",
        description: `新增或者修改来源是 薪资档案（bizGroup=base_pay） 的薪资项
    `,
        inputSchema: getInputSchema({
            salaryGroupId: {
                type: "string",
                description: "薪资组",
            },
            salarySettingItemVO: {
                type: "object",
                description: "薪资项信息",
                itemGroupId: {
                    type: "string",
                    description: "薪资组id ",
                },
                bizGroup: {
                    type: "string",
                    description: "字段类型",
                    enum: ["base_pay"],
                    default: "base_pay",
                },
                bizSource: {
                    type: "string",
                    description: "字段来源 ",
                },
                itemId: {
                    type: "string",
                    description: "更新的时候需要传入 ，创建的时候不需要",
                },
                itemName: {
                    type: "string",
                    description: "薪资项的名称",
                },
                remark: {
                    type: "string",
                    description: "备注信息",
                },
            },
        }, ["salaryGroupId", "salarySettingItemVO"]),
    },
    {
        name: "salarySetting_saveSalaryItemList_act",
        description: `新增或者修改来源是 钉钉考勤报表（bizGroup=battence_data） 的薪资项
    `,
        inputSchema: getInputSchema({
            salaryGroupId: {
                type: "string",
                description: "薪资组",
            },
            salarySettingItemVO: {
                type: "object",
                description: "薪资项信息",
                itemGroupId: {
                    type: "string",
                    description: "薪资组id ",
                },
                bizGroup: {
                    type: "string",
                    description: "字段类型",
                    enum: ["attence_data"],
                    default: "attence_data",
                },
                bizSource: {
                    type: "string",
                    description: "字段来源 ",
                },
                itemId: {
                    type: "string",
                    description: "更新的时候需要传入 ，创建的时候不需要",
                },
                itemName: {
                    type: "string",
                    description: "薪资项的名称",
                },
                remark: {
                    type: "string",
                    description: "备注信息",
                },
            },
        }, ["salaryGroupId", "salarySettingItemVO"]),
    },
    {
        name: "salarySetting_saveSalaryItemList_floatingData",
        description: `新增或者修改来源为 每月手动导入（bizGroup=floating_data） 的薪资项
    `,
        inputSchema: getInputSchema({
            salaryGroupId: {
                type: "string",
                description: "薪资组",
            },
            salarySettingItemVO: {
                type: "object",
                description: "薪资项信息",
                itemGroupId: {
                    type: "string",
                    description: "薪资组id ",
                },
                bizGroup: {
                    type: "string",
                    description: "字段类型",
                    enum: ["floating_data"],
                    default: "floating_data",
                },
                bizSource: {
                    type: "string",
                    description: "字段来源 ",
                },
                itemId: {
                    type: "string",
                    description: "更新的时候需要传入 ，创建的时候不需要",
                },
                itemName: {
                    type: "string",
                    description: "薪资项的名称",
                },
                remark: {
                    type: "string",
                    description: "备注信息",
                },
            },
        }, ["salaryGroupId", "salarySettingItemVO"]),
    },
    {
        name: "salarySetting_saveSalaryItemList_other",
        description: `新增或者修改来源为 自定义公式计算（bizGroup=other） 的薪资项
    `,
        inputSchema: getInputSchema({
            salaryGroupId: {
                type: "string",
                description: "薪资组",
            },
            salarySettingItemVO: {
                type: "object",
                description: "薪资项信息",
                itemGroupId: {
                    type: "string",
                    description: "薪资组id ",
                },
                bizGroup: {
                    type: "string",
                    description: "字段类型",
                    enum: ["other"],
                    default: "other",
                },
                bizSource: {
                    type: "string",
                    description: "字段来源 ",
                },
                itemId: {
                    type: "string",
                    description: "更新薪资项数据的时候需要传入 ，新增薪资项数据的时候不需要",
                },
                itemName: {
                    type: "string",
                    description: "薪资项的名称",
                },
                remark: {
                    type: "string",
                    description: "备注信息",
                },
                formula: {
                    type: "object",
                    description: "公式配置信息",
                    originalFormulaText: {
                        type: "string",
                        description: "公式 例子 #aaa# +#部门# +#姓名#",
                    },
                    fractionalCount: {
                        type: "number",
                        description: "小数保留位数， 举例 4 代表保留 4位小数",
                        default: 4,
                    },
                    fractionalMode: {
                        type: "string",
                        description: "小数模式. round 四舍五入, floor 向下取整  ,ceil 向上取整",
                        enum: ["round", "floor", "ceil"],
                        default: "round",
                    },
                },
            },
        }, ["salaryGroupId", "salarySettingItemVO", "formula"]),
    },
    {
        name: "salarySetting_saveSalaryItemList_socialSecurityData",
        description: `新增或者修改来源为 从社保公积金获取（bizGroup=social_security_data） 的薪资项
    `,
        inputSchema: getInputSchema({
            salaryGroupId: {
                type: "string",
                description: "薪资组",
            },
            salarySettingItemVO: {
                type: "object",
                description: "薪资项信息",
                itemGroupId: {
                    type: "string",
                    description: "薪资组id ",
                },
                bizGroup: {
                    type: "string",
                    description: "字段类型",
                    enum: ["social_security_data"],
                    default: "social_security_data",
                },
                bizSource: {
                    type: "string",
                    description: "字段来源 ",
                },
                itemId: {
                    type: "string",
                    description: "更新的时候需要传入 ，创建的时候不需要",
                },
                itemName: {
                    type: "string",
                    description: "薪资项的名称",
                },
                remark: {
                    type: "string",
                    description: "备注信息",
                },
            },
        }, ["salaryGroupId", "salarySettingItemVO"]),
    },
    {
        name: "salarySetting_generateItemGroup",
        description: `新增 薪资项分组
    `,
        inputSchema: getInputSchema({
            itemGroupName: {
                type: "string",
                description: `薪资项分组的名称
    `,
            },
            remark: {
                type: "string",
                description: `备注信息
  `,
            },
            salaryGroupId: {
                type: "string",
                description: `薪资组 id 
    `,
            },
        }, []),
    },
    {
        name: "salarySetting_editItemGroup",
        description: `修改 薪资项分组
    `,
        inputSchema: getInputSchema({
            itemGroupName: {
                type: "string",
                description: `薪资项分组的名称
    `,
            },
            remark: {
                type: "string",
                description: `备注信息
  `,
            },
            salaryGroupId: {
                type: "string",
                description: `薪资组 id 
    `,
            },
            itemGroupId: {
                type: "string",
                description: `薪资分组 id 
`,
            },
        }, []),
    },
];
