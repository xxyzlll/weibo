export function openWeiboUrl(id: number | string | undefined) {
    if (!id) return
    window.open(`https://weibo.com/u/${ id }`, '_blank')
}
