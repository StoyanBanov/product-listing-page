import products from '../products.json'

export function getProducts({ catId, limit, skip = 0 }) {
    return Promise.resolve({
        list: products.filter(i => i.catId === catId).slice(skip, limit ? limit * ++skip : limit),
        totalCount: products.length
    })
}