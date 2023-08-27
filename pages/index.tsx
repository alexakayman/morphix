import Image from "next/image";
import Hero from "../components/landing/hero";
import Actions from "@/components/builder/actions";
import Footer from "@/components/builder/footer";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Actions />
      <Footer />
    </main>
  );
}
