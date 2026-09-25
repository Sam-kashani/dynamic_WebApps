import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function MenuProduct(props) {
    const { product } = props;
    const note = product.notes || product.note;

    return (
        <>
            <Row>
                <Col>
                    {product.name}
                    {product.size && <span className="text-primary"> ({product.size}cl)</span>}
                </Col>
                <Col xs="auto" className="text-end">
                    {product.price.toFixed(2)} &euro;
                </Col>
            </Row>
            {note && (
                <Row>
                    <Col className="text-primary ps-4">
                        {note}
                    </Col>
                </Row>
            )}
        </>
    );
}
