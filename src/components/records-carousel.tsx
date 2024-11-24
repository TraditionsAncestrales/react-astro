import type { Item } from "@/lib/pocketbase/utils";
import { cn } from "@/lib/utils";
import { TITLE } from "@/styles/ui";
import { Image } from "@unpic/react";
import type { PropsWithChildren } from "react";
import PrevIcon from "~icons/bi/chevron-left";
import NextIcon from "~icons/bi/chevron-right";
import { BUTTON } from "./ui/button";
import { Features } from "./ui/features";

// MAIN ************************************************************************************************************************************
export function RecordsCarousel(props: RecordsCarouselProps) {
  const { children, className, externalLink = false, items, removeStale = false } = props;
  const target = externalLink ? "_blank" : "_self";

  return (
    // <RootElement data={{ removeStale }}>
    <>
      <div role="region" aria-roledescription="carousel" className={cn("relative", className)}>
        <div data-target="carousel" className="overflow-hidden">
          <div className="-ml-4 flex">
            {items.map(({ features, href, image, stale, text, title }, i) => (
              <div key={i} className="mb-2 min-w-0 max-w-96 shrink-0 grow-0 basis-full pl-4" data-stale={stale}>
                <div className="flex h-full w-full flex-col bg-white shadow-md">
                  <Image {...image} height={256} width={384} breakpoints={[384, 768]} sizes="24rem" className="flex-none" />
                  <div className="flex flex-1 flex-col gap-4 p-4 px-6 sm:px-8">
                    <h4 className={TITLE()}>{title}</h4>
                    <Features features={features} intent="white" />
                    <article dangerouslySetInnerHTML={{ __html: text }} className="prose prose-p:my-1 prose-p:leading-normal" />
                    <div className="flex-1" />
                    <div className="flex justify-end gap-2">
                      <a href={href} target={target} className={BUTTON()}>
                        En savoir plus
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          data-target="prev"
          className={BUTTON({ class: "absolute left-4 top-1/2 -translate-y-1/2 touch-manipulation rounded-full" })}
        >
          <PrevIcon />
          <span className="sr-only">Précédent</span>
        </button>
        <button
          data-target="next"
          className={BUTTON({ class: "absolute right-4 top-1/2 -translate-y-1/2 touch-manipulation rounded-full" })}
        >
          <NextIcon />
          <span className="sr-only">Suivant</span>
        </button>
      </div>
      <div data-target="none" className="hidden px-6 md:px-12">
        {children}
      </div>
      {/* </RootElement> */}
    </>
  );

  /* <script>
  import EmblaCarousel, { type EmblaCarouselType } from "embla-carousel";

  RootElement.ready(($, ctx) => {
    const api = EmblaCarousel($("carousel"), { loop: true });
    const prev = $<HTMLButtonElement>("prev");
    const next = $<HTMLButtonElement>("next");

    if (ctx.data.removeStale)
      for (const slide of api.slideNodes()) {
        if (slide.dataset.stale && slide.dataset.stale < new Date().toISOString()) slide.remove();
      }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        api.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        api.scrollNext();
      }
    }

    function handleReInit(api: EmblaCarouselType) {
      const container = api.containerNode();
      api.scrollSnapList().length === 1 ? container.classList.add("justify-center") : container.classList.remove("justify-center");
      next.disabled = !api.canScrollNext();
      prev.disabled = !api.canScrollPrev();
    }

    api.on("reInit", handleReInit);

    prev.addEventListener("keydown", handleKeyDown);
    prev.addEventListener("click", () => api.scrollPrev());

    next.addEventListener("keydown", handleKeyDown);
    next.addEventListener("click", () => api.scrollNext());

    setTimeout(() => {
      if (api.slideNodes().length === 0) $("none").classList.remove("hidden");
      handleReInit(api);
    });

    return api.destroy;
  });
</script> */
}

// TYPES ***********************************************************************************************************************************
export type RecordsCarouselProps = PropsWithChildren<{ className?: string; items: Item[]; externalLink?: boolean; removeStale?: boolean }>;
