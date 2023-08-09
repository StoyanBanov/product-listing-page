export const SHOW_PRODUCTS_DEFAULT = 20

export const MAX_PRICE_DEFAULT = 1000

export const MAX_ROWS = 5

export const CRITICAL_WIDTH = 450

export const MOBILE_WIDTH_MAX = 1000

export const WIDTH_BORDERS = {}

Object.defineProperties(WIDTH_BORDERS, {
    2: {
        value: 750
    },
    3: {
        value: 1000
    },
    4: {
        value: 1350
    },
    5: {
        value: 1920
    },
    6: {
        value: 2600
    }
})

export const MAX_SHOW_PER_WIDTH = {}

Object.defineProperties(MAX_SHOW_PER_WIDTH, {
    750: {
        value: 2 * MAX_ROWS,
        enumerable: true
    },
    1000: {
        value: 3 * MAX_ROWS,
        enumerable: true
    },
    1920: {
        value: 4 * MAX_ROWS,
        enumerable: true
    },
    2600: {
        value: 5 * MAX_ROWS,
        enumerable: true
    },
    99999: {
        value: 6 * MAX_ROWS,
        enumerable: true
    }
})