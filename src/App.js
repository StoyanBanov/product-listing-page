import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { ProductPage } from './components/productsPge/productPage';

function App() {

    return (
        <>
            <Header />

            <main className="mainContainer">
                <Routes>
                    <Route path='/' element={<Navigate to={'/1/cat1'} replace />} />
                    <Route path='/:catId/:catName' element={<ProductPage />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
