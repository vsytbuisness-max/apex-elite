import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { postType } from './post'
import { siteSettingsType } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, postType, siteSettingsType],
}
