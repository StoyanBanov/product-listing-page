import categories from '../categories.json'

export function getCategories() {
    return Promise.resolve(categories)
}

export function getCategoryById(id) {
    return Promise.resolve(categories.find(c => c._id === id))
}