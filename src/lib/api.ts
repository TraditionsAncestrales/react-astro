import {
  getKnowledgeCollectionSlugPageEntriesRecords,
  getKnowledgeCollectionSlugPageRecords,
  getKnowledgePageEntriesRecords,
  getKnowledgePageRecords,
  getLayoutRecords,
  getShopPageRecords,
} from "@/lib/pocketbase/api";
import {
  hrefFromKnowledge,
  hrefFromPost,
  hrefFromService,
  imageFrom,
  itemFromEvent,
  itemFromKnowledge,
  itemFromPost,
  itemFromProduct,
  itemFromService,
  singleFromPost,
  singleFromService,
} from "@/lib/pocketbase/utils";
import type { HelpersFromOpts } from "astro-pocketbase";

// LAYOUT **********************************************************************************************************************************
export async function getLayout(knowledge: string, isMain: boolean, opts: HelpersFromOpts) {
  const { config, ...data } = await getLayoutRecords(opts);
  const [organizationPost, ...knowledges] = await Promise.all([
    itemFromPost(data.organizationPost),
    ...data.knowledges.map((knowledge) => itemFromKnowledge(knowledge)),
  ]);

  const isHome = isMain && knowledge === "traditions-ancestrales";
  const currentKnowledge = knowledges.find(({ slug }) => slug === knowledge);
  if (!currentKnowledge) throw new Error("Unknown knowledge");
  const otherKnowledges = knowledges.filter(({ slug }) => slug !== knowledge);
  const hero = { image: currentKnowledge.image, subtitle: config.title, title: currentKnowledge.title };

  return { config, hero, isHome, isMain, organizationPost, otherKnowledges, theme: knowledge };
}

export async function getLayoutUrls(opts: HelpersFromOpts) {
  const [singleUrls, knowledgeUrls] = await Promise.all([getKnowledgeCollectionSlugPageUrls(opts), getKnowledgePageUrls(opts)]);
  return [...singleUrls, ...knowledgeUrls, "/boutique"];
}

// KNOWLEDGE PAGE **************************************************************************************************************************
export async function getKnowledgePageUrls(opts: HelpersFromOpts) {
  const { knowledges } = await getKnowledgePageEntriesRecords(opts);
  return knowledges.map((knowledge) => hrefFromKnowledge(knowledge));
}

export async function getKnowledgePage(knowledge: string, opts: HelpersFromOpts) {
  const isHome = knowledge === "traditions-ancestrales";
  const { page, ...data } = await getKnowledgePageRecords(knowledge, opts);
  const events = await Promise.all(data.events.map((event) => itemFromEvent(event)));
  const post = { ...(await itemFromPost(page.post)), ...(isHome ? { title: "Bienvenue" } : {}) };
  const services = await Promise.all((page.services ?? []).map((service) => itemFromService(service)));
  const trainings = services.filter(({ extra: { category } }) => category === "training");
  const workshops = services.filter(({ extra: { category } }) => category === "workshop");
  const consultations = services.filter(({ extra: { category } }) => category === "consult");
  const testimonies = { image: await imageFrom(page.testimoniesImage), items: data.testimonies };
  return { consultations, events, post, testimonies, trainings, workshops };
}

// KNOWLEDGE COLLECTION SLUG PAGE **********************************************************************************************************
export async function getKnowledgeCollectionSlugPageUrls(opts: HelpersFromOpts) {
  const { posts, services } = await getKnowledgeCollectionSlugPageEntriesRecords(opts);
  return [...posts.map((post) => hrefFromPost(post)), ...services.map((service) => hrefFromService(service))];
}

export async function getKnowledgeCollectionSlugPage(collection: string, slug: string, opts: HelpersFromOpts) {
  const { single } = await getKnowledgeCollectionSlugPageRecords(collection, slug, opts);
  if (!single) return { single };
  return { single: await (single.collectionName === "posts" ? singleFromPost(single) : singleFromService(single)) };
}

// SHOP PAGE *******************************************************************************************************************************
export async function getShopPage(opts: HelpersFromOpts) {
  const data = await getShopPageRecords(opts);
  const products = await Promise.all(data.products.map((product) => itemFromProduct(product)));
  return { products };
}
