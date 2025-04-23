import {render, screen} from "../../../test-utils/testing-library.utils";
import userEvent from "@testing-library/user-event";
import Options from '../Options.jsx';

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