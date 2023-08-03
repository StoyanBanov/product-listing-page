import products from '../products.json'

export function getProducts({ catId, count = 5, skip = 0 }) {
    return Promise.resolve({
        list: products.filter(i => i.catId === catId).slice(skip, count ?? undefined),
        totalCount: products.filter(i => i.catId === catId).length
    })
}