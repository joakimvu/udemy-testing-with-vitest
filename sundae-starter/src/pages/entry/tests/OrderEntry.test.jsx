import { http, HttpResponse } from 'msw'
import {server} from "../../../mocks/server.js"

import { render, screen } from '@testing-library/react';
import OrderEntry from '../OrderEntry.jsx';

test("Handles error for scoops and toppings routes", async () => {
    server.resetHandlers(
        http.get("http://localhost:3030/scoops", () => {
            return new HttpResponse(null, {status: 500});
        }),
        http.get("http://localhost:3030/toppings", () => {
            return new HttpResponse(null, {status: 500});
        })
    );

    render (<OrderEntry />);

    // const alert = await screen.findAllByRole("alert", {name: 'An unexpected occurred. Please try again later'})
    const alert = await screen.findAllByRole("alert")

    expect(alert).toHaveLength(2);
})