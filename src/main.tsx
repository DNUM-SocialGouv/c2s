import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import store from './store';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <Router basename="/espace-membre">
                    <App />
                </Router>
            </Provider>
        </React.StrictMode>
    );
} else {
    console.error('The element with the ID "root" was not found.');
}
