import axios from 'axios'
import {useEffect, useState} from 'react';
import ScoopOption from './ScoopOption.jsx';
import ToppingOption from './ToppingOption.jsx';
import {Row} from 'react-bootstrap';
import AlertBanner from '../common/AlertBanner.jsx';

export default function Options({optionType}) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);

    // optionType is 'scoops' or 'toppings'
    useEffect(() => {
        axios
            .get(`http://localhost:3030/${optionType}`)
            .then((response) => setItems(response.data))
            .catch(error =>setError(true));
    }, [optionType])

    if (error) {
        return <AlertBanner error={error} />;
    }

    const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

    const optionItems = items.map((item) => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
        />
    ));

    return (
        <Row>{optionItems}</Row>
    )
}