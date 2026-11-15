import navigation from './navigation.json' with { type: 'json' }
import { createSidebar } from './navigation.mjs'

export default createSidebar(navigation)
