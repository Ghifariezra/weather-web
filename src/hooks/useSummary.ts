import { useState } from "react";

export const useSummary = () => {
    const [chartType, setChartType] = useState<string>("default");

    return { chartType, setChartType };
};