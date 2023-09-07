import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { ProductPage } from './components/productsPge/ProductPage';
import { DimensionsContextProvider } from './components/common/contexts/dimensionsContext/DimensionsContext';
import { CartContextProvider } from './components/common/contexts/CartContext';
import { AlertContextProvider } from './components/common/contexts/alertContext/AlertContext';

function App() {

    return (
        <DimensionsContextProvider>
            <CartContextProvider>
                <Header />
                <AlertContextProvider>
                    <main className="mainContainer">
                        <Routes>
                            <Route path='/' element={<Navigate to={'categories/kXwnMCtjkx/watches'} replace />} />
                            <Route path='/categories/:catId/:catName' element={<ProductPage />} />
                        </Routes>
                    </main>
                </AlertContextProvider>

            </CartContextProvider>

            <Footer />

        </DimensionsContextProvider>
    );
}

export default App;
