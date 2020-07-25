import React, { useState } from 'react';
import StudentRegister from './StudentRegister';
import ProfessorRegister from './ProfessorRegister';
import { Card, Container, Row, Button, Col } from 'react-bootstrap';

const Register = () => {
    const [initialContainer, setInitialContainer] = useState(true);
    const [displayStudent, setDisplayStudent] = useState(false);
    const [displayProfessor, setDisplayProfessor] = useState(false);

    const registerHidden = initialContainer ? '' : 'hidden';
    const showStudentRegister = displayStudent
        ? <StudentRegister />
        : null;
    const showProfessorRegister = displayProfessor
        ? <ProfessorRegister />
        : null;


    const handleProfessor = (event) => {
        event.preventDefault();
        setInitialContainer(false);
        setDisplayProfessor(true);

    }

    const handleStudent = (event) => {
        event.preventDefault();
        setInitialContainer(false);
        setDisplayStudent(true);

    }

    return (
        <>
        <Container className={registerHidden}>
            <Row className="justify-content-md-center">
                <Card className="mt-5">
                    <Card.Body>
                        <Card.Title> Would you like to register as a student or professor? </Card.Title>
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Button onClick={handleStudent}>Student</Button>
                            </Col>
                            <Col md="auto">
                                <Button onClick={handleProfessor}>Professor</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
        {showStudentRegister}
        {showProfessorRegister}
        </>
    );
}

export default Register;