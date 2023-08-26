import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative z-20 pt-[60px] md:h-screen md:max-h-[950px] md:pt-0">
      <section className="mx-auto max-w-5xl px-6 pb-8 md:h-screen md:max-h-[950px] md:max-w-7xl">
        <div className="flex h-full flex-col items-center justify-between md:flex-row md:pb-24">
          <div className="origin-center-left order-1 max-w-3xl animate-hero-text-slide-up-fade sm:shrink-0 md:order-1 lg:pl-16">
            <div className="flex items-center justify-center md:inline-flex">
              <a
                className="auroraBorder mb-10 inline-flex items-center justify-center text-[14px]"
                href="https://www.producthunt.com/posts/resend-3"
              >
                <span className="inline-flex items-center gap-1 whitespace-nowrap px-3 py-1">
                  Brought to you by Alexa Kayman{" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M10.75 8.75L14.25 12L10.75 15.25"
                    ></path>
                  </svg>
                </span>
              </a>
            </div>
            <h1 className="font-book font-styling font-display font-effect-hero text-center md:text-left text-[4rem] md:text-7xl leading-[4.35rem] md:leading-[5rem] tracking-tight font-gradient">
              Describe the data you want - export a .csv in seconds
            </h1>
            <p className="sans mb-8 mt-4 max-w-[30rem] text-center leading-7 md:text-left text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 font-normal">
              Web scraping without page schemas or element definitions. Just
              describe the data you want.
            </p>
            <div className="flex flex-col justify-center gap-4 md:flex-row md:justify-start">
              <a
                className="text-base h-12 pl-5 pr-2 gap-0 font-semibold bg-white text-black hover:bg-white/90 focus-visible:ring-4 focus-visible:ring-white/30 focus-visible:outline-none focus-visible:bg-white/90 disabled:hover:bg-white inline-flex items-center border justify-center select-none rounded-full disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200"
                href="/signup"
              >
                Get Started
                <span className="text-[#70757E]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M10.75 8.75L14.25 12L10.75 15.25"
                    ></path>
                  </svg>
                </span>
              </a>
              <a
                className="text-base h-12 pl-5 pr-2 gap-0 font-semibold bg-slate-1 border-slate-1 text-slate-11 hover:bg-slate-5 hover:text-slate-12 focus-visible:ring-4 focus-visible:ring-slate-7 focus-visible:outline-none focus-visible:bg-slate-6 disabled:hover:bg-slate-1 inline-flex items-center border justify-center select-none rounded-full disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200"
                href="/docs"
              >
                Star on GitHub
                <span className="text-[#70757E]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M10.75 8.75L14.25 12L10.75 15.25"
                    ></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div id="hero-image" className="order-2">
            <video autoPlay loop muted className="w-full h-full">
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
    </div>
  );
}
