import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import Form from "./components/Form/Form";

function App() {
    const {tg} = useTelegram();

    useEffect(() => {
        tg.ready();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path={'form'} element={<Form />}/>
            </Routes>
        </div>
    );
}

export default App;