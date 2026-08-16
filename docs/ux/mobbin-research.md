# Mobbin UX Research

Status: COMPLETE FOR INITIAL PRODUCT-SHELL PASS
Date: 2026-08-16

The actual Mobbin screenshots and multi-step flows were inspected. These references are evidence for interaction principles, not templates to copy visually.

## Claude: calm entry and focused context

### Web onboarding

References:

- [Claude web onboarding and first chat](https://mobbin.com/flows/6bb1fc63-8371-4607-9177-27c671d26c9a)
- [Recent Claude onboarding variant](https://mobbin.com/flows/5a978c28-535c-4f01-9f7c-9de174312082)

Observed:

- Sign-in is centered and limited to dominant Google and email paths.
- Email confirmation remains in the same visual context.
- First-run screens present one primary action.
- The product teaches through the real composer instead of a long tutorial.

Borrowed principle:

MAX should make identity and the first successful prompt the shortest path. Onboarding should collect only context that materially improves that prompt. Approvals, knowledge review, and delegation should be explained when the user encounters real examples.

### Projects and workspace context

Reference:

- [Claude project to new-chat flow](https://mobbin.com/flows/ec792903-5960-4d7b-a6ad-a83fac865def)

Observed:

- Project scope and knowledge are visible before conversation entry.
- Chat becomes dominant once work begins.
- Chats, projects, and artifacts remain distinct navigation concepts.

Borrowed principle:

A MAX workspace selects operating context, retrieval scope, and defaults. It does not own another transcript. Workspace context should be inspectable and then recede while the founder is conversing.

### iOS navigation and attachments

References:

- [Claude iOS chats and navigation drawer](https://mobbin.com/flows/452dcc19-a390-4d80-80f0-5d01078c802e)
- [Claude iOS home](https://mobbin.com/flows/172aff65-1b76-44ad-b5ca-85187b7cbf09)
- [Claude iOS pinning](https://mobbin.com/flows/7026177a-9967-4f9e-8860-06500a7c7763)
- [Claude iOS search](https://mobbin.com/flows/a7a124b2-847f-4505-9912-e744cadfa2f4)
- [Claude iOS share snapshot](https://mobbin.com/flows/2e7e88aa-b460-41de-bcb2-0823121ad0cb)

Observed:

- The conversation is the only primary mobile surface.
- Navigation uses a drawer; camera, photos, and files use a focused sheet.
- Pinning and search remain available without occupying transcript space.
- Sharing explains the exact included message scope.

Borrowed principle:

MAX mobile should not compress desktop navigation or the context panel beside chat. Navigation, attachments, and artifacts should open in focused overlays with explicit scope, accessible close controls, and predictable back behavior.

## ChatGPT: message ergonomics, branching, and voice

### iOS chat and composer

References:

- [ChatGPT iOS message actions and generation](https://mobbin.com/flows/41fe4c59-3bd4-4221-8e88-36bd9c15ff17)
- [ChatGPT iOS conversation](https://mobbin.com/flows/8ebab232-a85f-43f9-a92e-c486202e734c)
- [ChatGPT iOS photo upload](https://mobbin.com/flows/f368f5fb-9317-4d7e-b038-d5ac23308f57)
- [ChatGPT iOS chats and projects](https://mobbin.com/flows/0f538b27-9afb-4f7f-8c52-d10f51e3218e)

Observed:

- The plus action progressively reveals attachments and capabilities.
- Attachments appear as removable composer previews.
- Send becomes stop during generation.
- Copy, listen, feedback, regenerate, branch, and search remain local to the relevant message.
- Mobile projects use sequential surfaces rather than desktop columns.

Borrowed principle:

MAX should keep typing, attachment entry, dictation, live voice, and send or stop recognizable. Less-frequent model and capability choices should disclose deliberately. Message actions must affect the message beside which they appear.

### Web navigation, search, and context

References:

- [ChatGPT web conversation menu](https://mobbin.com/screens/eec67af2-b68a-4c8b-bf66-2f45102a0fa3)
- [ChatGPT web research activity panel](https://mobbin.com/screens/b045e2cd-4f54-424a-97f6-4c5954f0c1e1)
- [ChatGPT web new-chat surface](https://mobbin.com/screens/8229c408-df4e-4555-af78-87e736356db1)
- [ChatGPT web branch action](https://mobbin.com/screens/88d5e839-cf2b-447b-887c-a4beeead8040)
- [ChatGPT web search modal](https://mobbin.com/screens/0729631b-f0f3-423c-8eff-5903dc2d0ca9)
- [ChatGPT web fork lineage](https://mobbin.com/screens/35e287bd-158a-4413-8cc9-07b9dabe798b)

Observed:

- Stable left navigation keeps new chat, search, projects, and recents reachable.
- Global search uses a focused modal rather than permanent filter chrome.
- The right activity/source panel appears only when the task creates useful inspectable context.
- Branching begins at the selected message and displays lineage.
- Archive and delete live in conversation-level management rather than everyday reading controls.

Borrowed principle:

MAX should combine fast global recovery with a full Library. The right panel must be contextual, not decorative. Forking must record parent thread and source message, open the divergent thread immediately, and leave the original unchanged.

### Dictation and live voice

References:

- [ChatGPT iOS live-voice setup, conversation, and transcript return](https://mobbin.com/flows/e513c0fe-fd2a-4f92-b7e7-756c9a8e9996)
- [ChatGPT iOS live-voice interaction](https://mobbin.com/flows/8a834128-d249-425a-8bc6-029504038e5f)
- [ChatGPT iOS dictation](https://mobbin.com/flows/58d74cd6-a372-4e6f-97a1-6f43a1dfc269)
- [ChatGPT iOS voice input](https://mobbin.com/flows/ceb16aae-9055-4428-9f70-ce77791bb3c1)

Observed:

- Dictation is record, transcribe, review, edit, and send.
- Live voice is a distinct full-screen state with activity, mute, interruption, and end controls.
- Ending live voice returns transcript content to the ordinary conversation.
- Turn-taking and interruption state are visible.

Borrowed principle:

MAX must not conflate dictation and live conversation. Live mode may temporarily take over the screen, but its durable outcome belongs to the current thread. Provider and connection state must be literal and testable.

## Sana: founder-scale retrieval and contextual agents

References:

- [Sana home and navigation](https://mobbin.com/screens/fbfef6f6-d5a1-46f8-bf3e-7ecb09394a30)
- [Sana search filters](https://mobbin.com/screens/c9a22576-6a34-4aae-b174-d26041a620ce)
- [Sana keyboard shortcuts](https://mobbin.com/screens/cdd5147b-b244-4f90-a2ff-b08bfbc720a9)
- [Sana agent three-pane workspace](https://mobbin.com/screens/d940c99e-9a8e-4c8b-a4f1-a12dcb35d8a0)
- [Sana source picker](https://mobbin.com/screens/ba9690ab-bc14-42ba-bc12-4d96fadde788)
- [Sana folder and content surface](https://mobbin.com/screens/511438cf-046d-4126-b8b4-8f08d6b8d542)
- [Sana upload drawer](https://mobbin.com/screens/039fc017-826c-4e76-aabf-52a6b88ef52f)

Observed:

- A slim navigation remains stable while the center surface changes by task.
- Search filters become removable chips, disclose more options progressively, and provide reset.
- Shortcuts are grouped in a scannable overlay.
- Agent details can use a contextual right surface without replacing the current task.
- Selected sources become concise context chips.
- Uploads use a focused drawer rather than enterprise document administration.

Borrowed principle:

MAX should support fast project, type, status, source, agent, date, and review filtering while keeping the default Library simple. Agent surfaces must expose real role, permissions, and task state rather than simulated autonomy. Shortcuts accelerate, but never gate, core actions.

## Settings and setup health

References:

- [Claude web settings](https://mobbin.com/screens/8fa0bf04-4ef2-4478-96f7-0db85c19abfd)
- [v0 settings and integrations](https://mobbin.com/screens/b6d37634-1602-4a93-a33d-478a959794be)

Observed:

- Settings use durable categories instead of one miscellaneous form.
- Profile, preferences, capabilities, connectors, privacy, and account controls are separated.
- Integration controls communicate both status and effect.
- Personal context can be edited without exposing the immutable system contract.

Borrowed principle:

MAX settings should separate identity, operating preferences, integrations, setup health, appearance/accessibility, and tours. Capability state may be shown as configured or unconfigured, but secret values are never displayed.

## Synthesized MAX direction

MAX is not a visual blend of other products. It combines:

- Claude's calm entry and low-cognitive-load first run;
- ChatGPT's message-local actions, branching, multimodal composer, and explicit live mode;
- Sana's founder-scale navigation, filters, source selection, and contextual agent information.

Resulting rules:

1. Keep the selected conversation or work object dominant.
2. Reveal complexity at the moment it becomes useful.
3. Use the right panel only for real context, artifacts, sources, or review.
4. Use drawers and sheets to preserve one primary mobile surface.
5. Preserve lineage and scope for branches, approvals, shares, and artifacts.
6. Show literal state for streaming, tools, voice, agents, and integrations.
7. Prefer compact information architecture over dashboard decoration.
