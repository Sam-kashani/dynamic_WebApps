import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {NAV_MENU, NAV_PERSONS} from "../constants/navConstants.js";

function OpenExerciseButton(props) {
    const {onClick} = props;

    return (
        <Button
            variant="primary"
            className="mt-3"
            onClick={onClick}
        >
            Open Oefening
        </Button>
    );
}

function ExerciseCard(props) {
    const {title, description, onSelect} = props;

    return (
        <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="text-muted">{description}</Card.Text>
                </div>
                <OpenExerciseButton onClick={onSelect}/>
            </Card.Body>
        </Card>
    );
}

export function ExercisesPage(props) {
    const {onSelectExercise} = props;

    return (
        <Container className="my-4">
            <Row xs={1} md={2} className="g-3">
                <Col>
                    <ExerciseCard
                        title="Menukaart"
                        description="Menukaart met data uit data.js"
                        onSelect={() => onSelectExercise(NAV_MENU)}
                    />
                </Col>
                <Col>
                    <ExerciseCard
                        title="Personen"
                        description="Lijst met personen"
                        onSelect={() => onSelectExercise(NAV_PERSONS)}
                    />
                </Col>
            </Row>
        </Container>
    );
}
