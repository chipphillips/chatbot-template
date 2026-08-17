# MAX Remaining Gaps

## Must resolve before merge

- Rebase after PR #1 and PR #2 land.
- Complete the root-chat auth cutover from the temporary private access-key mechanism to Supabase Auth.
- Wire authenticated thread/message persistence through the RLS boundary.
- Run local `supabase db reset` and prove RLS isolation with at least two users.
- Add/finish conversation rename, archive, delete, and fork persistence.
- Convert preview/fixture concepts into tested runtime behavior where still missing.
- Run exact browser responsive and accessibility smoke tests locally.

## Safe follow-up

- Full Realtime WebRTC live voice.
- Image-generation provider implementation and background-removal adapter.
- Long-thread virtualization after profiling.
- Additional connector adapters and Business Canon source adapter.
- Rich artifact version/export behavior beyond the initial contract.
