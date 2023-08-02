import categories from '../categories.json'

export function getCategories() {
    return categories
}

export function getCategoryById(id) {
    return categories.find(c => c._id === id)
}