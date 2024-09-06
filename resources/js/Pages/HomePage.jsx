import { Link } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";

function Home() {
    return (
        <AppLayout>
            <nav className="navbar sticky-top navbar-expand-lg navbar-light py-2 shadow-sm">
                <div className="container">
                    <Link className="navbar-brand" href="#">
                        <img className="img-fluid" src="/images/logo.png" alt="" width="96px" />
                    </Link>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#header01" type="button" aria-controls="header01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="header01">
                        <ul className="navbar-nav mt-lg-0 mb-lg-0 mb-3 me-4 ms-auto mt-3">
                            <li className="nav-item me-4"><Link className="nav-link" href="#">About</Link></li>
                            <li className="nav-item me-4"><Link className="nav-link" href="#">Company</Link></li>
                            <li className="nav-item me-4"><Link className="nav-link" href="#">Services</Link></li>
                            <li className="nav-item"><Link className="nav-link" href="#">Testimonials</Link></li>
                        </ul>
                        <div><Link className="btn bg-gradient-primary mt-3" href="/login-page">Start Sale</Link></div>
                    </div>
                </div>
            </nav>

            <section className="pb-5">
                <div className="container pt-2">
                    <div className="row align-items-center mb-5">
                        <div className="col-12 col-md-10 col-lg-5 mb-lg-0 mb-5">
                            <h2 className="fw-bold mb-3">Elevate Your Sales Game with Our Powerful POS Application! </h2>
                            <p className="lead text-muted mb-4">Discover streamlined transactions, real-time inventory management, and actionable insights in one intuitive POS app.</p>
                            <div className="d-flex flex-wrap"><a className="btn bg-gradient-primary mb-sm-0 mb-2 me-2" href="/login-page">Start Sale</a>
                                <Link className="btn bg-gradient-primary mb-sm-0 mb-2" href="/login-page">Login</Link>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 offset-lg-1">
                            <img className="img-fluid" src="/images/hero.svg" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-8 mx-auto text-center">
                            <span className="text-muted">Happy Clients</span>
                            <p className="lead text-muted">Spotlight on Our Exceptional Client Success</p>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-3 p-3">
                            <div className="card px-0 text-center">
                                <img className="card-img-top w-100 mb-3" src="/images/man.jpg" alt="" />
                                <h5>Danny Bailey</h5>
                                <p className="text-muted mb-4">CEO &amp; Founder</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 p-3">
                            <div className="card px-0 text-center">
                                <img className="card-img-top w-100 mb-3" src="/images/man.jpg" alt="" />
                                <h5>Danny Bailey</h5>
                                <p className="text-muted mb-4">CEO &amp; Founder</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 p-3">
                            <div className="card px-0 text-center">
                                <img className="card-img-top w-100 mb-3" src="/images/man.jpg" alt="" />
                                <h5>Danny Bailey</h5>
                                <p className="text-muted mb-4">CEO &amp; Founder</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 p-3">
                            <div className="card px-0 text-center">
                                <img className="card-img-top w-100 mb-3" src="/images/man.jpg" alt="" />
                                <h5>Danny Bailey</h5>
                                <p className="text-muted mb-4">CEO &amp; Founder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <br />

            <section className="py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-5 mb-lg-0 mb-5">
                            <h2 className="fw-bold mb-5">Reach Out to Us: Let's Connect and Explore Opportunities Together</h2>
                            <h4 className="fw-bold">Address</h4>
                            <p className="text-muted mb-5">1686 Geraldine Lane New York, NY 10013</p>
                            <h4 className="fw-bold">Contact Us</h4>
                            <p className="text-muted mb-1">hello@wireframes.org</p>
                            <p className="text-muted mb-0">+ 7-843-672-431</p>
                        </div>
                        <div className="col-12 col-lg-6 offset-lg-1">
                            <form action="#">
                                <input className="form-control mb-3" type="text" placeholder="Name" />
                                <input className="form-control mb-3" type="email" placeholder="E-mail" />
                                <textarea className="form-control mb-3" name="message" cols="30" rows="10" placeholder="Your Message..."></textarea>
                                <button className="btn bg-gradient-primary w-100">Action</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-light py-5">
                <div className="border-bottom container pb-5 text-center">
                    <Link className="d-inline-block mx-auto mb-4" href="#">
                        <img className="img-fluid" src="/images/logo.png" alt="" width="96px" />
                    </Link>
                    <ul className="d-flex justify-content-center align-items-center list-unstyled mb-4 flex-wrap">
                        <li><Link className="link-secondary me-4" href="#">About</Link></li>
                        <li><Link className="link-secondary me-4" href="#">Company</Link></li>
                        <li><Link className="link-secondary me-4" href="#">Services</Link></li>
                        <li><Link className="link-secondary" href="#">Testimonials</Link></li>
                    </ul>
                    <div>
                        <Link className="d-inline-block me-4" href="#">
                            <img src="/images/facebook.svg" />
                        </Link>
                        <Link className="d-inline-block me-4" href="#">
                            <img src="/images/twitter.svg" />
                        </Link>
                        <Link className="d-inline-block me-4" href="#">
                            <img src="/images/github.svg" />
                        </Link>
                        <Link className="d-inline-block me-4" href="#">
                            <img src="/images/instagram.svg" />
                        </Link>
                        <Link className="d-inline-block" href="#">
                            <img src="/images/linkedin.svg" />
                        </Link>
                    </div>
                </div>
                <div className="mb-5"></div>
                <div className="container">
                    <p className="text-center">All rights reserved © Learn with Rabbil (LWR) 2023-2024</p>
                </div>
            </footer>
        </AppLayout>
    );
}

export default Home;