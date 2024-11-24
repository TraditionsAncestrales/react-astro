import { Features } from "@/components/ui/features";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import type { Item } from "@/lib/pocketbase/utils";
import { Image } from "@unpic/react";

// MAIN ************************************************************************************************************************************
export function Single({ features, image, text, title }: SingleProps) {
  const sizes = `(min-width: 1536px) 42rem, (min-width: 1280px) 36rem, (min-width: 1024px) 28rem, (min-width: 768px) 20rem (min-width: 640px) 36rem, 100vw`;

  return (
    <Section
      asideRight
      border="all"
      intent="white"
      header={<Title text={title} className="mb-8" />}
      aside={
        <>
          {image && <Image {...image} sizes={sizes} className="relative shadow-lg shadow-black/50" />}
          <Features features={features} />
        </>
      }
    >
      <article dangerouslySetInnerHTML={{ __html: text }} />
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
export type SingleProps = Item;
