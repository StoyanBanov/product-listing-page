import { ProductsList } from "./ProductsList"
import { ProductFilters } from "./ProductFilters"

export const ProductPage = () => {

    return (
        <>
            <section>
                2
            </section>

            <section>
                Cat Description
            </section>

            <section>
                Sort
            </section>

            <div className="productsContainer">
                <ProductFilters />

                <ProductsList />
            </div>
        </>
    )
}