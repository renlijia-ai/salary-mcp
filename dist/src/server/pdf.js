import fetch, { FormData } from "node-fetch";
import { marked } from "marked";
import { AI_MCP_Tms } from "../constants/index.js";
import htmlPdf from "html-pdf";
// 将流转换成 buffer 的函数
function streamToBuffer(html) {
    return new Promise((resolve, reject) => {
        htmlPdf.create(html, {}).toBuffer(function (err, res) {
            resolve(res);
        });
    });
}
export async function convertMarkdownToPdfAndUpload(markdownText) {
    // 将Markdown转换为HTML
    const html = marked(markdownText);
    const pdfBuffer = await streamToBuffer(html);
    // console.log(pdfBuffer, "ressss");
    try {
        const formData = new FormData();
        formData.append("file", new Blob([pdfBuffer], { type: "application/pdf" }), "document.pdf");
        const response = await fetch("http://tps.renlijia.com/openapi/file/upload", {
            method: "POST",
            headers: {
                token: AI_MCP_Tms,
            },
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }
        const result = await response.json();
        // console.log(result, "resultresultresult");
        return result.result.url;
    }
    catch (error) {
        console.error("Markdown to PDF conversion failed:", error);
        throw error;
    }
}
// convertMarkdownToPdfAndUpload("## ffff");
