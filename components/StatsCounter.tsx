"use client";

import CountUp from "react-countup";

export function StatsCounter({ end, suffix }: { end: number, suffix: string }) {
  return (
    <CountUp
      end={end}
      suffix={suffix}
      duration={2.5}
      enableScrollSpy
      scrollSpyOnce
    />
  );
}
