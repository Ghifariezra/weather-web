'use client';

import dynamic from "next/dynamic";
const Maps = dynamic(() => import("@/components/common/maps/maps"), {
    ssr: false,
})

export { Maps };