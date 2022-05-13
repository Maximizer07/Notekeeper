import {Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../css/home.css";

function Home() {

    return (
        <section className="py-4 py-xl-5">
            <Container>
                <div className="text-center p-4 p-lg-5">
                    <h3 className="fw-bold text-primary mb-2">Notekeeper</h3>
                    <h1 className="fw-bold mb-4">Сервис для хранения ваших заметок</h1>
                    <Link to="/login">
                        <Button variant="primary" fs="5" me="2" py="2" px="4">Начать работу</Button>
                    </Link>
                </div>
            </Container>
        </section>
    );
}

export default Home;