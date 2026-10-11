# AI usage — Week 02

## Tools

Otter.ai; Claude (claude.ai web UI).

## What we used them for

- Otter.ai: composing the transcript of the meeting recording.
- Claude: drafting the Week 2 meeting report from the transcript, the decision entries `DEC-008` to `DEC-015`, the texts of the user stories `US-01` to `US-13` and a script that opened them as issues, the minimum usable product candidate section, the decision links in `prototypes.md`, and pull request descriptions.
- Qwen: drafting the meeting recording transcript file, meeting script, markdown pipeline file.

## What we did with the output

- The received transcript was sanitized and converted to the format required by the assignment.
- Every decision, action point and disagreement in the meeting report was checked against the transcript, and each section against the course requirements.
- `DEC-012` was reworded as the customer's explicit verdict on the minimum usable product candidate, and the candidate was narrowed to `US-01` and `US-04`.
- Acceptance criteria were rewritten so that another person can run them, for example with a code word that the answer must or must not contain.
- Action point owners were taken from the assignees of the matching task issues, not from the draft.
- Meeting recording transcript file was formatted and small fixes were applied to the content.
- Meeting script draft was checked against the artifacts we had before meeting, including previous questions to prevent duplication and was verified for coherence.
- Markdown pipeline file was verified against the course requirements.

## What was not used

- Two action points the draft invented were removed, including one about telling the customer that the course requires the transcript: nobody committed to it in the meeting.
- An open question on whether a summary could replace the transcript was dropped, because the course requirements already answer it.
- A self-hosting story was dropped: self-hosting is a constraint on the whole product, so it belongs in the product vision.
- No generated text was submitted unchecked.
