import { render, screen } from '@testing-library/react';
import Options from '../Options.jsx';


test('Displays image for each scoop option from server', async () => {
    render(<Options optionType="scoops" />);

    // find images
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    // @ts-ignore
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
})

test('displays image for each toppings option from server', async () => {
    render(<Options optionType="toppings" />);

    // find images, expect 3 based on what msw returns
    const toppingImages = await screen.findAllByRole("img", { name: /topping$/i });
    expect(toppingImages).toHaveLength(3);

    // check the actual alt text for the images
    const altText = toppingImages.map((element) => element.alt);
    expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot Fudge topping"]);
})