# Week 4 meeting transcript

- **Date:** 2026-10-22
- **Participants:** Customer, danmaninc

[00:08:08] Customer: danmaninc, hello? Can you hear me?
[00:08:11] danmaninc: Hello? Yep.
[00:08:17] Customer: Do you know if anyone will join us?
[00:08:25] danmaninc: Just give me a minute, please.
[00:10:44] Customer: Or if you have something to show, or if you have questions that you can ask.
[00:10:50] Customer: Maybe we can go ahead and proceed.
[00:10:53] Customer: If people join us, that's fine; if not, it's okay too.
[00:11:06] danmaninc: Okay, alright.
[00:11:12] danmaninc: I would like to demonstrate, during this meeting, the user stories that are currently implemented.
[00:11:22] danmaninc: We have not yet released the application.
[00:11:30] danmaninc: We will do this at the end of this week, when we have the deadline.
[00:11:34] danmaninc: So, let me share my screen.
[00:11:39] Customer: [inaudible]
[00:11:40] danmaninc: I will show you this functionality from the local branch right now.
[00:11:47] Customer: That's fine.
[00:11:50] danmaninc: During this meeting, I will show you the current sprint, the user stories assigned to it, and also the tasks.
[00:12:05] danmaninc: So, we have this sprint.
[00:12:10] danmaninc: We have the user story about seeing the board.
[00:12:20] danmaninc: No.
[00:12:23] danmaninc: It is about the limit; you accepted the criteria that [inaudible] works, that members can join and see the blocks, but we had not yet implemented at the previous meeting that the board is limited to 10 people.
[00:12:38] danmaninc: That is, showing an error that there are already enough people in the room.
[00:12:44] danmaninc: Like, 10 people.
[00:12:48] Customer: Oh, crap.
[00:12:48] danmaninc: Also.
[00:12:52] danmaninc: If the LLM fails to answer when a member sends a query, an error is shown that is visible to all members.
[00:13:02] danmaninc: This is also a criterion that I will show you right now.
[00:13:06] danmaninc: And also adding notes of my own to the board.
[00:13:06] danmaninc: We implemented this feature, adding text notes, at the previous meeting.
[00:13:22] danmaninc: So, I just want to make sure that you accept this user story.
[00:13:28] danmaninc: Also, we have work in progress on using LLM answers as context.
[00:13:38] danmaninc: We're actively working on that.
[00:13:38] danmaninc: Right now I will not show this.
[00:13:38] danmaninc: We will have this accomplished by the end of this week.
[00:13:49] Customer: That would be nice.
[00:13:51] danmaninc: That would be nice, but.
[00:13:54] Customer: Okay.
[00:13:55] Customer: Okay, yeah, sure, show me the features.
[00:14:00] danmaninc: Okay, one moment.
[00:14:08] danmaninc: Alright, so, as you can see here, if we ask the LLM when it is not available, a message is shown that the AI cannot answer this query right now, and this error is shown to all members here.
[00:14:25] danmaninc: I just copied it into the other tab, and the user can see it.
[00:14:31] Customer: Okay, that's good.
[00:14:31] Customer: What happens if you click on delete?
[00:14:31] Customer: Could you click on delete?
[00:14:38] danmaninc: This button deletes the node; it will delete the whole block.
[00:14:38] danmaninc: We did not have this functionality previously.
[00:14:47] Customer: Yeah, [inaudible], and it would be cool if there were some kind of undo, right?
[00:14:53] Customer: What if I clicked accidentally and the entire conversation disappeared?
[00:15:03] danmaninc: Oh, you're right, yeah.
[00:15:05] Customer: Yeah, since you implemented delete, delete comes with either an "are you sure", which is not the greatest one, or some kind of undo thing, because if you delete it, [inaudible]
[00:15:22] Customer: a chunk of work, it would be sad.
[00:15:22] Customer: Or make the button, I don't know, harder to get to, because it's nice that you show it at the end, and it invites me to try and press it, but if I clicked accidentally, or somebody else clicked accidentally, there are, say, 10 people, and somebody was typing and then it was gone, you would ask what just happened.
[00:15:54] Customer: Okay, yeah, sorry, let's go back to that.
[00:16:00] danmaninc: Okay, also, we have two members on the board right now.
[00:16:00] danmaninc: If I add more tabs, for example, just simple tests here, [inaudible] joins.
[00:16:16] danmaninc: The message will appear that the board is full.
[00:16:19] Customer: Nice. That's very nice.
[00:16:19] Customer: Yeah, I like it.
[00:16:23] danmaninc: I may try again.
[00:16:25] Customer: I'll try to manage it.
[00:16:26] danmaninc: Or also create a new board.
[00:16:28] Customer: Nice, very good.
[00:16:28] Customer: It's really good, because now it didn't blow up, it works, and it tells me what happened.
[00:16:37] Customer: So, yeah, it's really good.
[00:16:41] Customer: Cool.
[00:16:45] Customer: Although, regarding the messaging, the board is full, and you say 10 out of 10 members.
[00:16:56] Customer: It will always be 10 out of 10.
[00:16:59] Customer: Maybe it has to be different, like avoiding the count.
[00:17:08] Customer: "Maximum of 10 members reached", or something.
[00:17:14] Customer: The board is full, maximum, because the 10 out of 10 will never be like 8 out of 10.
[00:17:24] Customer: This number will never be anything else.
[00:17:27] Customer: It will always be 10 out of 10.
[00:17:30] Customer: So it's just a warning, so it's fine, but when I see 10 out of 10, I think there will be a counter, like 1 out of 10, 2 out of 10.
[00:17:42] Customer: But I will never see this message unless there's 10 out of 10.
[00:17:51] danmaninc: Okay.
[00:17:54] danmaninc: I'll note this and also fix this.
[00:17:59] danmaninc: Yeah.
[00:17:59] Customer: Yes, but that's fine.
[00:17:59] Customer: Okay, good.
[00:18:05] danmaninc: Alright, and about text blocks, basically nothing has changed right now.
[00:18:18] danmaninc: We scheduled this user story, and we accidentally created this user story with [inaudible], but we accidentally implemented it with the AI blocks.
[00:18:33] danmaninc: Because.
[00:18:34] Customer: I have a question.
[00:18:37] danmaninc: Yep.
[00:18:38] Customer: Your AI block acts differently from the text block.
[00:18:38] Customer: Do you think it would be useful to have it work the same way?
[00:18:50] Customer: When I click on text, there's text.
[00:18:53] Customer: For example, with Markdown or something, in the side panel.
[00:18:53] Customer: Right now it's kind of like those are two different things.
[00:18:53] Customer: I click on AI, and I get this side panel.
[00:18:53] Customer: I click on text, and I type inside that block.
[00:19:09] Customer: Do you think it would be more consistent if the text block also brought up the panel?
[00:19:24] Customer: Again, it's not interesting to have small text.
[00:19:27] Customer: For just a test, you'll have "test, test, test".
[00:19:32] Customer: But if I bring some kind of document, then you'll have the same problem as with the AI.
[00:19:36] Customer: It will be a huge thing, and you need to go into the box and type it in, and you need to support formatting.
[00:19:46] Customer: Why not do the same thing you already do with AI, and have that text block say, I don't know, I can rename it the same way I can rename the AI block.
[00:19:57] Customer: It starts as text.
[00:20:03] Customer: But it brings up the panel, and in the panel people can type things and edit, and you can support Markdown.
[00:20:03] Customer: I mean later.
[00:20:15] Customer: Just have it work the same way, only the AI is not connected to it.
[00:20:24] danmaninc: Alright, so basically, in the sidebar panel, we add [inaudible] to edit the text for this block.
[00:20:34] danmaninc: More convenient.
[00:20:36] Customer: Yeah, it's more uniform.
[00:20:38] Customer: It works like the other elements, so I expect that.
[00:20:43] Customer: Oh, yeah, why not?
[00:20:47] danmaninc: Okay.
[00:20:54] Customer: And then, once you implement it, I can use it as context.
[00:20:54] Customer: Let's say I edit a skill, and then just connect it to the AI.
[00:21:01] Customer: The skill is a big Markdown document, so I can just copy-paste it into the block and name it.
[00:21:11] Customer: Like "cool skill" or "commit skill", and then I connect it to the AI.
[00:21:20] Customer: I don't need to be this thing; it's just the same type of element.
[00:21:33] danmaninc: Okay, okay.
[00:21:42] danmaninc: I think that's basically all that I wanted to show right now.
[00:21:49] danmaninc: Also, I would like your confirmation that the user story is accepted.
[00:21:56] danmaninc: Basically, I will show you the acceptance criteria that we have on the user stories, so I just need the verdict on these user stories.
[00:22:12] danmaninc: Okay, so basically we have the first user story: see the same board as my teammates.
[00:22:18] danmaninc: The acceptance criteria are here: given two members, when one of them modifies or removes an element, the other sees the change.
[00:22:18] danmaninc: And given 10 members already on the board, when a member opens it, the board shows that it is full.
[00:22:35] Customer: [inaudible]
[00:22:36] Customer: We can tick the box.
[00:22:39] danmaninc: Okay, so I've marked this as accepted.
[00:22:42] danmaninc: Okay.
[00:22:45] danmaninc: Then also, asking an LLM, the whole team sees it.
[00:22:54] danmaninc: Given two members on one board, one creates a query widget and sends the query, both see the query, and once the answer arrives, both see it in that widget.
[00:23:05] danmaninc: And also, given the LLM fails to answer, when a member sends a query, the widget shows an error that is visible to all members.
[00:23:14] Customer: Well, technically, I didn't see that on different tabs, but I guess it works.
[00:23:21] Customer: I mean, if you can see.
[00:23:24] danmaninc: Oh, I can show you.
[00:23:27] Customer: Send me a link in Telegram, then I can connect, and we can just verify.
[00:23:35] danmaninc: Right now I cannot do this, because it is not released yet.
[00:23:39] Customer: Oh, yeah, okay, never mind.
[00:23:39] Customer: Then, between two tabs, if you do that error, and.
[00:23:54] danmaninc: Like here, we have the two errors.
[00:23:58] Customer: And then it's seen another time. Yeah.
[00:24:01] Customer: [inaudible]
[00:24:08] danmaninc: Okay, so we accept this.
[00:24:13] danmaninc: Okay.
[00:24:16] danmaninc: And also, we have adding notes of my own here.
[00:24:23] danmaninc: Given an empty spot on the board, when one member adds a note with some text, every member sees the note with the added text.
[00:24:33] danmaninc: And given a note, when its author deletes it, it disappears for every member.
[00:24:33] danmaninc: I forgot to show you in the tabs that if a user deletes the block, it also disappears for the others.
[00:24:52] Customer: Yeah, okay, that looks good.
[00:24:59] danmaninc: Also, you mentioned that we should unify the behavior of this panel.
[00:25:07] danmaninc: That is, show the panel for the text blocks, and possibly support Markdown.
[00:25:16] danmaninc: So, basically, you accept this user story, and we take this as a new feature.
[00:25:23] Customer: Sure, yeah.
[00:25:25] Customer: Yes.
[00:25:26] danmaninc: Okay.
[00:25:34] Customer: [inaudible]
[00:25:36] Customer: Predicting all the approaches is hard until you actually see the thing and try it, and then you see those little things that you couldn't see in the plan.
[00:25:50] Customer: But yeah, so that user story can definitely be closed, and if you have the time capacity and the desire to do it, then it would be nice to implement that other feature.
[00:26:11] danmaninc: Okay, [inaudible].
[00:26:18] danmaninc: So, I showed you this. We accepted these user stories.
[00:26:22] danmaninc: Right now we have, as work in progress, user story 5 about reusing answers as context and seeing the context used for a query.
[00:26:22] danmaninc: We plan to finish this by the end of this week.
[00:26:36] Customer: Okay.
[00:26:37] danmaninc: And what about the next sprint that we will have?
[00:26:46] danmaninc: In the next sprint, we will focus on sharing diagrams on the board.
[00:26:55] danmaninc: Supporting this feature, and also highlighting a part of the board.
[00:27:01] danmaninc: And also [inaudible].
[00:27:09] Customer: Yeah.
[00:27:13] danmaninc: [inaudible]
[00:27:15] Customer: Yeah, that's.
[00:27:16] danmaninc: [inaudible] the necessary features this week, and focus on supplementary ones.
[00:27:23] Customer: Okay, yeah, no, that's good.
[00:27:23] Customer: It will be interesting to display shared diagrams produced by the LLM.
[00:27:36] Customer: It will be kind of interesting, because you'll have to render it, and it will be big, and you might have some problems to resolve, because it's a big drawing, for example, and you need to fit it somehow.
[00:27:59] Customer: So that feature might be pretty big.
[00:28:08] danmaninc: Okay.
[00:28:09] danmaninc: Yep.
[00:28:12] danmaninc: I agree with this, yeah.
[00:28:23] Customer: Okay, yeah, that's great.
[00:28:23] Customer: You guys are doing great.
[00:28:28] Customer: It would be nice to see other people on the call, but it's okay, I understand, it's early.
[00:28:33] Customer: Thank you for stopping by and explaining all this.
[00:28:45] Customer: Keep going.
[00:28:48] Customer: [redacted]
[00:29:08] Customer: I see a clear direction of where we're going.
[00:29:11] Customer: I see that there's some progress.
[00:29:15] Customer: I see that you planned what's going to happen several sprints ahead, and I can be confident that this will work out.
[00:29:36] Customer: [redacted]
[00:29:45] Customer: Yeah.
[00:29:46] Customer: So, yeah, thank you.
[00:29:48] danmaninc: I would also like to mention one thing.
[00:29:52] danmaninc: During this week, in the assignment, we have a requirement to establish the architectural decisions.
[00:30:06] danmaninc: So basically, we need to compose the architecture decisions, compose the architecture and compare it with the drivers, and also settle this with you.
[00:30:06] danmaninc: But unfortunately, we have not yet prepared these drafts.
[00:30:23] danmaninc: The assignment was published yesterday at night.
[00:30:27] Customer: Mm.
[00:30:28] danmaninc: So, we have not yet fully prepared it, but we are supposed to settle this with the customer.
[00:30:38] Customer: Well, yeah, and you probably will have time by next week, right?
[00:30:43] Customer: It's not going to be due Thursday, so we can talk about it next week.
[00:30:54] Customer: If push comes to shove, I think, from what I see, if you just follow what you already have, your architecture is fine. I don't see any problems.
[00:31:11] Customer: Plus, your product is the goal is not to support a million users or to have some corner cases, so your architecture will be very simple.
[00:31:28] Customer: Your architectural decisions are basically which language you're using to write that thing, and explaining why and what works, why this is the best.
[00:31:44] Customer: And probably explaining the library, like why you picked that library, and what features it gives you, so there's nothing complex or complicated.
[00:31:50] Customer: Don't try to make it very complicated, with lots of connected stuff, because your architecture is supposed to support building that [inaudible].
[00:32:14] Customer: For your needs, you don't use steel beams if you're building a small shack or a temporary structure.
[00:32:30] Customer: Same thing here.
[00:32:34] Customer: And that needs to be highlighted in your architectural decisions.
[00:32:34] Customer: So, it should be pretty simple, and I don't see any problems.
[00:32:46] Customer: In your case.
[00:32:46] Customer: For other teams, yeah, they have to do more in terms of architecture, because of the nature of their product, but for you, I think it's a lot simpler.
[00:33:02] danmaninc: Okay, I gotcha.
[00:33:05] danmaninc: Okay, so would it be okay if we draft these architectural decisions during this week, as we're supposed to deliver it, and discuss it with you at the next meeting?
[00:33:21] Customer: Yeah, perfectly fine, yeah.
[00:33:23] danmaninc: Okay.
[00:33:25] danmaninc: So we will mark them as proposed, and then we'll settle this.
[00:33:34] danmaninc: Okay, do you have any questions for us?
[00:33:39] Customer: No, it's all clear.
[00:33:39] Customer: If you go on this trajectory, I think you'll be fine.
[00:33:52] Customer: I mean, of course, as a customer, as a new customer, you are doing so great, it would be even better if you picked up the pace and got more features, but I understand, you have other classes, you have so many other things.
[00:34:08] Customer: So at least don't drop the pace of what you're doing.
[00:34:14] Customer: I think it's going to be good. Yeah.
[00:34:19] Customer: In terms of questions, are you using any special approaches to coding with AI, like using Claude Code or something, or just straight as it comes, and you just say, "Do this feature," and it builds, and then you do the next feature, or how does it work?
[00:34:48] Customer: [inaudible]
[00:34:50] danmaninc: Right now, basically, yes, we use, for example, Claude Code here.
[00:35:00] danmaninc: I think that, in the process of exploring this approach, at least for me, what I'm doing is prompting the LLM to implement an issue.
[00:35:11] danmaninc: For example, we have issues on GitHub.
[00:35:21] danmaninc: I have an integration with GitHub, so Claude can see basically the whole user stories list, the top.
[00:35:31] Customer: Oh, okay.
[00:35:32] danmaninc: Pull requests also.
[00:35:32] danmaninc: It can modify them.
[00:35:37] danmaninc: So.
[00:35:39] Customer: It works well for you, right?
[00:35:41] danmaninc: Yeah, it provides great context for the LLM, so it knows how to put this feature into this product, and it's not isolated.
[00:35:53] Customer: Oh, I see, okay.
[00:35:55] Customer: Also, excuse me.
[00:35:56] danmaninc: It's great that it sees the documentation that we provide, for example, the product vision, the value propositions, so it's goal-oriented, I would say.
[00:36:13] Customer: Okay, okay.
[00:36:15] Customer: Yeah, that's interesting.
[00:36:18] Customer: And you're not using any special arrangement, like, do you use any special skills, like for commits, or for other things, or anything that you got from other projects?
[00:36:35] danmaninc: Right now I use one skill that is basically tied to the architecture of front-end applications.
[00:36:44] danmaninc: There is a methodology, maybe you've heard of it, Feature-Sliced Design?
[00:36:52] danmaninc: So, this is a methodology, and it has a skill so that the agent can follow this architecture consistently.
[00:37:00] danmaninc: It may check that the file structure is correct and the conditions are not violated, so it will not create a mess in a single folder.
[00:37:17] Customer: Okay, okay, cool, cool.
[00:37:19] Customer: Thank you, I don't have any more questions.
[00:37:19] Customer: Thank you.
[00:37:25] danmaninc: Okay, thank you, [redacted].
[00:37:27] Customer: Yeah, I'm old.
[00:37:29] Customer: Yeah, I will post this tomorrow, if that's okay with you.
[00:37:34] Customer: Please remind me to post the video and the transcript.
[00:37:41] danmaninc: I thought I was meant to remind you.
[00:37:44] Customer: Anytime you want, just tomorrow, so I can do it in the morning.
[00:37:48] danmaninc: Okay, so I will send a reminder at that exact time tomorrow.
[00:37:55] Customer: Okay, yes, okay.
[00:37:57] danmaninc: Okay.
[00:37:58] Customer: Yep.
[00:38:00] danmaninc: Okay, see you today.
[00:38:02] Customer: Cheers. Bye. Bye.
