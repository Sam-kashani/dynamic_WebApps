import {Card} from "react-bootstrap";

// Oefening 7.3: Herbruikbaar kaartje voor een enkel item (Person, PersonScore, City)
// Voorkomt duplicatie van Card en Card.Body styling
export function SectionCard(props) {
    const {children} = props;

    return (
        <Card className="h-100 text-center shadow-sm">
            <Card.Body className="p-2">
                {/* children is de specifieke inhoud van het kaartje */}
                {children}
            </Card.Body>
        </Card>
    );
}
