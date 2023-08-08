export function parseQueryRanges(rangesStr) {
    return Object.entries(rangesStr).reduce((obj, [k, v]) => {
        if (v)
            obj[k] = v.split(',')
        return obj
    }, {})
}