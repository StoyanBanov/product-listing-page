import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { ProductPage } from './components/productsPge/ProductPage';
import { DimensionsContextProvider } from './components/common/contexts/dimensionsContext/DimensionsContext';

function App() {

    return (
        <DimensionsContextProvider>
            <Header />

            <main className="mainContainer">
                <Routes>
                    <Route path='/' element={<Navigate to={'categories/1/cat1'} replace />} />
                    <Route path='/categories/:catId/:catName' element={<ProductPage />} />
                </Routes>
            </main>

            <Footer />
        </DimensionsContextProvider>
    );
}

export default App;
