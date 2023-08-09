import { MAX_SHOW_PER_WIDTH, SHOW_PRODUCTS_DEFAULT } from "./constants"

export function setCorrectShowValue(initialShow, currentWidth) {
    let show = initialShow ?? SHOW_PRODUCTS_DEFAULT
    const widthBorder = Object.keys(MAX_SHOW_PER_WIDTH).map(Number).sort((a, b) => a - b).find(b => b >= currentWidth)
    if (show > MAX_SHOW_PER_WIDTH[widthBorder])
        show = MAX_SHOW_PER_WIDTH[widthBorder]
    return show
}

export function parseFilters(filters) {
    return Object.entries(filters).reduce((obj, [k, v]) => {
        if (Array.isArray(v) && v.length > 0 && !(v.length === 1 && !v[0])) {
            obj[k] = `${v.join(',')}`
        } else if (v) obj[k] = v

        return obj
    }, {})
}

export function getResetQueryParams(queryParamsObj) {
    const resetObj = {
        skip: 0
    }
    if (queryParamsObj.show)
        resetObj.show = queryParamsObj.show
    if (queryParamsObj.sortBy)
        resetObj.sortBy = queryParamsObj.sortBy
    if (queryParamsObj.order)
        resetObj.order = queryParamsObj.order
    if (queryParamsObj.search)
        resetObj.search = queryParamsObj.search

    return resetObj
}

export function isPriceValid(price, max, min) {
    return price &&
        price <= max &&
        price >= min
}

export function trimText(text, maxWidth) {
    return text.substring(0, maxWidth - 3) + (text.length >= maxWidth ? '...' : '')
}