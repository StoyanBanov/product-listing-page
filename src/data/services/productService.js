import products from '../products.json'

export function getProducts({ catId, skip = 0, show }) {
    const count = skip + show
    return Promise.resolve({
        list: products.filter(i => i.catId === catId).slice(skip, count ?? undefined),
        totalCount: products.filter(i => i.catId === catId).length
    })
}