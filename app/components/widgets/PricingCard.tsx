import Link from "next/link";

export interface PlanBenefit {
    code: string;
    name: string;
    unit: string;
    period: string;
    limit: number;
}

export interface PlanPrice {
    currency: string;
    amount: number;
    providers: string[];
}

export interface Plan {
    id: string;
    code: string;
    name: string;
    icon: string;
    period: string;
    durationDays: number;
    features: string[];
    benefits: PlanBenefit[];
    prices: PlanPrice[];
    active: boolean;
    sortOrder: number;
}

interface PricingCardProps {
    plan: Plan;
    badge?: string | null;
    ctaLabel?: string;
    ctaHref?: string;
}

function formatPrice(prices: PlanPrice[]): string {
    const idr = prices.find((p) => p.currency === "IDR");
    if (!idr) return "Custom";
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(idr.amount);
}

function formatPeriod(period: string): string {
    switch (period) {
        case "monthly":
            return "per bulan";
        case "yearly":
            return "per tahun";
        default:
            return period;
    }
}

function formatBenefit(benefit: PlanBenefit): string {
    if (benefit.limit === 0) return `${benefit.name}: Tidak aktif`;
    if (benefit.limit === 1 && benefit.unit === "aktif") return `${benefit.name}`;
    return `${benefit.limit} ${benefit.unit} ${benefit.name}`;
}

export default function PricingCard({
    plan,
    badge = null,
    ctaLabel = "Pilih",
    ctaHref = "#",
}: PricingCardProps) {
    const displayBenefits = plan.benefits
        .filter((b) => b.limit > 0)
        .slice(0, 6);

    return (
        <div className="relative bg-white rounded-2xl p-7 flex flex-col shadow-lg w-full max-w-[280px]">
            {/* Badge */}
            {badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#FF5100] text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                        {badge}
                    </span>
                </div>
            )}

            {/* Icon + Plan Name */}
            <h3 className="text-lg font-bold text-gray-900 mb-3">
                {plan.icon} {plan.name}
            </h3>

            {/* Price */}
            <div className="mb-1">
                <span className="text-3xl font-bold text-[#FF5100]">
                    {formatPrice(plan.prices)}
                </span>
            </div>
            <p className="text-gray-500 text-sm mb-5">{formatPeriod(plan.period)}</p>

            {/* Benefits */}
            <ul className="space-y-2 mb-8 flex-1">
                {displayBenefits.map((benefit) => (
                    <li key={benefit.code} className="text-gray-700 text-sm">
                        ✓ {formatBenefit(benefit)}
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <Link
                href={ctaHref}
                className="block text-center bg-[#FF5100] hover:bg-orange-600 text-white rounded-xl py-3 px-6 font-semibold text-sm transition-colors"
            >
                {ctaLabel}
            </Link>
        </div>
    );
}
