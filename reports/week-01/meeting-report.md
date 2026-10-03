# Kickoff meeting report

## Metadata

**Date:** 2026-10-03
**Duration:** 60 minutes
**Attended:** danmaninc, AntonChulakov, hrrrsss, Kamil116, Customer
**Presented:** the project choice, our reading of the problem, three `GAP-nn` gaps, and the three `VP-nn` directions
**Recording:** permitted, linked from the Week 01 Moodle submission
**Transcript publication:** permitted, see [the transcript](meeting-transcript.md)
**Transcript shared privately:** not applicable
**Script:** [meeting-script.md](meeting-script.md)

## Summary

- The customer accepted `VP-01` (related to `GAP-01`) as the primary direction for our work and advised to focus mostly on it.
- `GAP-02` and `GAP-03` should be considered as a "nice-to-have" features rather than primary focus.
- The customer stated that this project is exploratory, and we can try new approaches while implementing it.

## Decisions

| Decision                                                                          | Made by  | Traces to |
| --------------------------------------------------------------------------------- | -------- | --------- |
| The project is considered as exploratory                                          | Customer | `VP-01`   |
| Allow self-hosting option for users                                               | Customer | `GAP-02`  |
| Hard limit of 10 simultaneous connections                                         | Customer | `VP-01`   |
| No complex access controls, stick to the simple sharing                           | Customer | `GAP-02`  |
| Allow users to share specific sessions and connect them to create a new context   | Customer | `VP-01`   |
| Support diagrams, images if possible, and highlighting                            | Customer | `VP-01`   |
| Export of vector data is a "nice-to-have" feature, but the primary one            | Customer | `GAP-03`  |

## Action points

| Action                                                        | Owner     | Due           |
| ------------------------------------------------------------- | --------- | ------------- |
| Research possible visualizations of the prompts in the board  | danmaninc | End of Week 2 |
| Transcribe and fixate the decisions made by the Customer in team's workspace  | AntonChulakov  | End of Week 1 |

## Open questions

None.

## Disagreements

| Your position                              | Customer's position                              | What you changed                                                  |
| ------------------------------------------ | ------------------------------------------------ | ----------------------------------------------------------------- |
| `GAP-02` and `GAP-03` are essential gaps   | The `GAP-01` is the primary focus                | Set the `VP-01` as the primary work direction                     |
| Any number of members may join the board   | The team has no more than 10 members             | `VP-01` is now has a constraint on simultaneous connections of 10 |