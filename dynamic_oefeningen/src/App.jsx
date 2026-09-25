// Basis CSS imports
import "modern-normalize";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {useState} from "react";
import {PageRouter} from "./components/navigation/PageRouter.jsx";
import {SandboxNavBar} from "./components/navigation/SandboxNavBar.jsx";
import {NAV_EXERCISES} from "./constants/navConstants.js";

function App() {
    // State die bijhoudt welke pagina op dit moment actief is (standaard het overzicht van oefeningen)
    const [activeNavBarItem, setActiveNavBarItem] = useState(NAV_EXERCISES);

    return (
        <>
            {/* Navigatiebalk bovenaan met de terug-knop */}
            <SandboxNavBar
                activeNavBarItem={activeNavBarItem}
                onSelectNavBarItem={setActiveNavBarItem}
            />

            {/* De router die op basis van activeNavBarItem de juiste pagina toont */}
            <PageRouter
                activeNavBarItem={activeNavBarItem}
                onSelectNavBarItem={setActiveNavBarItem}
            />
        </>
    );
}

export default App;
