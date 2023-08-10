import { MAX_PRICE_DEFAULT } from '../../components/productsPge/constants'
import { Product } from '../models/Product'
import products from '../products.json'
import { parseQueryRanges } from './util';

export function getProducts({ catId, skip = 0, show, sortBy = 'rating', order = 'desc', minPrice = 0, maxPrice = MAX_PRICE_DEFAULT, search = '', ...ranges }) {
    const count = skip + show

    const searchRegex = new RegExp(search, 'i')

    const filterPredicateGeneral = p => {
        let hasRangeFilters = true
        for (const [key, value] of Object.entries(parseQueryRanges(ranges))) {
            if (!value.includes(p[key])) {
                hasRangeFilters = false
                break
            }
        }

        return hasRangeFilters
    }

    const filterPredicatePrices = p =>
        p.catId === catId &&
        p.price >= minPrice &&
        p.price <= maxPrice &&
        (searchRegex.test(p.name) ||
            searchRegex.test(p.description))


    let list = products

    if (sortBy) {
        list.sort((a, b) => {
            if (['asc', 'ascending', '1'].includes(order.toLowerCase()))
                return typeof a[sortBy] === 'string' ? a[sortBy].localeCompare(b[sortBy]) : a[sortBy] - b[sortBy]
            else if (['desc', 'descending', '-1'].includes(order.toLowerCase()))
                return typeof a[sortBy] === 'string' ? b[sortBy].localeCompare(a[sortBy]) : b[sortBy] - a[sortBy]
            else return 0
        })
    }

    list = list.filter(filterPredicateGeneral)
    if (list.length > 1)
        list = list.filter(filterPredicatePrices)

    return Promise.resolve({
        list: list.slice(skip, count || undefined),
        totalCount: list.length
    })
}

export async function getProductRanges({ catId, minPrice = 0, maxPrice = MAX_PRICE_DEFAULT, search = '', sort, show, skip, ...ranges }) {
    const { list } = await getProducts({ catId, search, ...ranges })

    //TODO multiple ranges
    let prices = { minPrice, maxPrice }
    if (list.length <= 1) prices = {}
    const { list: listR } = await getProducts({ catId, search, ...prices })

    const prodKeys = Object.keys(new Product())

    const prodRanges = {
        minPrice: list[0]?.price ?? 0,
        maxPrice: list[0]?.price ?? 0
    }

    for (const prod of list) {
        for (const key in prod) {
            if (key === 'price') {
                if (prod.price < prodRanges.minPrice)
                    prodRanges.minPrice = prod.price
                if (prod.price > prodRanges.maxPrice)
                    prodRanges.maxPrice = prod.price
            }
        }
    }

    for (const prod of listR) {
        for (const key in prod) {
            if (!prodKeys.includes(key)) {
                if (!prodRanges.hasOwnProperty(key))
                    prodRanges[key] = new Set()
                prodRanges[key].add(prod[key])
            }
        }
    }

    for (const [k, v] of Object.entries(prodRanges)) {
        if (typeof v === 'object') {
            prodRanges[k] = [...prodRanges[k]]
        }
    }

    return Promise.resolve(prodRanges)
}