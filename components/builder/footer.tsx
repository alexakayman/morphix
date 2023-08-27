import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <>
      <section id="morphix-banner">
        <video autoPlay loop muted className="w-full h-full" id="morphix-video">
          <source src="/videos/banner.mp4" type="video/mp4" />
        </video>
      </section>
      <section className="flex items-center justify-center mx-auto max-w-5xl px-6 pb-8 md:h-screen md:max-h-[950px] md:max-w-7xl">
        <div className="flex flex-col items-center justify-center mx-auto max-w-5xl px-6 pb-8 md:max-w-7xl">
          <h4 className="font-book font-styling font-display font-effect-hero text-center md:text-left text-[3rem] md:text-7xl leading-[3.35rem] md:leading-[4rem] tracking-tight font-gradient">
            About Morphix
          </h4>
          <p className="sans mb-8 mt-4 max-w-[30rem] text-center leading-7 md:text-left text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 font-normal">
            Morphix transforms unstructured data into an exportable .csv in
            seconds. Webscraping can be great for large projects on one site,
            but it is tedious if you just want some quick info. . . <br />
            <br />
            So, I built Morphix to <br />
            1) make it easer to extract data from any site. No page schemas, no
            element definitions, just describe what you want. <br /> 2) to
            improve my building skills, even if it&apos;s something small from
            start to finish. <br />
            <br />
            The next time you&apos;re on an obscure data quest, try Morphix and
            let me know how it goes! If you use Morphix for a larger project,
            fork the project on my GitHub, so my openAI credits don&apos;t got
            to zero : ( <br />
            <br />
          </p>
          <Image src="/images/ak.png" width="150" height="100" alt="AK" />
          <div className="flex flex-row gap-4 mt-4">
            <a
              href="https://alexakayman.com"
              className="sans mb-8 mt-4 max-w-[30rem] text-center leading-7 md:text-left text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 underline decoration-dotted"
            >
              alexakayman.com
            </a>
            <a
              href="https://github.com/alexakayman/morphix"
              className="sans mb-8 mt-4 max-w-[30rem] text-center leading-7 md:text-left text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 underline decoration-dotted"
            >
              /morphix github
            </a>
            <a
              href="https://twitter.com/AlexaKayman"
              className="sans mb-8 mt-4 max-w-[30rem] text-center leading-7 md:text-left text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 underline decoration-dotted"
            >
              /twitter @alexakayman
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
