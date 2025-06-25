import { marked } from "marked";
import puppeteer from "puppeteer";
import fetch, { FormData } from "node-fetch";
import { AI_MCP_Tms } from "../constants/index.js";
/**
 * 将Markdown文本转换为PDF并上传
 * @param markdownText Markdown格式的文本
 * @returns 上传后的PDF文件URL
 */
export async function convertMarkdownToPdfAndUpload(markdownText) {
    try {
        // 将Markdown转换为HTML
        const html = marked(markdownText);
        // 使用Puppeteer将HTML转换为PDF
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // 设置HTML内容和样式
        await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              padding: 20px;
            }
            h1, h2, h3 { color: #333; }
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 10px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th { background-color: #f5f5f5; }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `);
        // 生成PDF Buffer
        const pdfBuffer = await page.pdf({
            format: "A4",
            margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
            printBackground: true,
        });
        await browser.close();
        // 上传PDF文件
        const formData = new FormData();
        // @ts-ignore: Blob is available in node-fetch but TypeScript doesn't recognize it
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
        return result.result.url;
    }
    catch (error) {
        console.error("Error converting markdown to PDF:", error);
        throw error;
    }
}
