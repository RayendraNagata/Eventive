"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";

export default function EventSearch() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }
        replace(`/events?${params.toString()}`);
    }, 300);

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams);
        if (category && category !== "all") {
            params.set("category", category);
        } else {
            params.delete("category");
        }
        replace(`/events?${params.toString()}`);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in">
            {/* Search Input */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-secondary" />
                <input
                    type="text"
                    placeholder="Search events..."
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get("q")?.toString()}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
            </div>

            {/* Category Filter */}
            <select
                onChange={(e) => handleCategoryChange(e.target.value)}
                defaultValue={searchParams.get("category")?.toString() || "all"}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
            >
                <option value="all">All Categories</option>
                <option value="music">Music</option>
                <option value="tech">Tech</option>
                <option value="business">Business</option>
                <option value="food">Food</option>
                <option value="art">Art</option>
                <option value="sports">Sports</option>
            </select>
        </div>
    );
}
