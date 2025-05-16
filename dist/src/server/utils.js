import fetch from "node-fetch";
import XLSX from "xlsx";
// 将工作表转为带合并的HTML表格
// 获取单元格内容，包括公式和值
function getExcelCellContent(excelCell) {
    if (!excelCell)
        return "";
    // 如果有公式，显示公式文本
    if (excelCell.f) {
        return `=${excelCell.f}`;
    }
    return String(excelCell.v || "");
}
// 检查行是否为空
function isExcelRowEmpty(worksheet, rowIndex, sheetRange) {
    for (let colIndex = sheetRange.s.c; colIndex <= sheetRange.e.c; colIndex++) {
        const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
        const currentCell = worksheet[cellAddress];
        if (currentCell &&
            currentCell.v !== undefined &&
            currentCell.v !== null &&
            currentCell.v !== "") {
            return false;
        }
    }
    return true;
}
// 检查列是否为空
function isExcelColumnEmpty(worksheet, colIndex, sheetRange) {
    for (let rowIndex = sheetRange.s.r; rowIndex <= sheetRange.e.r; rowIndex++) {
        const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
        const currentCell = worksheet[cellAddress];
        if (currentCell &&
            currentCell.v !== undefined &&
            currentCell.v !== null &&
            currentCell.v !== "") {
            return false;
        }
    }
    return true;
}
function convertExcelSheetToHtml(worksheet, sheetName) {
    const excelSheet = worksheet;
    // 创建HTML字符串，先添加元数据信息
    let htmlContent = "<div class='metadata'>\n";
    htmlContent += `sheet name: ${sheetName}\n`;
    htmlContent += "</div>\n";
    htmlContent += "<table>";
    // 获取所有行和列范围
    const sheetRange = XLSX.utils.decode_range(excelSheet["!ref"] || "A1");
    // 将数字索引转换为Excel列标识（A-Z, AA-ZZ）
    function getExcelColumnLabel(index) {
        let columnLabel = "";
        // 处理26以上的列（AA-ZZ）
        if (index >= 26) {
            const firstChar = String.fromCharCode(65 + Math.floor(index / 26) - 1);
            const secondChar = String.fromCharCode(65 + (index % 26));
            columnLabel = firstChar + secondChar;
        }
        else {
            // 处理26以内的列（A-Z）
            columnLabel = String.fromCharCode(65 + index);
        }
        return columnLabel;
    }
    // 添加列标题（A-Z, AA-ZZ）
    htmlContent += "<tr><td></td>";
    for (let colIndex = sheetRange.s.c; colIndex <= sheetRange.e.c; colIndex++) {
        if (!isExcelColumnEmpty(excelSheet, colIndex, sheetRange)) {
            const colLabel = getExcelColumnLabel(colIndex);
            htmlContent += `<td>${colLabel}</td>`;
        }
    }
    htmlContent += "</tr>";
    // 合并信息
    const mergedCells = (excelSheet["!merges"] || []);
    // 构建合并单元格内容映射表
    const mergedContentMap = {};
    mergedCells.forEach((mergedCell) => {
        const { s: start, e: end } = mergedCell;
        // 获取主单元格的内容和样式
        const mainCellAddress = XLSX.utils.encode_cell({ r: start.r, c: start.c });
        const mainCell = excelSheet[mainCellAddress];
        const content = getExcelCellContent(mainCell);
        // 将内容填充到合并区域的每个单元格
        for (let r = start.r; r <= end.r; r++) {
            for (let c = start.c; c <= end.c; c++) {
                const key = `${r}-${c}`;
                mergedContentMap[key] = { content };
            }
        }
    });
    // 遍历每一行
    for (let rowIndex = sheetRange.s.r; rowIndex <= sheetRange.e.r; rowIndex++) {
        // 跳过空行
        if (isExcelRowEmpty(excelSheet, rowIndex, sheetRange)) {
            continue;
        }
        // 添加行号
        const rowNumber = rowIndex + 1;
        htmlContent += `<tr><td>${rowNumber}</td>`;
        for (let colIndex = sheetRange.s.c; colIndex <= sheetRange.e.c; colIndex++) {
            // 跳过空列
            if (isExcelColumnEmpty(excelSheet, colIndex, sheetRange)) {
                continue;
            }
            const cellKey = `${rowIndex}-${colIndex}`;
            const mergedContent = mergedContentMap[cellKey];
            if (mergedContent) {
                // 使用合并单元格的内容
                htmlContent += `<td>${mergedContent.content}</td>`;
            }
            else {
                // 使用普通单元格的内容
                const cellAddress = XLSX.utils.encode_cell({
                    r: rowIndex,
                    c: colIndex,
                });
                const currentCell = excelSheet[cellAddress];
                htmlContent += `<td>${getExcelCellContent(currentCell)}</td>`;
            }
        }
        htmlContent += "</tr>";
    }
    htmlContent += "</table>";
    return htmlContent;
}
export async function convertExcelUrlToHtml(excelUrl) {
    try {
        const response = await fetch(excelUrl);
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        const excelBuffer = await response.buffer();
        // 读取工作簿，注意设置 `cellFormula: true` 来获取公式值
        const excelWorkbook = XLSX.read(excelBuffer, {
            type: "buffer",
            cellFormula: true,
            cellText: false,
            cellDates: true,
            raw: false,
        });
        let htmlResult = "";
        excelWorkbook.SheetNames.forEach((sheetName, index) => {
            if (index > 0) {
                htmlResult += "<hr/>\n";
            }
            const worksheet = excelWorkbook.Sheets[sheetName];
            htmlResult += convertExcelSheetToHtml(worksheet, sheetName);
        });
        return htmlResult;
    }
    catch (error) {
        console.error("Error:", error instanceof Error ? error.message : String(error));
        return undefined;
    }
}
