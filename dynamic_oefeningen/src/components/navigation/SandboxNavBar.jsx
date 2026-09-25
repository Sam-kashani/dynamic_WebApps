import {Button, Container, Navbar} from "react-bootstrap";
import {NAV_EXERCISES} from "../../constants/navConstants.js";

export function SandboxNavBar(props) {
    const {activeNavBarItem, onSelectNavBarItem} = props;

    return (
        <Navbar expand="xl" bg="dark" className="sticky-top mb-3" data-bs-theme="dark" style={{zIndex: 1030}}>
            <Container fluid className="px-3">
                <Navbar.Brand className="fw-bold me-4" style={{color: "#f8f9fa"}}>
                    Oefeningen (Sandbox)
                </Navbar.Brand>
                <div className="d-flex flex-wrap align-items-center gap-2 ms-auto">
                    {activeNavBarItem !== NAV_EXERCISES && (
                        <Button
                            variant="outline-light"
                            size="sm"
                            className="py-1 px-2 fw-semibold"
                            onClick={() => onSelectNavBarItem(NAV_EXERCISES)}
                        >
                            &larr; Terug naar overzicht
                        </Button>
                    )}
                </div>
            </Container>
        </Navbar>
    );
}
