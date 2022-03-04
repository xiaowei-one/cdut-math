export const downloadFile = async (res: any) => {
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = window.URL.createObjectURL(new Blob([res]));
    let timestamp = new Date().getTime();
    link.download = timestamp + ".pdf";
    document.body.appendChild(link);
    link.click();
};
