import './bootstrap';
import './config';

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";

window.Inertia = Inertia;
window.Link = Link;

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
})