import { get } from '../api'
import categories from '../categories.json'

export async function getCategories() {
    return (await get('/classes/Category')).map(c => ({ ...c, _id: c.objectId.toString() }))

}

export async function getCategoryById(id) {
    return (await getCategories()).find(c => c._id === id)
}