export const splitStr = '&&&---&&&'

export function getIdInfo(value: string) {
    const [id, time] = (value||'').split(splitStr)
    return { id, time }
}
