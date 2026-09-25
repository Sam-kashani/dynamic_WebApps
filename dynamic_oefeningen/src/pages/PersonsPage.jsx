import {Card, Col, Container} from "react-bootstrap";
import {PERSON_DATA} from "../data/data.js";
import {Persons} from "../components/exercises/Persons.jsx";
import {Section} from "../components/common/Section.jsx";
import {SectionCard} from "../components/common/SectionCard.jsx";

// Oefening 6.4.7 & 7.3: Toont één score-kaartje met herbruikbare SectionCard
function PersonScore(props) {
    const {score, persons} = props;

    // Filter personen die deze score hebben behaald en pak alleen hun voornaam
    const names = persons
        .filter(p => p.score === score)
        .map(p => p.name.split(" ")[0])
        .join(", ");

    return (
        <Col xs={6} sm={4} md={3} className="mb-3">
            {/* Oefening 7.3: Herbruikbare SectionCard met props.children */}
            <SectionCard>
                <Card.Title className="h5 mb-1">{score}</Card.Title>
                <Card.Text className="small text-muted mb-0">{names}</Card.Text>
            </SectionCard>
        </Col>
    );
}

// Oefening 6.4.7 & 7.2: Component voor unieke scores, gebruikt herbruikbare Section
function PersonScores(props) {
    const {persons, title} = props;

    // Alle unieke scores ophalen en sorteren van klein naar groot
    const allScores = persons.map(person => person.score);
    const uniqueScores = [...new Set(allScores)].sort((a, b) => a - b);

    return (
        // Oefening 7.2: Herbruikbare Section met props.children
        <Section title={title}>
            {uniqueScores.map(score => (
                <PersonScore key={score} score={score} persons={persons}/>
            ))}
        </Section>
    );
}

// Oefening 6.4.8 & 7.3: Eén kaartje voor een stad met SectionCard
function City(props) {
    const {city, count} = props;

    return (
        <Col xs={6} sm={4} md={3} className="mb-3">
            {/* Oefening 7.3: Herbruikbare SectionCard met props.children */}
            <SectionCard>
                <Card.Text className="small mb-0">{city}: {count} personen</Card.Text>
            </SectionCard>
        </Col>
    );
}

// Oefening 6.4.8 & 7.2: Component die per unieke stad telt, gebruikt herbruikbare Section
function Cities(props) {
    const {persons, title} = props;

    // Tel inwoners per stad
    const cityCounts = persons.reduce((acc, person) => {
        acc[person.city] = (acc[person.city] || 0) + 1;
        return acc;
    }, {});

    // Sorteer op aantal inwoners van minste naar meeste
    const sortedCities = Object.entries(cityCounts)
        .map(([city, count]) => ({city, count}))
        .sort((a, b) => a.count - b.count);

    return (
        // Oefening 7.2: Herbruikbare Section met props.children
        <Section title={title}>
            {sortedCities.map(item => (
                <City key={item.city} city={item.city} count={item.count}/>
            ))}
        </Section>
    );
}

// De hoofdpagina voor Personen die alle deeloefeningen onder elkaar toont
export function PersonsPage() {
    // 6.4.3: Sorteer alfabetisch op naam (a -> z)
    const personsSortedByName = [...PERSON_DATA].sort((a, b) => a.name.localeCompare(b.name));

    // 6.4.4: Sorteer omgekeerd alfabetisch op naam (z -> a)
    const personsSortedByNameDesc = [...PERSON_DATA].sort((a, b) => b.name.localeCompare(a.name));

    // 6.4.5: Sorteer op score van laag naar hoog
    const personsSortedByScore = [...PERSON_DATA].sort((a, b) => a.score - b.score);

    // 6.4.6: Filter alleen de personen die in Mechelen wonen
    const personsFromMechelen = PERSON_DATA.filter(p => p.city === "Mechelen");

    return (
        <Container className="mt-3">
            <h1>Personen</h1>

            {/* 6.4.2: Gewoon alle personen in de standaard volgorde */}
            <Persons persons={PERSON_DATA} title="alle personen"/>

            {/* 6.4.3: Personen gesorteerd op naam A-Z */}
            <Persons persons={personsSortedByName} title="personen gesorteerd op naam"/>

            {/* 6.4.4: Personen gesorteerd op naam Z-A */}
            <Persons persons={personsSortedByNameDesc} title="personen aflopend gesorteerd op naam"/>

            {/* 6.4.5: Personen gesorteerd volgens hun score */}
            <Persons persons={personsSortedByScore} title="sorteer op score"/>

            {/* 6.4.6: Alleen inwoners van Mechelen */}
            <Persons persons={personsFromMechelen} title="personen uit Mechelen"/>

            {/* 6.4.7: Overzicht van de unieke scores met de bijbehorende voornamen */}
            <PersonScores persons={PERSON_DATA} title="scores van de personen"/>

            {/* 6.4.8: Overzicht van steden gesorteerd op aantal personen */}
            <Cities persons={PERSON_DATA} title="steden van de personen"/>
        </Container>
    );
}
