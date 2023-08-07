import { MAX_SHOW_PER_WIDTH, SHOW_PRODUCTS_DEFAULT } from "./constants"

export function setCorrectShowValue(initialShow, currentWidth) {
    let show = initialShow ?? SHOW_PRODUCTS_DEFAULT
    const widthBorder = Object.keys(MAX_SHOW_PER_WIDTH).map(Number).sort((a, b) => a - b).find(b => b >= currentWidth)
    if (show > MAX_SHOW_PER_WIDTH[widthBorder])
        show = MAX_SHOW_PER_WIDTH[widthBorder]
    return show
}