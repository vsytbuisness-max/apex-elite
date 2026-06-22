import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { postType } from './post'
import { siteSettingsType } from './siteSettings'
import { portfolioPageType } from './portfolioPage'
import { insightsPageType } from './insightsPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, postType, siteSettingsType, portfolioPageType, insightsPageType],
}
