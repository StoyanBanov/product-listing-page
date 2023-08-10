import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProductsList } from './ProductsList'
import { BrowserRouter, useParams } from 'react-router-dom'
import { DimensionsContext } from '../common/contexts/dimensionsContext/DimensionsContext'

import { getProducts } from '../../data/services/productService'
import { CartContext } from '../common/contexts/CartContext'
import { AlertContext } from '../common/contexts/alertContext/AlertContext'
import { MAX_PRICE_DEFAULT } from './constants'
import { parseQueryRanges } from '../../data/services/util'

import products from '../../data/products.json'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

test('shows message for no items when there is no catId', async () => {
    useParams.mockReturnValue({});

    render(
        <BrowserRouter>
            <DimensionsContext.Provider value={{}}>
                <ProductsList setItemsShownHandler={() => { }} />
            </DimensionsContext.Provider>

        </BrowserRouter>
    )

    const title = await screen.findByText('No more products')

    expect(title).toBeInTheDocument()
})

test('shows items', async () => {
    useParams.mockReturnValue({ catId: '1' });

    render(
        <BrowserRouter>
            <DimensionsContext.Provider value={{ windowWidth: 1000 }}>
                <CartContext.Provider value={{}}>
                    <AlertContext.Provider value={{}}>
                        <ProductsList setItemsShownHandler={() => { }} changeIsLoading={() => false} />
                    </AlertContext.Provider>
                </CartContext.Provider>
            </DimensionsContext.Provider>

        </BrowserRouter>
    )

    const title = await screen.findByText('prod19')

    expect(title).toBeInTheDocument()
})

test('shows load more btn', async () => {
    useParams.mockReturnValue({ catId: '1' });

    render(
        <BrowserRouter>
            <DimensionsContext.Provider value={{ windowWidth: 1000 }}>
                <CartContext.Provider value={{}}>
                    <AlertContext.Provider value={{}}>
                        <ProductsList setItemsShownHandler={() => { }} changeIsLoading={() => false} />
                    </AlertContext.Provider>
                </CartContext.Provider>
            </DimensionsContext.Provider>

        </BrowserRouter>
    )

    const title = await screen.findByText('Load More')

    expect(title).toBeInTheDocument()
})