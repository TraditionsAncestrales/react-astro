import type { Item } from "@/lib/pocketbase/utils";
import { Image } from "@unpic/react";
import { RecordsCarousel } from "./records-carousel";
import { BUTTON } from "./ui/button";
import { Features } from "./ui/features";
import { Section, type SectionProps } from "./ui/section";
import { Title } from "./ui/title";

// MAIN ************************************************************************************************************************************
export function RecordsItems(props: RecordsItemsProps) {
  const {
    children,
    externalLink = false,
    forceMultiple = false,
    intent = "white",
    items = [],
    removeStale,
    title: singular,
    ...rest
  } = props;

  const hasSome = items.length > 0;
  if (!hasSome && !children) return;

  const isSingle = items.length === 1;
  const title = `${singular}${isSingle && !forceMultiple ? "" : "s"}`;
  const { features, href, image, text } = items[0] ?? {};

  const sizes = [
    "(min-width: 1536px) 42rem",
    "(min-width: 1280px) 36rem",
    "(min-width: 1024px) 28rem",
    "(min-width: 768px) 20rem",
    "calc(100vw - 7rem - 15px)",
  ].join(", ");

  const target = externalLink ? "_blank" : "_self";

  return (
    <>
      {isSingle && !forceMultiple ? (
        <Section
          intent={intent}
          {...rest}
          header={<Title text={title} className="mb-8 xl:hidden" />}
          aside={
            <Image {...image} breakpoints={[320, 640, 960, 1280, 1600]} sizes={sizes} className="relative shadow-lg shadow-black/50" />
          }
        >
          <Title text={title} className="hidden self-start xl:inline-flex" />
          <Features intent={intent} features={features} />
          <article dangerouslySetInnerHTML={{ __html: text }} />
          <a href={href} target={target} className={BUTTON({ intent: intent === "primary" ? "secondary" : "primary", class: "self-end" })}>
            En savoir plus
          </a>
        </Section>
      ) : (
        <Section intent={intent} expanded={hasSome} {...rest} header={<Title text={title} className="mb-8" />}>
          {hasSome ? (
            <RecordsCarousel externalLink={externalLink} items={items} removeStale={removeStale} className="w-full">
              {children}
            </RecordsCarousel>
          ) : (
            children
          )}
        </Section>
      )}
    </>
  );
}

// TYPES ***********************************************************************************************************************************
export type RecordsItemsProps = {
  externalLink?: boolean;
  forceMultiple?: boolean;
  items: Item[];
  removeStale?: boolean;
  title: string;
} & SectionProps;
