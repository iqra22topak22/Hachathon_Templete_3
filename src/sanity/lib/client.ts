import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId : "u2bttklc",
  dataset : "production",
  apiVersion : "2024-01-25",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:"skMHe7DQEB7AzCVZaXFi09V5wF0Di4pKPI6grkUAxL0P9Jgk7aiwuZFwUUD7D8lGwfjaptJFIcbORpNiVqGUJVQPvmOqfRCC3EH5ki9vNRMyuGQquv71JKaWoUjO4rvAL1NvKlzsTUIIBAmHZ0Mccm0T21anHqgLsUJbmL64k05E81kDHcqN",
})
