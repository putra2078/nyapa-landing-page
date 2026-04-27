"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import pricingHeader from "../images/pricing-header.png";
import PricingCard, { Plan } from "./widgets/PricingCard";

const API_URL = "http://localhost:9805/api/plans";

export default function PricingSection() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPlans() {
            try {
                const res = await fetch(API_URL);
                const json = await res.json();
                const activePlans = (json.data as Plan[])
                    .filter((p) => p.active)
                    .sort((a, b) => a.sortOrder - b.sortOrder);
                setPlans(activePlans);
            } catch {
                setError("Gagal memuat paket harga.");
            } finally {
                setLoading(false);
            }
        }
        fetchPlans();
    }, []);

    return (
        <section id="harga" className="bg-[#341145] py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="flex justify-center">
                        <Image
                            src={pricingHeader}
                            alt="Pilih paket yang pas untuk tim kamu"
                            className="w-max h-max object-contain"
                        />
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <p className="text-center text-white/70 animate-pulse">
                        Memuat paket harga...
                    </p>
                )}

                {/* Error State */}
                {error && (
                    <p className="text-center text-red-300">{error}</p>
                )}

                {/* Pricing Cards */}
                {!loading && !error && (
                    <div className="flex flex-wrap justify-center gap-6 md:gap-5 max-w-6xl mx-auto">
                        {plans.map((plan) => (
                            <PricingCard key={plan.id} plan={plan} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
