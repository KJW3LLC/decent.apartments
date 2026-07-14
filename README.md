# Decent Apartments

Decent Apartments is a Jekyll site that automatically generates practical renter articles about finding apartments, comparing tradeoffs, spotting red flags, and understanding the positive and negative aspects of rental options.

## Features

- Automated renter article generation using NVIDIA text models
- AI-generated article images using NVIDIA FLUX
- Topic list focused on apartment search, applications, tours, lease basics, budgeting, and renter red flags
- Search and filter by renter article stage
- GitHub Pages deployment with the custom domain `https://decent.apartments`

## Local Development

```bash
npm install
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000` or the port shown by Jekyll.

## Generate an Article

Set the NVIDIA API key first:

```bash
export NVIDIA_API_KEY='your-nvidia-api-key-here'
npm run generate
```

The generator selects an unused topic from `topics.json`, writes a Markdown article into `_guides/`, creates an image in `assets/images/guides/`, updates `generated-topics.json`, and links related articles by shared tags.

## Content Model

The Jekyll collection is still named `guides` internally to preserve existing templates and URLs, but the public-facing language is “articles.”

Article stages use the existing `difficulty` field:

- `beginner`: Getting Started
- `intermediate`: Active Search
- `advanced`: Deep Dive

## Useful Commands

```bash
npm run validate
npm run generate
npm run check-links
npm run validate:series
bundle exec jekyll build
```

## GitHub Pages

The site is configured for:

```yaml
url: "https://decent.apartments"
```

The repository should include a `CNAME` file containing:

```text
decent.apartments
```
