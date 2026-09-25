import Container from 'react-bootstrap/Container';
import { MenuProduct } from './MenuProduct.jsx';

export function MenuCard(props) {
    // MenuCard mag niet zelf data importeren, maar krijgt de lijst binnen via props van de ouder
    const { products } = props;

    return (
        <Container>
            <h1>Menu</h1>
            {/* We lussen over alle producten met .map() */}
            {/* De key={product.id} is verplicht voor React om waarschuwingen te voorkomen */}
            {products.map((product) => (
                <MenuProduct key={product.id} product={product} />
            ))}
        </Container>
    );
}
