# Turfy.ca

Artificial turf sales, rentals and installation enquiries. Built with Vinext and hosted by Sites.

## Customer routes

92 customer-facing pages: the original 13, 12 product-type detail pages, 65 Canadian city project guides, a product index and a searchable city directory. The city selection covers the centres in the 2021 Statistics Canada metropolitan-area classification plus major suburban municipalities and provincial/territorial capitals. City pages are planning/enquiry resources, not assertions of local branches or guaranteed service.

## Search discovery

All indexable routes appear in /sitemap.xml (91 URLs). The quote route is noindex with a stable canonical; query parameters carry product and city context without producing separate indexable landing pages. Page metadata, breadcrumbs, internal navigation and robots.txt use https://turfy.ca. No fabricated Product offers, ratings or LocalBusiness locations are emitted. Google indexing is not guaranteed, and private access must be changed explicitly before crawlers can reach the content.

## Enquiries

The React quote form validates project details locally with the shared Zod schema, then submits them directly through `@formspree/react` to `https://formspree.io/f/xppwqqvz`. The payload includes contact information, city/product context, dimensions, surface, services, consent, rental dates where applicable, notes as `message`, and the displayed reference. Formspree manages new submissions and any configured notifications. Success is displayed only after Formspree accepts the request; errors retain the entered details. No live test enquiry was sent during implementation.

The existing D1 table and legacy `/api/enquiries` handler remain intact for earlier records and compatibility; the browser form no longer writes there. Its former UUID deduplication applies only to that legacy handler, not to Formspree. Concurrent browser submits are blocked while a request is in flight. Payment, stock management and shipping calculations are not part of this form.

## Operations

The phone number is the standard user-provided placeholder. Products and services are quote-based; availability is confirmed by location. Images are original generated space concepts, not completed customer projects or exact product photographs.

## Editorial and image ownership

Each photograph has one rendered placement: two homepage images, twelve product images, six collection images, and one each for rentals and installation. Directories and related-product links use text so imagery and descriptive copy remain exclusive to the detail page. City guides contain individual planning advice, project questions and logistics guidance; their enquiry links preserve city context in the central quote form. Shared navigation, contact details and form labels intentionally remain consistent.

The September 2026 content audit checked all 92 customer pages: 22 unique image placements, no duplicate image hashes or editorial paragraphs, no near-duplicate paragraphs above the five-word phrase overlap threshold, and no broken internal links. Search validation covered all 91 indexable URLs and quote context.

The site is public on https://turfy.ca, with active apex and www domains and HTTPS. Canonical URLs, structured data, robots.txt and the sitemap use https://turfy.ca. Google and Bing verification tags are present. Navigation uses standard anchors to avoid the framework navigation failure found in the production build.

## Development

Use the Sites build workflow. Schema lives in db/schema.ts; generated migrations live in drizzle/. Apply migrations locally before testing persistence. Production migrations are applied by Sites during publication. No enquiry data should be committed to source.
