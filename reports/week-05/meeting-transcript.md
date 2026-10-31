# Week 5 meeting transcript

- **Date:** 2026-10-29
- **Participants:** Customer, danmaninc, AntonChulakov, hrrrsss

[00:00:27] Customer: Sure.
[00:00:27] Customer: Yeah, do you have any questions?
[00:00:27] Customer: Do you have any updates?
[00:00:39] danmaninc: I guess sharing is turned off, I cannot share my screen right now.
[00:00:45] Customer: I'll fix that.
[00:00:55] Customer: And now you should be able to…
[00:01:00] danmaninc: Yep.
[00:01:02] danmaninc: Give me a moment.
[00:01:12] danmaninc: Okay, so I guess you may see my screen.
[00:01:19] Customer: Yep.
[00:01:21] danmaninc: Okay, great.
[00:01:21] danmaninc: So basically, we have…
[00:01:25] danmaninc: Sprint 5, in which we previously declared the user stories about reusing earlier answers as context and seeing what context the query used.
[00:01:36] danmaninc: I will start by showing you the implemented functionality for these user stories, so then we can see whether they're accepted and decide what to do with them next.
[00:01:58] danmaninc: Then we can go forward into discussing the user stories that are currently work in progress during this sprint.
[00:02:09] Customer: Okay, sounds good.
[00:02:12] danmaninc: So, about the user stories about using earlier answers as context: basically, we can create some text notes.
[00:02:14] danmaninc: As you can see, we now have handles for the blocks.
[00:02:27] danmaninc: So you may, for example, take another block and then connect it.
[00:02:36] danmaninc: The edges are not fixed to specific handles, so you can create as many connections as you want for each block.
[00:02:46] danmaninc: And the placement will depend on the blocks' positions.
[00:02:52] danmaninc: Also, you can delete.
[00:02:52] danmaninc: As you requested previously, the deletion was too easy, so we decided to hide it in the context menu here.
[00:02:52] danmaninc: You open it by right-clicking.
[00:03:14] danmaninc: Also…
[00:03:14] danmaninc: Oh, I see, I see.
[00:03:16] Customer: So it's like, right-click, and then you have to confirm, yeah, that's fine.
[00:03:20] danmaninc: Yeah, yeah.
[00:03:22] danmaninc: Also, it's not only about the connections.
[00:03:29] danmaninc: We have an AI block.
[00:03:29] danmaninc: We can type, for example, a secret code word.
[00:03:37] danmaninc: Secret word.
[00:03:39] danmaninc: The secret word of Penguin is, for example, gamepad, just a random word, so the AI should not just guess randomly, it should take it from this context.
[00:03:56] danmaninc: So I can ask the LLM, what is the secret for the Penguin?
[00:04:05] danmaninc: It will respond that it is a gamepad.
[00:04:05] danmaninc: And it will also provide the links to the blocks that were used in its answer.
[00:04:16] danmaninc: So it used this block, the secret word of Penguin, and if you click it, we focus on it.
[00:04:24] danmaninc: You can see each block that was mentioned.
[00:04:29] danmaninc: And we can also create another block and, for example, [inaudible], also connected to this block, and then ask the AI, what is the favorite book?
[00:04:57] danmaninc: And it will say that it's [inaudible], and it basically also mentions only this block.
[00:05:07] Customer: [inaudible]
[00:05:11] Customer: [inaudible] block, basically.
[00:05:15] Customer: And that's the right book, right?
[00:05:21] Customer: Star Trek.
[00:05:23] Customer: It's not the book, but, okay, maybe I should ask a better question.
[00:05:33] Customer: When you present this context to the AI, do you just put it all together and give it to the AI, right?
[00:05:33] Customer: There's nothing…
[00:05:46] danmaninc: In the current version, we provide the full context.
[00:05:50] Customer: You just post everything, all the text that's there, you say, okay, the favorite book is [inaudible], and the secret word of Penguin is a gamepad, and it's just one thing.
[00:05:50] Customer: Yeah, and then okay, that's fine.
[00:06:06] Customer: And what about connecting an AI block to an AI block?
[00:06:06] Customer: Does that work?
[00:06:14] danmaninc: AI to AI blocks.
[00:06:14] danmaninc: Currently, we provide the functionality to connect AI blocks to AI blocks, but not yet to use the content of the conversations.
[00:06:27] danmaninc: But we will do it.
[00:06:29] Customer: But the content is not, is not…
[00:06:33] danmaninc: Huh?
[00:06:34] Customer: The context is [inaudible], it's the context that we generate.
[00:06:38] danmaninc: Yep, yep, yep.
[00:06:38] danmaninc: If I ask…
[00:06:42] danmaninc: Anything right now, it's a… oh, yeah.
[00:06:46] Customer: Okay.
[00:06:47] Customer: Have you thought about that, sending…
[00:06:58] Customer: Are you planning to send the entire context, the entire conversation, or the last reply, or just the replies?
[00:07:09] Customer: Do you think it makes sense to…
[00:07:15] AntonChulakov: We thought to summarize the conversation before sending.
[00:07:15] AntonChulakov: So if it's a huge conversation, if it's over some threshold limit of symbols, and the AI writes a huge text, we summarize it and send it.
[00:07:15] AntonChulakov: And to limit the number of times the whole system is updated, we put a threshold of, I don't know, we can put time, or something else.
[00:07:48] Customer: I like it, yeah, that's good, that's good.
[00:07:52] Customer: I think that's better than sending the entire thing.
[00:07:58] Customer: But yeah, it's better than sending the entire conversation as context.
[00:08:03] Customer: It doesn't make much sense.
[00:08:08] Customer: If I wanted any chunk, I would just copy-paste it into a text block and use that specific chunk there.
[00:08:19] Customer: Okay, yeah, I like the summary idea.
[00:08:22] Customer: Great.
[00:08:29] danmaninc: Alright, so this is about the current progress on these user stories that we accomplished here.
[00:08:38] danmaninc: But I guess as you mentioned, to [inaudible] this story, we need to reuse the AI conversations.
[00:08:51] Customer: Oh, yeah, because otherwise it would be two stories.
[00:08:55] Customer: That's two stories.
[00:08:57] Customer: That's this kind of [inaudible], that's not a kind of…
[00:09:02] Customer: But I mean, it's fine.
[00:09:02] Customer: Just, if we accept it, then will you guys remember?
[00:09:08] Customer: I mean, I don't really care much about specifics, as long as you guys make progress.
[00:09:08] Customer: You can create another user story specifically for this and [inaudible] this.
[00:09:27] danmaninc: I guess we might just leave this story about reusing earlier answers, and we may close the one about what context the query used.
[00:09:39] Customer: Okay.
[00:09:39] Customer: Okay, I'll pull it up.
[00:09:45] danmaninc: So, given a query widget connected to other widgets, when a member selects it, the member sees that…
[00:10:02] danmaninc: I guess the acceptance criteria are a little bit wrong.
[00:10:02] danmaninc: Sorry about that.
[00:10:10] danmaninc: It's not…
[00:10:11] danmaninc: It specifies that a query widget connects to other widgets, and then specifies all linked widgets, but not about the query.
[00:10:11] danmaninc: It's a little bit misinterpreted.
[00:10:11] danmaninc: But we meant that it says…
[00:10:25] danmaninc: [inaudible], when it opens the AI block, it sees which block was used in the query.
[00:10:33] danmaninc: Oh, in the answer to the query.
[00:10:37] Customer: Oh, yeah, that's why writing acceptance criteria is a bit hard, and you do have to be very specific.
[00:10:46] danmaninc: Yeah.
[00:10:47] Customer: Because otherwise you would end up rewriting it, it would expand, right?
[00:10:47] Customer: You basically tailor it to what you got, and it's…
[00:10:58] Customer: Yeah.
[00:10:58] Customer: But I just wanted to highlight that.
[00:11:03] Customer: That's a very common one: those criteria were not written like, not what you meant, or not correctly, and then it's kind of a conundrum, like, okay, what do I do now?
[00:11:03] Customer: Do I fix it, or do I create a new one?
[00:11:33] danmaninc: I guess, can we modify this acceptance criterion here…
[00:11:37] Customer: Sure, yeah, yeah.
[00:11:40] danmaninc: So that if the AI used some block from the context during its answer, it will add the link to this block, so the user can see which block was used.
[00:11:55] danmaninc: And…
[00:11:55] Customer: Oh, yeah, I didn't… could you go back to the conversation?
[00:12:03] Customer: Let's go to this AI, and let's, oh, there's no way to clear it, right?
[00:12:10] Customer: I was basically curious, so if you delete…
[00:12:14] Customer: Delete the link now, and ask the same question.
[00:12:18] Customer: Well, now it did have… so delete the link.
[00:12:24] danmaninc: If we delete this link, it will not have access to these ones, but it will have…
[00:12:33] Customer: Disconnected.
[00:12:34] danmaninc: Yeah, okay.
[00:12:35] Customer: Its own context.
[00:12:35] Customer: Let's try it, let's see.
[00:12:42] Customer: Because then it will not show the link, the used block, right?
[00:12:42] Customer: It will say, oh, it's…
[00:12:48] Customer: [inaudible]
[00:12:52] Customer: Yeah, I see.
[00:12:54] Customer: [inaudible]
[00:12:55] danmaninc: And if I change this [inaudible], then it will not get it.
[00:13:03] Customer: [inaudible] banana, and then [inaudible].
[00:13:14] Customer: Now make a connection and see where [inaudible].
[00:13:30] Customer: Nice.
[00:13:32] Customer: Okay.
[00:13:33] Customer: So that little thing that you added, that there's a link to a block, turns out to be quite useful, because if there is not another link to a block, then it found it in its own context somehow, or it found it some other way.
[00:13:52] Customer: Oh yeah, that's pretty useful, even though that was not a part of the user story, but quite a useful feature.
[00:14:02] AntonChulakov: I also think another useful feature would be to clean the context of the AI window, so you don't have to delete the [inaudible] each time if you just want to clear their memory.
[00:14:18] Customer: Yeah, yeah, maybe you're right, it would be nice to delete, because you can modify a text block, right?
[00:14:18] Customer: You can delete, you can modify.
[00:14:31] Customer: So I guess the expectation is the same for the AI block.
[00:14:37] Customer: Clear it completely.
[00:14:40] Customer: Editing feels weird, but just clearing it completely would be okay.
[00:14:45] Customer: I mean, in fact, it's a good feature to have.
[00:14:51] Customer: Because, yeah, so you don't have to recreate the whole thing, the context doesn't affect… so yeah, you're right, clearing.
[00:14:51] Customer: Nice.
[00:14:51] Customer: And it's cool that we just figured it out when using your software.
[00:14:51] Customer: We're finding ways to collaborate with.
[00:15:16] Customer: Kind of inviting the LLM to the table, with all of its parts and stuff.
[00:15:25] Customer: Yeah, guys, if you can record, maybe for some future…
[00:15:30] Customer: Oh, a user story to clear the AI block.
[00:15:34] Customer: Okay.
[00:15:43] danmaninc: Okay…
[00:15:45] Customer: And also, just one more comment that I wanted to add: that feature that shows one block used, or two blocks used, is still very useful, because even if it's not in the AI's context but in its training data, then we'll know that the AI came up with the answer itself, it didn't use the context.
[00:16:11] Customer: That's still a very useful feature, even if we do have the button to clear out all the context.
[00:16:11] Customer: So yeah, that one was very good.
[00:16:30] danmaninc: Alright.
[00:16:33] danmaninc: So, let's build the… basically, the list here…
[00:16:41] danmaninc: I guess we can accept this story about seeing what context the query used.
[00:16:49] Customer: Yeah, sounds right.
[00:16:53] danmaninc: US-05, I guess, we will for now reject, because it should reuse the AI conversations in the context, and to rework it a little bit.
[00:17:06] danmaninc: Also, we had on the list the user story about joining a teammate's board, but it's actually already implemented.
[00:17:06] danmaninc: It's about this one, the share link.
[00:17:20] danmaninc: That's the word, [inaudible].
[00:17:23] Customer: Never consult with Claude.
[00:17:27] danmaninc: So I guess we can also accept it, right?
[00:17:31] Customer: That's correct, yeah.
[00:17:34] danmaninc: Okay, so during this week we also have the stories about a long text block, as you mentioned, so it would work as an AI block here, so, display the widget, maybe the text.
[00:17:56] Customer: Yeah, yeah, [inaudible], yeah.
[00:17:59] danmaninc: Also sharing LLM diagrams, basically, as you mentioned, Mermaid.
[00:17:59] danmaninc: I would also like to discuss with you this feature, as you mentioned in the feedback, that Mermaid is not a format, but a library that supports many different kinds of diagrams.
[00:18:23] danmaninc: So I'd like to know which kinds of diagrams you usually use during a brainstorm.
[00:18:35] Customer: Oh, I meant in my comment that we need to be a little bit more precise in our language, which is good, because then we talked about the same thing.
[00:18:48] Customer: It can be any, you can implement…
[00:18:58] Customer: Let me think about it, and maybe I'll post it in the chat.
[00:18:58] Customer: There are three most useful things that you see all the time.
[00:19:11] Customer: And I'll post them in the chat.
[00:19:11] Customer: Right now, off the top of my head…
[00:19:24] danmaninc: Okay, I would also like to propose a little plan for integrating the diagrams in the application.
[00:19:24] danmaninc: Basically, as we mentioned, diagrams can be output by the AI, so instead of displaying just the plain code of the diagram, it will first render in this AI conversation, so you could see the diagram itself, but not the code of it.
[00:20:01] danmaninc: Then we may put this diagram on the board as an image, first.
[00:20:01] danmaninc: And it could also serve as a bridge to the upcoming feature in the sprint, using images: adding images and using them.
[00:20:19] danmaninc: And…
[00:20:25] Customer: Huh.
[00:20:25] Customer: I like your idea.
[00:20:25] Customer: While we are on this topic.
[00:20:30] danmaninc: Yup.
[00:20:30] Customer: I think we should show the text in the chat, the actual code.
[00:20:30] Customer: Because then, let's say I want to take something and then I want to update it, it would be useful to just copy-paste that text and, let's say, maybe put it in a text diagram and then update it there.
[00:20:59] Customer: But you're right, I agree, it would be nice to see that image somehow.
[00:21:05] Customer: So I think we should not hide the actual text that the LLM produces, and we should show the image.
[00:21:20] Customer: So, the way you usually work with diagrams: when the LLM produces something, it outputs this long thing, and you have no idea what's going on.
[00:21:20] Customer: You don't see the whole picture.
[00:21:33] Customer: Once you see the whole picture, you're like, okay, here it's wrong, or here, what if we do something else?
[00:21:33] Customer: Then you take the code, you find it, you update it, maybe copy-paste it, and then you want to see the updated picture.
[00:21:55] Customer: So that's usually the flow.
[00:21:58] Customer: So hiding the code would be detrimental.
[00:21:58] Customer: Don't hide the actual output.
[00:22:06] danmaninc: So you would like to have two modes of viewing, the image preview and the source code.
[00:22:16] Customer: Yes, yes, because if you want to change something, then how would you get it?
[00:22:22] Customer: [inaudible]
[00:22:24] AntonChulakov: For example, if you have text, as I understand it correctly, we have the LLM output text, we scroll down it, and there is a program, I don't know, main.py.
[00:22:39] AntonChulakov: And you can expand it and see the whole code that it produces.
[00:22:39] AntonChulakov: But if you don't want it, and by default you don't need it, it is just closed, a short version of it.
[00:22:55] AntonChulakov: Do I understand correctly?
[00:23:01] Customer: Not sure, I was going off what you were proposing.
[00:23:10] Customer: I agree that we do need to show the diagram, and it would be nice to show the diagram on that board somehow.
[00:23:22] Customer: I think we shouldn't hide the output, the actual output of the LLM.
[00:23:22] Customer: So that's all I have.
[00:23:33] Customer: And then maybe later I want to take that code and post it in a text box, and say that the text box can also render the specific code and produce another picture.
[00:23:51] Customer: Then I can update that text box and connect it to another LLM box, and say, okay, do something, or take it into the context.
[00:24:02] Customer: That would be cool.
[00:24:04] Customer: But it would be nice to have both: the initial output of the LLM, the ability to grab that text, and the ability to update it and see the updated picture.
[00:24:24] AntonChulakov: So the user should be able to copy the text that is produced.
[00:24:31] Customer: Yes.
[00:24:31] AntonChulakov: And if you want, you can just close it to see the whole picture.
[00:24:31] AntonChulakov: If it's a big code snippet, it will be a lot, a lot of code, you can just close it, like, okay, I understand this part, I don't need to copy it.
[00:24:51] Customer: I see, yeah, that would be nice.
[00:24:51] Customer: Yeah, I agree.
[00:24:51] Customer: Totally agree with you.
[00:24:51] Customer: Now I see what you mean.
[00:24:51] Customer: Yeah, if you guys can do that, if you can collapse the entire code, that would be a useful feature, yeah.
[00:24:51] Customer: So if you talk to the LLM, you ask it to produce something, and it gives a long answer, and you want to collapse it.
[00:25:12] Customer: Yeah, if you guys can do it.
[00:25:23] danmaninc: Okay then, we'll note this.
[00:25:23] danmaninc: Also…
[00:25:29] danmaninc: I would like to mention that rendering the diagram in the AI block, with the possibility to view the source code, and then possibly putting this on the board: I would like to propose that we first display it on the board in the form of an image.
[00:25:51] danmaninc: But if it is possible, we may convert it to native blocks, like these ones, but that may go a little bit out of the scope of the project, because we can dive into the variety of blocks.
[00:26:11] Customer: Yes, yeah, an image is fine.
[00:26:11] Customer: For now it's perfectly fine, and I totally agree that it is out of scope to make the boxes and then have different types of boxes.
[00:26:11] Customer: Yeah, we shouldn't do that.
[00:26:11] Customer: Let's just show it as an image.
[00:26:26] Customer: danmaninc, that's good enough.
[00:26:31] danmaninc: Okay, fine.
[00:26:31] danmaninc: And also, we have the feature about highlighting.
[00:26:41] danmaninc: Highlighting blocks on the board.
[00:26:44] danmaninc: So the possibility that a member can highlight some block, and every member will see that it is highlighted, so it will bring their attention.
[00:26:56] danmaninc: I'd like to ask how you usually highlight some parts of the board.
[00:27:02] danmaninc: How do we bring attention to a specific block?
[00:27:08] Customer: Well, I think the way it works right now, you click on that thing and actually, kind of the block, I think that already works.
[00:27:22] danmaninc: You mean that, for example, members each have some specific color, so the user can click on the block, and it colors in the member's color?
[00:27:36] Customer: Yeah, yeah, yeah.
[00:27:39] Customer: Although it feels like quite a bit more work, because you need to assign colors, you need to display them.
[00:27:50] Customer: I think what you have is good enough.
[00:27:50] Customer: So if I can see that highlight.
[00:27:59] Customer: For example, if I join the board and I see which of the AI blocks you are looking at highlighted, currently.
[00:28:10] Customer: But then, if somebody else clicked, could you send me this link in Telegram?
[00:28:18] danmaninc: Yep.
[00:28:19] Customer: Oh, is it the…
[00:28:19] Customer: Okay, so it's working.
[00:28:21] Customer: [inaudible] trying that.
[00:29:02] Customer: Okay, so right now, you don't see what I highlighted, and you don't know which.
[00:29:07] danmaninc: That's right.
[00:29:08] Customer: Of those boxes, of the AI boxes, I am talking about.
[00:29:13] Customer: And it would be nice to show…
[00:29:23] Customer: But yeah, you're right, unless there are different colors, and then different themes highlighted and…
[00:29:32] Customer: Yeah, I don't know.
[00:29:39] AntonChulakov: I think it may be a little bit simpler to have a specific…
[00:29:48] AntonChulakov: If you right-click on the block, we can delete it, you know.
[00:29:48] AntonChulakov: We can add a button to highlight it.
[00:29:57] AntonChulakov: So if you push the highlight button, it will show up, for example, with a yellow outline, or something like that.
[00:30:08] AntonChulakov: And if someone else sees the board, they will see that it's highlighted, so they will instantly know what they are talking about.
[00:30:08] AntonChulakov: Like, I'm talking about [inaudible], I press the highlight button, and it's highlighted.
[00:30:23] Customer: No, we don't yet.
[00:30:23] AntonChulakov: We don't need to specify who highlighted it specifically, we don't need to do it, yeah.
[00:30:29] Customer: Yeah, I like that, but now you have, let's say, a bit of a problem.
[00:30:29] Customer: It's like, if there's highlight and delete, two choices.
[00:30:37] Customer: I will click on delete, I meant.
[00:30:42] AntonChulakov: Okay.
[00:30:43] Customer: I was…
[00:30:44] AntonChulakov: The problem.
[00:30:45] Customer: [inaudible] highlights.
[00:30:45] Customer: But I like your idea.
[00:30:45] Customer: I like that.
[00:30:54] AntonChulakov: danmaninc, I don't know if you can do it, but can we specify default hotkeys for blocks?
[00:30:54] AntonChulakov: Like, delete is for deleting the block, and, I don't know, H for highlight, or something.
[00:31:12] AntonChulakov: So they're separated, not close to each other.
[00:31:18] AntonChulakov: Okay.
[00:31:18] danmaninc: I don't think…
[00:31:19] AntonChulakov: It's a clear user problem to have a specific delete button next to the highlight button, so that it will delete the whole context of the AI.
[00:31:30] AntonChulakov: Remove.
[00:31:33] danmaninc: I guess, yeah, you're right.
[00:31:33] danmaninc: Basically, yeah, we can put some hotkeys, but there's also another problem: the user needs to know about these hotkeys.
[00:31:45] AntonChulakov: Yeah, yeah.
[00:31:47] danmaninc: Because they can be different.
[00:31:50] Customer: Here, I highlighted it.
[00:31:54] danmaninc: Yeah.
[00:32:00] danmaninc: And also, create [inaudible] with the arrows [inaudible].
[00:32:05] AntonChulakov: We may…
[00:32:05] AntonChulakov: I think the easiest one is a confirmation for delete.
[00:32:05] AntonChulakov: So if you press delete, it happens in another window, like, are you sure you want to delete?
[00:32:05] AntonChulakov: And then it's [inaudible]
[00:32:22] Customer: Yeah.
[00:32:22] Customer: That way, it should…
[00:32:23] AntonChulakov: So if you accidentally press it, you don't instantly delete everything.
[00:32:28] Customer: Yes, yes.
[00:32:28] Customer: Yeah.
[00:32:31] Customer: I agree.
[00:32:31] Customer: Yeah, it would be a pretty good, cool solution, if you have a right-click menu, and then you can delete, and then you can highlight, you can do whatever, but then, you're right, you have to add a confirmation that I meant to delete and not highlight, or something else.
[00:32:57] Customer: And that would probably be good for other possible features, not only highlights, but something else.
[00:33:06] AntonChulakov: Yeah.
[00:33:07] danmaninc: I would suggest that we can put this not only in the context menu, but also on the toolbar, so a highlight button.
[00:33:18] danmaninc: [inaudible]
[00:33:18] AntonChulakov: Why on the toolbar?
[00:33:23] AntonChulakov: Why do we need a toolbar, if the toolbar is used for creating new boxes?
[00:33:23] AntonChulakov: Like, will we have a specific highlighted box?
[00:33:37] danmaninc: I guess we can split these buttons into groups, like a group for creating blocks, and a group for some tools, like highlighting, and possibly in the future, maybe drawing, and also some other things.
[00:33:51] danmaninc: It could be, like, this one, but it's not like…
[00:33:55] AntonChulakov: Yes, sir.
[00:33:55] danmaninc: It's just [inaudible].
[00:33:57] AntonChulakov: Yeah.
[00:33:58] Customer: Yeah, it's an interesting idea, I agree.
[00:33:58] Customer: So you're kind of creating a highlight, and you can do it.
[00:34:05] AntonChulakov: I mean, I'm just worried about it being an annoying feature, because if you have too many highlighted blocks, for example, someone highlights the fifth block in a row, and you can't see which one is new, which one is old, so it's too much.
[00:34:05] AntonChulakov: So I think the highlight should be on a maximum of two blocks, or even one.
[00:34:34] AntonChulakov: Like, this is highlighted now, this is highlighted now, not everyone.
[00:34:39] AntonChulakov: [inaudible] for it, it will be too much, I think.
[00:34:45] Customer: Yeah, you're right, you're right.
[00:34:47] Customer: I agree, because if we bring it to the toolbar, then it looks like we want people to use it and create as many highlights as they want.
[00:34:56] Customer: And you're right, we don't.
[00:34:57] Customer: So it would be nice to…
[00:34:57] Customer: I know.
[00:35:03] Customer: Limit it to the right-click menu, and maybe even then, we would unhighlight everything else, or keep the last two highlighted and unhighlight everything else, you're right.
[00:35:16] Customer: But for now, we can just do it as a right-click, and highlight, making it specific to the box that I want people to pay attention to, and not as a tool to just go and highlight everything.
[00:35:40] Customer: So, yeah, I like that idea.
[00:35:47] danmaninc: I would also like to ask a question about another feature.
[00:35:47] danmaninc: We have the delete.
[00:35:53] danmaninc: In the previous meeting, you mentioned that we should also have the possibility to undo this deletion.
[00:35:53] danmaninc: Like, if we accidentally delete something, we want to return it, and, oh no, we do not have this feature.
[00:36:09] danmaninc: So what do you want to do now?
[00:36:13] Customer: I think it's a…
[00:36:13] danmaninc: So important.
[00:36:14] Customer: I think it's pretty complex idea, because you will have to implement the entire…
[00:36:31] Customer: You have to have a trash bin, and then I keep deleting, and if I want to undelete it, it has to go to the trash bin, and…
[00:36:38] Customer: What if you have a bunch of things there?
[00:36:38] Customer: What if they go stale?
[00:36:38] Customer: It creates a lot more complexity.
[00:36:46] Customer: I would say…
[00:36:47] Customer: It's okay right now to delete things, if you give me a warning, okay, you're sure you want to delete it, and that's it.
[00:36:47] Customer: If I delete it, it's gone.
[00:36:47] Customer: If I clicked yes in the…
[00:37:03] Customer: When you warned me, are you sure you want to delete?
[00:37:03] Customer: Done, it's fine.
[00:37:03] Customer: It's okay, it's deleted, I can recreate it if needed.
[00:37:11] Customer: Because dealing with the trash concept, I don't think it's needed here.
[00:37:11] Customer: It would be cool, of course, but it just brings a whole host of things that we don't want to focus on right now.
[00:37:31] danmaninc: I guess I can say that it maybe depends on the scope that you pick, because we could undo the block locally, for example, keep the local history of the deleted blocks, but we could also implement a global history that is visible to all members, like a global trash bin on the board.
[00:37:56] danmaninc: And this…
[00:37:57] Customer: Whoa!
[00:37:58] Customer: Yeah, you could go this way, what Google does.
[00:38:04] Customer: They don't ask you for confirmation.
[00:38:07] Customer: If you delete something, they delete it, but they let you undo the action.
[00:38:14] Customer: Let's say I deleted something, if you implemented this undo button, then, yeah, no worries.
[00:38:14] Customer: You delete it, and, oh, okay, never mind, just undo it.
[00:38:28] Customer: You could go that way, yeah.
[00:38:28] Customer: You could have local.
[00:38:28] Customer: I'm just afraid that if you guys dive deeper into it, it's a pretty complex concept.
[00:38:43] Customer: Global stuff, local stuff: who sees what, synchronizing those things.
[00:38:55] danmaninc: Okay, so then we can limit the scope, I guess.
[00:38:55] danmaninc: Like, say that it is a nice-to-have feature, so that we don't just drop it.
[00:39:08] danmaninc: Because it's complex, but it's not the current focus.
[00:39:13] Customer: Yeah, yeah.
[00:39:15] Customer: Just prevent me from deleting it accidentally, and I'll be happy.
[00:39:23] danmaninc: Okay, fine.
[00:39:24] danmaninc: Okay.
[00:39:32] danmaninc: Let me see…
[00:39:32] danmaninc: I guess that's it for this.
[00:39:41] danmaninc: That's it from my side, I guess.
[00:39:48] danmaninc: Do you guys have any questions?
[00:39:54] AntonChulakov: Nope.
[00:39:57] hrrrsss: No.
[00:40:03] Customer: Well, thank you all for joining, then, it was pretty nice, quite productive.
[00:40:09] Customer: I feel like, yeah, and I see progress, and everything looks quite good.
[00:40:09] Customer: So, yeah, thank you very much.
[00:40:23] danmaninc: Okay then, thank you, have a nice evening.
[00:40:27] Customer: Yep, have a nice morning.
