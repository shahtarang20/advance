"use client";

import { BiorhythmData } from "@/lib/biorhythm";
import { useTranslation } from "@/lib/I18nContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";

export function BiorhythmChart({ data }: { data: BiorhythmData }) {
  const { t } = useTranslation();

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.days} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
          <YAxis domain={[-100, 100]} stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "rgba(15,23,42,0.9)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
            itemStyle={{ fontSize: 14, fontWeight: "bold" }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <ReferenceLine y={0} stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" />
          <ReferenceLine x={data.days[7].date} stroke="rgba(255,255,255,0.5)" label={{ position: "top", value: "Today", fill: "white", fontSize: 12 }} />

          <Line type="monotone" dataKey="physical" name={t("biorhythm.result.physical", { defaultValue: "Physical" })} stroke="#ef4444" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="emotional" name={t("biorhythm.result.emotional", { defaultValue: "Emotional" })} stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="intellectual" name={t("biorhythm.result.intellectual", { defaultValue: "Intellectual" })} stroke="#22c55e" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
