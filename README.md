# salary-Web MCP Server

salary-Web 是基于 MCP 协议的 AI 智能体工资条管理工具。作为企业薪酬场景的基础服务能力，支持各类智能体应用安全、便捷地接入工资条管理能力。平台通过标准化接口，向
LLM、Agent 等智能体开放工资条全流程服务，具备高度通用性和可扩展性。

## 应用场景

在未使用薪酬 MCP之前，某中型科技公司的 HR 需要登录到智能薪酬系统中手动查询员工的薪酬数据，并查看各种报表来整理数据进行分析。这个过程耗时且复杂。接入智能薪酬的 MCP 系统后，HR 可以通过集成的AI 智能体中在本地对薪酬数据和其他经营数据进行分析。AI 能够自助分析数据，快速查询所需的成本数据，帮助 HR 迅速获取人力成本的全面视图和深入洞察。这一功能支持 HR 进行决策优化，提升薪酬管理的精准性和效率，确保企业薪酬管理的合规性和智能化升级。

## 功能特点

- **深度数据洞察**：通过智能分析工具，轻松获取薪资组的全面信息。支持按名字查询薪资组列表，按薪资组 ID 获取详细的算薪人数、人力成本、应发和实发工资等关键数据。借助这些洞察，企业可以精准掌控薪酬结构，优化资源配置，提升决策效率。
- **高效的核算薪资流程**：轻松导出个税表和银行表，确保薪资核算的准确性和合规性。
- **智能工资条操作**：实时查看工资条发送确认情况，支持通过薪资组生成工资条、Excel 上传及发送本月工资条。
- **强大的报表功能**：提供人力成本统计报表、薪酬看板和成本看板，助力企业掌握全局，优化资源配置。

##  3.使用和配置
要使用工具的能力，你需要先成为钉钉智能工资条的用户

在 Cursor 和 Cline中配置

```
{
  "mcpServers": {
    "salary-web": {
      "args": [
        "-y",
        "@rlj/salary-mcp@latest"
      ],
      "command": "npx",
      "env": {
        "ENV": "test",
        "AI_MCP_Rlj_N": "eyJraWQiOiJhYTcwMjQ5YS0zNTQ3LTRjZjYtYjBiZC0yMzNiNmYwYTZkOGEiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjIxMTAyMzM3NjEsInN1YiI6IntcImlkXCI6XCJzaWRfYmYyODRiZGMwMGViNDFlYjkwMWM3ODA4NDAwNTI1NTBcIixcInNlc3Npb25BdHRyc1wiOntcIl9MT0dJTl9USU1FXCI6MTc1MDIzMzc1MzQyNyxcIl9MT0dJTl9DTElFTlRcIjpcIk9BXCIsXCJKX0dMT0JBTF9VU0VSX0tFWVwiOntcImNvcnBJZFwiOlwiZGluZzRjN2MzMTFhNzAxODUxYWMzNWMyZjQ2NTdlYjYzNzhmXCIsXCJ1c2VySWRcIjpcIjI0MjE0NTUxMjUyODUwNFwifSxcIkpfVVNFUl9LRVlcIjp7XCJjb3JwSWRcIjpcImRpbmc0YzdjMzExYTcwMTg1MWFjMzVjMmY0NjU3ZWI2Mzc4ZlwiLFwibG9naW5BcHBcIjpcIlNBTEFSWVwiLFwibmFtZVwiOlwi5r2Y5oyv6LaFXCIsXCJyb2xlc1wiOltcImFkbWluXCJdLFwidXNlcklkXCI6XCIyNDIxNDU1MTI1Mjg1MDRcIn0sXCJfTE9HSU5fQVBQXCI6XCJTQUxBUllcIn0sXCJ0XCI6MTc1MDIzMzc2MTA5Nn0ifQ.mG7grvARaY80Fg27GUz1XH2OTDN-atTlaTjGuBkNF33tPoqYrRgosrphBGoqwf4uNwJtpu7jmQ0jI8E42jj2fQO_Aq1bQcj4YyKiCE-f8i0crRT47XGe6FoEzt6pwNiNFvdglNlXdCs2Gx--IazMiDIjwPUicpzZcLi6K02BweukjUCXnD6GHdSvvkJOPV6PIPO5FxGr7647MhY2ySw7kuIiw3xGRq2IFrI3PskF37fK2yGmKIhYpCQxnPVyYtysLhg000Tk-PToeNcrOsEEuu3RlBaST43ra9kFYbc6lyDUhwzfkaGjz4zc3kVVb1xfDQyKwW_Nn22VVvvbnln0jw"
      }
    }
  }
}

``` 