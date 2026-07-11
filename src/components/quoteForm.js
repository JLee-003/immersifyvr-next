"use client";

import { useState } from "react";
import styles from "./quoteForm.module.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name, value) {
	const v = typeof value === "string" ? value.trim() : "";
	if (name === "email") {
		if (!v) return "Email is required.";
		if (!emailPattern.test(v)) return "Enter a valid email address.";
		return "";
	}
	if (!v) {
		const labels = {
			first_name: "First name",
			last_name: "Last name",
		};
		return `${labels[name] || "This field"} is required.`;
	}
	return "";
}

/*
QuoteForm component for displaying a quote form.
*/
export default function QuoteForm() {
	const [submitted, setSubmitted] = useState(false);
	const [values, setValues] = useState({
		first_name: "",
		last_name: "",
		email: "",
		location: "",
	});
	const [touched, setTouched] = useState({});
	const [errors, setErrors] = useState({});

	function setFieldError(name, value) {
		setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
	}

	function handleBlur(name, currentValue) {
		setTouched((prev) => ({ ...prev, [name]: true }));
		setFieldError(name, currentValue);
	}

	function handleChange(name, value) {
		setValues((prev) => ({ ...prev, [name]: value }));
		if (touched[name]) {
			setFieldError(name, value);
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		const names = ["first_name", "last_name", "email"];
		const nextTouched = Object.fromEntries(names.map((n) => [n, true]));
		setTouched((prev) => ({ ...prev, ...nextTouched }));
		const nextErrors = { ...errors };
		let hasError = false;
		for (const n of names) {
			const err = validateField(n, values[n]);
			nextErrors[n] = err;
			if (err) hasError = true;
		}
		setErrors(nextErrors);
		if (hasError) return;

		const form = event.target;
		const fd = new FormData(form);
		fetch("https://formspree.io/f/xanjrzyk", {
			method: "POST",
			headers: { Accept: "application/json" },
			body: fd,
		})
			.then((response) => {
				if (response.ok) {
					setSubmitted(true);
				}
			})
			.catch((error) => {
				console.error("Form error:", error);
				alert("There was an error submitting the form.");
			});
	}

	function handleReload() {
		window.location.reload();
	}

	return (
		<div className={styles.formContainer}>
			{submitted ? (
				<div className={styles.thankYouMessage}>
					<h2>Thank you for your submission!</h2>
					<p>We will get back to you shortly.</p>
					<button className={styles.reloadButton} onClick={handleReload}>
						Reload Page
					</button>
				</div>
			) : (
				<form className={styles.formColumn} onSubmit={handleSubmit} noValidate>
					<div className={styles.nameRow}>
						<div className={styles.inputGroup}>
							<label className={styles.formLabel} htmlFor="first-name">
								First Name <span className={styles.required}>*</span>
							</label>
							<input
								className={`${styles.formInput} ${errors.first_name ? styles.inputError : ""}`}
								type="text"
								id="first-name"
								name="first_name"
								value={values.first_name}
								onChange={(e) => handleChange("first_name", e.target.value)}
								onBlur={(e) => handleBlur("first_name", e.target.value)}
								aria-invalid={!!errors.first_name}
								aria-describedby={errors.first_name ? "first-name-error" : undefined}
							/>
							{touched.first_name && errors.first_name ? (
								<span id="first-name-error" className={styles.fieldError} role="alert">
									{errors.first_name}
								</span>
							) : null}
						</div>
						<div className={styles.inputGroup}>
							<label className={styles.formLabel} htmlFor="last-name">
								Last Name <span className={styles.required}>*</span>
							</label>
							<input
								className={`${styles.formInput} ${errors.last_name ? styles.inputError : ""}`}
								type="text"
								id="last-name"
								name="last_name"
								value={values.last_name}
								onChange={(e) => handleChange("last_name", e.target.value)}
								onBlur={(e) => handleBlur("last_name", e.target.value)}
								aria-invalid={!!errors.last_name}
								aria-describedby={errors.last_name ? "last-name-error" : undefined}
							/>
							{touched.last_name && errors.last_name ? (
								<span id="last-name-error" className={styles.fieldError} role="alert">
									{errors.last_name}
								</span>
							) : null}
						</div>
					</div>
					<div className={styles.inputGroup}>
						<label className={styles.formLabel} htmlFor="email">
							Email <span className={styles.required}>*</span>
						</label>
						<input
							className={`${styles.formInput} ${errors.email ? styles.inputError : ""}`}
							type="email"
							id="email"
							name="email"
							value={values.email}
							onChange={(e) => handleChange("email", e.target.value)}
							onBlur={(e) => handleBlur("email", e.target.value)}
							aria-invalid={!!errors.email}
							aria-describedby={errors.email ? "quote-email-error" : undefined}
						/>
						{touched.email && errors.email ? (
							<span id="quote-email-error" className={styles.fieldError} role="alert">
								{errors.email}
							</span>
						) : null}
					</div>
					<div className={styles.inputGroup}>
						<label className={styles.formLabel} htmlFor="location">
							Location
						</label>
						<input
							className={styles.formInput}
							type="text"
							id="location"
							name="location"
							placeholder="City, State"
							value={values.location}
							onChange={(e) => handleChange("location", e.target.value)}
						/>
					</div>
					<button className={styles.submitForm} type="submit">
						Book a Session
					</button>
				</form>
			)}
		</div>
	);
}
