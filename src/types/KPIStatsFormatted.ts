import {Stats} from "@/types/StatHistoryFormatted.ts";

export type KPIStats = {
    date: string;
    stats: Stats;
    changes: {
        banned: number;
        currently_banned: number;
        currently_failed: number;
        failed: number;
    } | null;
};


export type KPIStatsFormatted = Record<string, Stats>;
