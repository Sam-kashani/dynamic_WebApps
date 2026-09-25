import { MenuProduct } from './MenuProduct.jsx';

export function MenuCard() {
    return (
        <div>
            <h1>Menu</h1>
            <MenuProduct productName="cola" />
            <MenuProduct productName="water" />
            <MenuProduct productName="bier" />
            <MenuProduct productName="wijn" />
        </div>
    );
}
