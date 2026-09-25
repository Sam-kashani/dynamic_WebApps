import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function MenuProduct(props) {
    // Haal het product-object uit de meegegeven props
    const { product } = props;

    // Kijken of er een notitie bij staat (in data.js kan dit 'note' of 'notes' zijn)
    const note = product.notes || product.note;

    return (
        // Fragment <> is verplicht omdat React maar 1 root element toelaat en we hier 2 Rows hebben
        <>
            {/* Rij met de naam, eventuele inhoudsmaat en de prijs */}
            <Row>
                <Col>
                    {product.name}
                    {/* Als size bestaat tonen we dit in het blauw, anders toont React niks */}
                    {product.size && <span className="text-primary"> ({product.size}cl)</span>}
                </Col>
                {/* Prijs netjes rechts uitgelijnd met altijd 2 cijfers na de komma */}
                <Col xs="auto" className="text-end">
                    {product.price.toFixed(2)} &euro;
                </Col>
            </Row>

            {/* Extra rij voor de notitie: rendert alleen als er echt een opmerking is */}
            {note && (
                <Row>
                    {/* ps-4 springt een stukje in naar rechts, text-primary maakt het blauw */}
                    <Col className="text-primary ps-4">
                        {note}
                    </Col>
                </Row>
            )}
        </>
    );
}
