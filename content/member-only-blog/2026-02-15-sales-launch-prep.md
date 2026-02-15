---
title: "SheetToolBox Sales Launch Prep — What Changed Today"
date: "2026-02-15"
excerpt: "Full English rebrand of app pages, tiered pricing with Lemon Squeezy, discount codes for beta testers, and Web version limitation warnings. Product pages are in 'Coming Soon' mode while we wait for Lemon Squeezy payment approval."
tags: ["SheetToolBox", "Lemon Squeezy", "pricing", "launch"]
---

# SheetToolBox Sales Launch Prep — What Changed Today

Big update today. We moved from "free desktop download" to a real paid product with tiered pricing, discount codes for testers, and clear messaging around Web vs Desktop.

**Update:** Lemon Squeezy's payment approval process hasn't been completed yet, so all product pages are currently in **"Coming Soon"** mode. Approval should come through within a few days, and we'll officially launch once it's cleared.

Here's a full breakdown of everything that was prepared.

---

## 1. App Pages — Full English Rebrand

All three individual app pages are now fully in English:

- **Sheet Pic** (`/apps/excel-splitter`) — description, features, how-to, disclaimer
- **Macro Remover** (`/apps/macro-remover`) — same
- **Sheet Merge** (`/apps/sheet-merge`) — same

The category name was changed from "Spreadsheet Tools" to **Sheet Tool Box** across the site (`/apps`, `/apps/excel`, back-links on detail pages).

App images were also replaced with new English versions.

---

## 2. Tiered Pricing with Lemon Squeezy

The free tier is gone. SheetToolBox Desktop is now a paid product from day one.

| Tier | Downloads | Price | LS Product ID |
|------|-----------|-------|---------------|
| **Launch** | 0–50 | $9.99 | 831026 |
| **Early** | 51–150 | $19.99 | 831031 |
| **Middle** | 151–300 | $39.99 | 831032 |
| **Regular** | 301+ | $49.99 | 831286 |

The pricing tier is determined by a global download counter. As more people buy, the price goes up — creating urgency for early adopters.

Each tier maps to a separate Lemon Squeezy product, so the checkout URL dynamically changes based on the current tier.

---

## 3. Discount Codes for Beta Testers

Instead of making the app publicly free, we're using **Lemon Squeezy's built-in discount code system** for friend/tester access.

How it works:
1. Create a 100% OFF discount code in Lemon Squeezy dashboard (Marketing > Discounts)
2. Share the code with testers
3. They go through the normal checkout flow but pay $0
4. The purchase is tracked just like a paid one

A note on the download page says: *"Have a discount code? You can enter it at checkout."*

This gives us full control over who gets free access, with usage limits and expiration dates.

---

## 4. Web Version Limitation Warnings

To drive Desktop sales, we added clear warnings about the Web version's limitations:

### On each app detail page (`/apps/excel-splitter`, etc.)
An orange warning banner appears after the "How to Use" section:
> **Web Version Limitations** — The web version has a 5MB file size limit and is not recommended for sensitive or confidential data. For larger files and full offline privacy, use the Desktop version.

### On the Desktop page (`/apps/excel-toolbox`)
- **Comparison table updated**: "Up to 100MB" → "Up to 5MB" (orange), new "Data Privacy" row added
- **CTA section**: Added caveat about 5MB limit and sensitive data

### In Technical Specs (markdown)
All three app files now show: `Max file size: 5MB (Web) / Unlimited (Desktop)`

---

## 5. Cleanup

- Removed the sample member-only app page (`/member-only-apps/sample-tool`)
- Removed the Member-Only Apps section from `/apps` page
- Fixed remaining Japanese text: "今すぐ使う" → "Try it now"

---

## Files Changed

| Area | Files |
|------|-------|
| Pricing | `api/downloads/excel-toolbox/route.ts`, `api/lemon-squeezy/checkout/route.ts` |
| UI | `components/DownloadCounter.tsx`, `components/DownloadButton.tsx` |
| App pages | `app/apps/excel-toolbox/page.tsx`, `app/apps/[slug]/page.tsx`, `app/apps/excel/page.tsx`, `app/apps/page.tsx` |
| Content | `content/apps/excel-splitter.md`, `content/apps/macro-remover.md`, `content/apps/sheet-merge.md` |
| Data | `lib/apps.ts` |

---

## A Personal Note — Your Support Means Everything

This is my first real product launch as an indie maker. I've been building these tools in my spare time while working a full-time job, and getting to this point has taken a lot of late nights and weekends.

If you find SheetToolBox useful — or even if you just want to support what I'm doing — **buying a copy is the single best way to help me keep going.** Every purchase, especially at the Launch price, tells me that this work matters and motivates me to keep building.

Even if you don't need it yourself, sharing it with a colleague who works with spreadsheets daily would mean a lot. Word of mouth from people I trust (you!) is worth more than any ad campaign.

Thank you for being here. Seriously.

**[Get SheetToolBox ($9.99 Launch Price) →](/apps/excel-toolbox)** *(Coming Soon — waiting for payment approval)*

---

## Next Steps

- [ ] **Wait for Lemon Squeezy payment approval** (expected within a few days)
- [ ] Switch product pages from "Coming Soon" to live purchase mode
- [ ] Create discount codes in Lemon Squeezy for beta testers
- [ ] Verify checkout flow end-to-end (test purchase with discount code)
- [ ] Webhook integration — store purchases in Supabase, send confirmation emails
- [ ] Purchase verification before download
- [ ] Consider gating downloads behind purchase verification

---

*See the updated [SheetToolBox page](/apps/excel-toolbox) for the live result.*
