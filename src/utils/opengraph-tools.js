export const openGraphMeta = (key, value) => ({
  property: `og:${key}`,
  content: value,
})
