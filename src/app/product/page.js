"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductRedirect() {
	const router = useRouter();
	useEffect(() => {
		router.replace("/services");
	}, [router]);
	return (
		<p style={{ padding: "2rem" }}>
			Redirecting to Services…
		</p>
	);
}
