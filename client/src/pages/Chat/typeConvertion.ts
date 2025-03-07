export function dataURLToBlob(dataUrl:any) {
    const [header, data] = dataUrl.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(data);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mime });
}


export function blobToFile(blob:any, fileName:any) {
    return new File([blob], fileName, { type: blob.type });
}
