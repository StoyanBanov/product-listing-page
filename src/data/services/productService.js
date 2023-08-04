import products from '../products.json'

export function getProducts({ catId, skip = 0, show, sortBy, order = 'asc', minPrice = 0, maxPrice = 10000, search = '' }) {
    const count = skip + show

    const searchRegex = new RegExp(search, 'i')

    const filterPredicate = p =>
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

    return Promise.resolve({
        list: list.filter(filterPredicate).slice(skip, count ?? undefined),
        totalCount: products.filter(filterPredicate).length
    })
}