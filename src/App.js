// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import Navbar from './components/navbar';
import Carousel from './components/carousal';
import Card from './components/card';
import ImgArtist from './components/imgArtist';
import HistoryComponent from './components/historyComponent';
import Footer from './components/footer';
import BoxChat from './components/BoxChat'; // Nhập BoxChat component
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="app-container">
                    <Navbar />
                    <Carousel />
                    <Routes>
                        <Route path="/boxChat" element={<BoxChat />} /> {/* Định tuyến đến Box Chat */}
                        <Route path="/" element={
                            <>
                                <div className="section-container" style={{ textAlign: "center" }}>
                                    <h2>Art Collection</h2>
                                    <Card />
                                </div>
                                <div className="section-container" style={{ textAlign: "center" }}>
                                    <h2>Artists</h2>
                                    <ImgArtist />
                                </div>
                                <div className="section-container">
                                    <HistoryComponent />
                                </div>
                            </>
                        } />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
