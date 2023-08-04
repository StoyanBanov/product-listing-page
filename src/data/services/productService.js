import products from '../products.json'

export function getProducts({ catId, skip = 0, show, minPrice = 0, maxPrice = 10000, search = '' }) {
    const count = skip + show

    const searchRegex = new RegExp(search, 'i')

    const filterPredicate = p =>
        p.catId === catId &&
        p.price >= minPrice &&
        p.price <= maxPrice &&
        (searchRegex.test(p.name) ||
            searchRegex.test(p.description))

    return Promise.resolve({
        list: products.filter(filterPredicate).slice(skip, count ?? undefined),
        totalCount: products.filter(filterPredicate).length
    })
}