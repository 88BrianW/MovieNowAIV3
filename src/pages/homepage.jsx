import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Logo from "../components/common/logo";
import NavBar from "../components/common/navBar";
import MovieCard from "../components/common/movieCard";
import Footer from "../components/common/footer";

import "./styles/homepage.css";

const Homepage = () => {

	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleScroll = () => {
		const position = window.scrollY || window.pageYOffSet;
		setScrollPosition(position);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const logoStyle = {
		display: "flex",
		position: "fixed",
		top: `${Math.min(10+scrollPosition * 0.01, 10)}vh`,
		zIndex: 999,
		border: "1px solid white",
		borderRadius: "50%",
		boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
		transform: `scale(${Math.max(1 - scrollPosition * 0.001, 0.5)})`,
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>MovieNow AI</title>
			</Helmet>

			<div className="page-content">
				<NavBar active="home"/>
				<div className="content-wrapper">
					<div className="homepage-logo-container">
						<div style={logoStyle}>
							<Logo width={80} link={false} />
						</div>
					</div>

					<div className="homepage-container">
						<div className="homepage-first-area">
							<div className="homepage-first-area-left-side">
								<div className="title homepage-title">
									MovieNow AI
								</div>

								<div className="subtitle homepage-subtitle">
									Free Movies, TV Shows, and Anime at your fingertips.
								</div>

								<div className="subtitle homepage-subtitle">
								MovieNow is a website that recommends the user a movie, TV show, or anime based on their current interests using natural language processing through AI
								</div>
							</div>

							<div className="homepage-first-area-right-side">
								<div className="homepage-image-container">
									<div className="homepage-image-wrapper">
										<img
											src="movieBG.png"
											alt="About me!"
											className="homepage-image"
										/>
									</div>
								</div>
							</div>
						</div>


						<MovieCard/>

						<div className="page-footer">
							<Footer />
						</div>
						
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Homepage;
