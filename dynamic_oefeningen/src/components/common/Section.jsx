import {Card, Container, Row} from "react-bootstrap";

// Oefening 7.2: Herbruikbare container voor secties
// Voorkomt duplicatie van Card, Card.Header, Container en Row
export function Section(props) {
    const {title, children} = props;

    return (
        <Card className="mt-3 mb-4 shadow-sm border">
            <Card.Header className="position-relative text-center bg-light py-2 px-3">
                <h3 className="h5 mb-0 fw-bold">{title}</h3>
            </Card.Header>
            <Card.Body>
                <Container fluid className="p-0">
                    <Row>
                        {/* children is de inhoud die tussen <Section>...</Section> wordt geplaatst */}
                        {children}
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}
