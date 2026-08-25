import React from "react";
import HanumanashtakClient from "@/components/HanumanashtakClient";
import hanumanashtakData from "@/data/scriptures/sankat-mochan-hanumanashtak.json";
import { ScriptureVerse } from "@/types/scripture";

const verses: ScriptureVerse[] = hanumanashtakData as ScriptureVerse[];

export const metadata = {
  title: "Sankat Mochan Hanuman Ashtak — English Lyrics, Hindi & Full Translation",
  description: "Read and listen to Sankat Mochan Hanuman Ashtak lyrics in Devanagari Unicode. Includes word meanings, path vidhi, composition context, and printable PDF.",
};

export default function HanumanashtakPage() {
  return <HanumanashtakClient verses={verses} />;
}
