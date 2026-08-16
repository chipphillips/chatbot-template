# ADR 005: Library Information Architecture

Status: ACCEPTED
Date: 2026-08-16

## Context

The founder needs one durable place to recover work across conversations, artifacts, knowledge, tasks, files, decisions, and prompts. The interface must support rapid retrieval across several business contexts without becoming an enterprise document-management product.

## Decision

Create a unified Library experience over typed, separately owned records.

### Canonical record types

- conversation
- artifact
- knowledge item
- task
- file
- decision
- prompt

Each record preserves its native table and lifecycle. The Library is a read/search projection, not a second source of truth.

### Shared facets

Where applicable, records expose:

- authenticated owner
- project or workspace
- title
- searchable text
- type
- source
- agent
- status
- review status
- created and updated timestamps
- thread or artifact relation
- metadata

### Retrieval surfaces

- A full Library route for browsing and saved views.
- A lightweight global-search or command surface for fast navigation.
- Contextual project filters from the application shell.

### Filters

- project
- type
- source
- agent
- date
- status
- needs review

Filters use removable chips, preserve visible state, provide a clear reset, and collapse progressively on smaller screens.

### Saved views

Saved views are private per user and store a name plus validated filter/sort configuration. Initial suggested views such as Wilson, Constructiv, KAS, Design System, Blue Hen, Needs My Review, Recent Artifacts, and Open Tasks are templates, not fake data.

### Search implementation

Start with Postgres-backed normalized text search and indexed metadata appropriate to the current data volume. Do not add a separate search service or vector index merely to render the first Library. Semantic retrieval can be added later behind the same query contract when real corpus scale or quality evidence justifies it.

## Founder-focused constraints

- Prefer compact lists with clear type and project recognition.
- Use grid presentation only for inherently visual artifacts.
- Keep batch administration and enterprise permissions out of the first release.
- Show honest empty states with a direct next action.
- Never represent an integration as connected unless its adapter is configured and verified.

## Fork and lineage behavior

Conversation forks remain native conversation records. The Library shows their parent relationship and can open either branch without merging or mutating the original.

## Rejected alternatives

- Copying every record into a generic document table.
- Building an enterprise file cabinet with nested administration workflows.
- Shipping saved-view names backed by fabricated records.
- Introducing external search infrastructure before the local query contract is proven.

## Consequences

### Positive

- One recovery surface without competing record authority.
- Search and filters can expand as record types mature.
- The experience stays optimized for one operator across several work contexts.

### Tradeoffs

- A unified projection must normalize heterogeneous statuses and metadata.
- Some type-specific actions require opening the native detail surface.

## Validation

- Search returns only the authenticated user's records.
- Type, project, status, date, and review filters compose correctly.
- Saved views round-trip validated query state.
- Empty, loading, error, and no-results states are tested.
- Opening a result routes to its canonical record surface.
