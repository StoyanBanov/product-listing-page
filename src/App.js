import './App.css';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';

function App() {

    return (
        <>
            <Header />

            <main className="mainContainer">
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
                    <aside>
                        Filter
                    </aside>

                    <section>
                        <div className="productGrid">

                        </div>
                        <button>Load More</button>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default App;
