import fetch from "node-fetch";
export async function convertMarkdownToPdfAndUpload(markdownText) {
    try {
        const response = await fetch("https://monitor.renlijia.com/xiao/proxy/mk2pdf", {
            method: "POST",
            body: JSON.stringify({
                text: markdownText,
            }),
        });
        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }
        const result = await response.json();
        return result.result.url;
    }
    catch (error) {
        console.error("Markdown to PDF conversion failed:", error);
        throw error;
    }
}
