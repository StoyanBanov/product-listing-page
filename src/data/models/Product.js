export class Product {
    constructor(_id, catId, thumbnail, name, description, price, rating) {
        this._id = _id
        this.catId = catId
        this.thumbnail = thumbnail
        this.name = name
        this.description = description
        this.price = price
        this.rating = rating
    }
}

export class Watch extends Product {
    constructor(_id, catId, thumbnail, name, description, price, rating, dialColor) {
        super(_id, catId, thumbnail, name, description, price, rating)
        this.dialColor = dialColor
    }
}

export class Necklace extends Product {
    constructor(_id, catId, thumbnail, name, description, price, rating, mainColor) {
        super(_id, catId, thumbnail, name, description, price, rating)
        this.mainColor = mainColor
    }
}