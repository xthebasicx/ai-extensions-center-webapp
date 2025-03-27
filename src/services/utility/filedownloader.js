export const FileDownloader = {
    downloadFile(data, fileName, mimeType = 'application/octet-stream') {
        const blob = new Blob([data], { type: mimeType });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
};