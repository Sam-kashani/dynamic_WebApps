import {Card, Col} from "react-bootstrap";
import {Section} from "../common/Section.jsx";
import {SectionCard} from "../common/SectionCard.jsx";

// Component voor één individuele persoon
export function Person(props) {
    const {person} = props;

    return (
        // Grid verdeling volgens de opgave:
        // xs (mobiel) = 1 kolom (12/12)
        // sm = 2 kolommen (6/12)
        // md = 3 kolommen (4/12)
        // lg = 4 kolommen (3/12)
        // xl (groot scherm) = 6 kolommen (2/12)
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3">
            {/* Oefening 7.3: Gebruik van herbruikbare SectionCard */}
            <SectionCard>
                <Card.Title className="h6 mb-1">{person.name}</Card.Title>
                <Card.Text className="small text-muted mb-0">score: {person.score}</Card.Text>
                <Card.Text className="small text-muted mb-0">{person.city}</Card.Text>
            </SectionCard>
        </Col>
    );
}

// Herbruikbare component die een hele lijst personen in een Card toont
export function Persons(props) {
    const {persons, title} = props;

    return (
        // Oefening 7.2: Gebruik van herbruikbare Section component met props.children
        <Section title={title}>
            {persons?.map(p => (
                <Person key={p.id} person={p}/>
            ))}
        </Section>
    );
}
