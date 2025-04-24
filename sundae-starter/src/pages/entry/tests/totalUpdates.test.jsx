import {render, screen} from "../../../test-utils/testing-library.utils";
import userEvent from "@testing-library/user-event";
import Options from '../Options.jsx';
import OrderEntry from '../OrderEntry.jsx';

test("update scoop subtotal when scoop change", async () => {
    const user = userEvent;
    render(<Options optionType={"scoops"} /> );

    // make sure total starts out at $0.00
    const scoopsTotal = screen.getByText("Scoops total: $", {exact: false})
    expect(scoopsTotal).toHaveTextContent('0.00')

    // update vanilla scoops to 1, and check subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"})

    // update vanilla scoops to 1 and check the subtotal
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1")
    expect(scoopsTotal).toHaveTextContent('2.00')

    // update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole("spinbutton", {name: "Chocolate"})
    await user.clear(chocolateInput)
    await user.type(chocolateInput, "2")
    expect(scoopsTotal).toHaveTextContent('6.00')
})

test("update toppings subtotal when toppings change", async () => {
    const user = userEvent;
    render(<Options optionType={"toppings"} /> );

    // make sure total starts out at $0.00
    const toppingsTotal = screen.getByText("Toppings total: $", {exact: false})
    expect(toppingsTotal).toHaveTextContent('0.00')

    // add cherries and check subtotal
    const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"})
    await user.click(cherriesCheckbox);
    expect(toppingsTotal).toHaveTextContent('1.50')

    // add hot fudge and check subtotal
    const hotFudgeCheckbox = await screen.findByRole("checkbox", {name: "Hot Fudge"})
    await user.click(hotFudgeCheckbox)
    expect(toppingsTotal).toHaveTextContent('3.00')

    // remove hot fudge and check subtotal
    await user.click(hotFudgeCheckbox)
    expect(toppingsTotal).toHaveTextContent('1.50')
})

describe('grand total', () => {
    test('grand total starts at $0.00', () => {
        // Test the total starts out at $0.00
        const { unmount } = render(<OrderEntry />)
        const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ })
        expect(grandTotal).toHaveTextContent("0.00");

        unmount();
    })

    test('grand total updates properly if scoop is added first', async () => {
        const user = userEvent.setup();
        render(<OrderEntry />)
        const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ })

        // update vanilla scoops to 2 and check grand total
        const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"})
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "2")
        expect(grandTotal).toHaveTextContent('4.00')

        // add cherries and check grand total
        const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"})
        await user.click(cherriesCheckbox)
        expect(grandTotal).toHaveTextContent('5.50')
    })

    test('grand total updates properly if topping is added first', async () => {
        const user = userEvent.setup();
        render(<OrderEntry />)
        const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ })

        // add cherries and check grand total
        const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"})
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('1.50')

        // update vanilla scoops to 2 and check grand total
        const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"})
        await user.type(vanillaInput, "2")
        expect(grandTotal).toHaveTextContent('5.50')

    })

    test('grand total updates properly if item i removed', async () => {
        const user = userEvent.setup();
        render(<OrderEntry />)
        const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/})

        // add cherries and check grand total
        const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"})
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('1.50')

        // remove cherries and check grand total
        await user.click(cherriesCheckbox)
        expect(grandTotal).toHaveTextContent('0.00')

        // update vanilla scoops to 2 and check grand total
        const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"})
        await user.type(vanillaInput, "2")
        expect(grandTotal).toHaveTextContent('4.00')

        // remove 1 vanilla scoop and check grand total
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "1")
        expect(grandTotal).toHaveTextContent('2.00')


    })

})