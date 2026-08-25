import React from "react";
import { getChalisaData } from "@/lib/getChalisaData";
import ChalisaTemplate from "@/components/ChalisaTemplate";
import LanguageBanner from "@/components/LanguageBanner";
import CookieRedirect from "@/components/CookieRedirect";

export default async function HomePage() {
  const data = await getChalisaData("hi");

  return (
    <>
      <CookieRedirect />
      <LanguageBanner />
      <ChalisaTemplate data={data} />
    </>
  );
}
