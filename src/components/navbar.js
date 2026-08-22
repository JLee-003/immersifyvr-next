"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";

import QuoteButton from "./quoteButton";

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = usePathname();

	return (
		<nav className={styles.navbar}>
			<div className={styles.navbarInner}>
			<Link href="/" className={styles.logo}>
				<Image
					src="/img/logo.avif"
					width={80}
					height={80}
					alt="ImmersifyVR Logo"
				/>
				<div className={styles.brandText}>
					<h1>ImmersifyVR</h1>
					<p>Virtual Reality for Seniors</p>
				</div>
			</Link>

			{/* Hamburger icon */}
			<button
				className={styles.hamburger}
				onClick={() => setMenuOpen(!menuOpen)}
				aria-label="Toggle navigation menu"
			>
				<span className={styles.bar}></span>
				<span className={styles.bar}></span>
				<span className={styles.bar}></span>
			</button>

			<ul
				className={`${styles.navLinks} ${
					menuOpen ? styles.navActive : ""
				}`}
			>
				<li>
					<Link
						href="/"
						className={pathname === "/" ? styles.active : ""}
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						href="/services"
						className={
							pathname?.startsWith("/services") ||
							pathname?.startsWith("/product")
								? styles.active
								: ""
						}
					>
						Services
					</Link>
				</li>
				<li>
					<Link
						href="/outreach"
						className={
							pathname?.startsWith("/outreach")
								? styles.active
								: ""
						}
					>
						Outreach
					</Link>
				</li>
				<li>
					<Link
						href="/our-team"
						className={
							pathname?.startsWith("/our-team")
								? styles.active
								: ""
						}
					>
						About Us
					</Link>
				</li>
				<QuoteButton />
			</ul>
			</div>
		</nav>
	);
}
