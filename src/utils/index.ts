export function getLocalTime() {
    const now = new Date();

    // 自动补零函数
    const pad = (num: string | number) => num.toString().padStart(2, '0');

    return `${ now.getFullYear() }-${ pad(now.getMonth() + 1) }-${ pad(now.getDate()) } ` +
        `${ pad(now.getHours()) }:${ pad(now.getMinutes()) }:${ pad(now.getSeconds()) }`;
}

