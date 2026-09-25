import Container from 'react-bootstrap/Container';
import { MenuProduct } from './MenuProduct.jsx';

export function MenuCard(props) {
    const { products } = props;

    return (
        <Container>
            <h1>Menu</h1>
            {products.map((product) => (
                <MenuProduct key={product.id} product={product} />
            ))}
        </Container>
    );
}
