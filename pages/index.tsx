import Image from "next/image";
import Hero from "../components/landing/hero";
import Content from "@/components/builder/content";
import Fields from "@/components/builder/fields";
import Scraper from "@/components/builder/scraper";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Fields />
      <Scraper />
      <Content />
    </main>
  );
}
