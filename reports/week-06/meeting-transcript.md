# Week 6 meeting transcript

- **Date:** 2026-11-05
- **Participants:** Customer, danmaninc, Kamil116

[00:00:24] Customer: Okay.
[00:00:27] Customer: We're good to go.
[00:00:27] Customer: Let's see what changes or updates or questions you have.
[00:00:35] danmaninc: Alright, so… the open…
[00:00:50] danmaninc: One moment.
[00:01:10] danmaninc: Could you please enable screen sharing?
[00:01:14] Customer: Yeah, that's…
[00:01:30] Customer: Okay, that should be enabled.
[00:01:34] danmaninc: Yep.
[00:01:39] danmaninc: So, I guess you may see my screen.
[00:01:45] danmaninc: So, right now, I would like to firstly show the feature of highlighting the elements that we discussed previously.
[00:01:45] danmaninc: I just split the windows on the same board here.
[00:01:45] danmaninc: I guess you may also join this board, so you can see the changes.
[00:02:06] danmaninc: Sorry, good night also.
[00:02:07] Customer: Send me a link, yeah, send me a link.
[00:02:10] danmaninc: Okay.
[00:02:15] danmaninc: One sec, it's here.
[00:02:46] Customer: Okay.
[00:02:47] Customer: Loading the board.
[00:02:50] Customer: Okay.
[00:02:51] Customer: Yeah, yeah, nice.
[00:02:51] Customer: Okay, I see.
[00:02:54] danmaninc: So, a user may highlight some block, and it will be highlighted for all users.
[00:03:01] Customer: Nice, I see it, yeah, you highlighted [inaudible], and it showed up.
[00:03:05] danmaninc: And also, if you right-click the block, you may also highlight some block for me.
[00:03:14] Customer: Oh, so I need to do a right-click.
[00:03:17] danmaninc: Yup.
[00:03:18] Customer: Highlight.
[00:03:19] Customer: Oh, nice.
[00:03:24] Customer: [inaudible] Nice.
[00:03:27] Customer: And clear, what does clear do?
[00:03:30] Customer: Confirm action, are you sure you want to clear the…
[00:03:30] Customer: Or no, I don't want to.
[00:03:35] Customer: Sorry.
[00:03:35] Customer: Thank you for the verification.
[00:03:42] danmaninc: I would also like to ask a question regarding the highlighting.
[00:03:42] danmaninc: So, basically, should we limit the number of highlighted blocks?
[00:03:42] danmaninc: Right now, we limited it to one block, so if you try to highlight some other block, it will remove the other highlighting.
[00:04:01] Customer: Yeah, I like that.
[00:04:01] Customer: I don't think…
[00:04:07] Customer: Yeah, I don't think we should let people highlight [inaudible].
[00:04:07] Customer: I think it has to be a deliberate thing.
[00:04:07] Customer: I like it.
[00:04:15] Customer: And we probably should sell it as a feature.
[00:04:18] Customer: Like, you can draw attention to one thing with all the participants.
[00:04:18] Customer: If you want to draw attention to multiple things, then…
[00:04:30] Customer: I mean, what am I looking at?
[00:04:33] Customer: So, yeah, I like it.
[00:04:33] Customer: I like that it's that kind of feature, so I can highlight, and, yeah.
[00:04:43] Customer: So if I just click on it, it shows me, but if I want, like, okay guys, this is what I'm reading, and… okay.
[00:04:43] Customer: Yeah.
[00:04:43] Customer: Otherwise, if you click multiple, then we're having more problems.
[00:04:58] Customer: So, yeah.
[00:04:59] Customer: I like that.
[00:05:00] Customer: That's really cool.
[00:05:05] danmaninc: Okay, so we have also implemented using our earlier conversations, so you may see here the block with [inaudible]
[00:05:16] danmaninc: I just asked the AI about the Ninja Turtles.
[00:05:16] danmaninc: Firstly, it generated some text about it, and then I connected it to another AI block and asked what it knows about the conversation.
[00:05:32] danmaninc: [inaudible]
[00:05:37] danmaninc: Ninja Turtles, and also linked to the block.
[00:05:37] danmaninc: Also…
[00:05:42] danmaninc: I asked whether it had some messages or just a summary of them, and it said that it has the raw messages and also a concise summary.
[00:06:00] Customer: Okay, and you can delete the message, like, any message.
[00:06:00] Customer: Interesting.
[00:06:06] danmaninc: Yeah, yeah, you may delete it, but it will also ask you for confirmation of this action.
[00:06:13] Customer: Okay, nice.
[00:06:15] Customer: Okay, cool.
[00:06:18] danmaninc: Yeah, and also, as you asked about the deletion of the blocks, we added the confirmation for this as well.
[00:06:27] Customer: Yeah, that's good, that's good, yeah.
[00:06:32] danmaninc: And also, if we have a very, very long conversation here, not all of its messages will be sent to the LLM; it will send only the summary.
[00:06:32] danmaninc: So I connected this long conversation to [inaudible] and asked what it knows about the conversation.
[00:06:32] danmaninc: It said, I have a summary, and it only has access to the summary, because.
[00:07:02] Customer: Mm.
[00:07:03] danmaninc: It will be too much for the context.
[00:07:06] Customer: And how do you determine if it's too much?
[00:07:12] Customer: Like, what's the cutoff?
[00:07:15] danmaninc: Currently, we limit it by the overall number of characters used in the conversation.
[00:07:21] danmaninc: Like, if the length of characters, the number of characters in the whole conversation, including user messages and AI messages, exceeds, currently it's 6,000 characters.
[00:07:37] Customer: Okay, okay, so…
[00:07:38] danmaninc: We send the summary.
[00:07:40] Customer: Yeah, it would be nice to kind of signal that to the user, because right now the user doesn't know.
[00:07:47] Customer: Right?
[00:07:47] Customer: A reasonable assumption from the user is that you send everything.
[00:07:57] Customer: I agree with you that there's no point in sending everything.
[00:07:57] Customer: If I wanted some part, I would copy-paste things into different windows or different boxes.
[00:08:13] Customer: But I like the idea of a summary.
[00:08:13] Customer: We should somehow signal it.
[00:08:19] Customer: Or are you doing it because, like…
[00:08:22] danmaninc: I agree with you, because I also asked the LLM whether it had the whole conversation or the summary.
[00:08:29] danmaninc: I also did not have a way to check it precisely from the app.
[00:08:29] danmaninc: I just needed to ask the LLM, or trace which context it has.
[00:08:42] danmaninc: So, yeah.
[00:08:43] danmaninc: I agree with you.
[00:08:48] Customer: Yeah, that's fine.
[00:08:48] Customer: So far, all the features that we wanted to do, what we were talking about, as far as I remember, yeah, they're covered.
[00:08:59] Customer: I see that you are drawing a diagram.
[00:09:04] Customer: Right?
[00:09:05] danmaninc: If I ask the LLM to draw a diagram, it will draw the diagram.
[00:09:15] danmaninc: So basically, it will output some code here.
[00:09:19] danmaninc: It may be copied.
[00:09:21] danmaninc: Also, it may be collapsed if it is too long.
[00:09:25] danmaninc: So it will show this diagram.
[00:09:25] danmaninc: Also, about collapsing: if the LLM outputs some other text along with the diagram, it will not be collapsed; it will collapse only the diagram code.
[00:09:40] Customer: Now I see, the code is here, you're doing it right inside the conversation, right?
[00:09:40] Customer: So you're showing the diagram that the LLM produced.
[00:09:55] danmaninc: Also, if you click on it, it will display in a modal window, on the full screen, if the user wants to look closely at the diagram.
[00:10:05] danmaninc: If this would be…
[00:10:08] Customer: Okay, I see a diagram.
[00:10:09] danmaninc: And the code also.
[00:10:17] Customer: Okay.
[00:10:17] Customer: Well, yeah, that's nice.
[00:10:22] Customer: I guess I need to create a board and experiment with it and see what's going on, and how useful it is.
[00:10:22] Customer: Yeah, that's cool.
[00:10:36] danmaninc: And yeah, you may also add the…
[00:10:40] danmaninc: Yeah, but it also says images.
[00:10:43] Customer: Oh, so I can just… and it adds… but it doesn't… oh, I see, okay.
[00:10:48] Customer: I messed up.
[00:10:50] Customer: Oh, okay, interesting.
[00:10:53] Customer: But then how do I… and I can delete it, I see.
[00:11:01] Customer: So, yeah, okay, I got it.
[00:11:01] Customer: That button just adds Yeah, so I could use it…
[00:11:11] Customer: You add it to the board, well, that's cool, I like it, yeah, and…
[00:11:16] Customer: I figured it out.
[00:11:16] Customer: So, there's a button, yeah, and then you can roll it up, yeah, we talked about rolling it up, and can see the whole thing, and if I…
[00:11:32] Customer: Double-click on it, I see it, I just double-clicked on that image that I created, and I see the diagram, and I see the code, and…
[00:11:44] Customer: Right now, I cannot change the code, but I can see it.
[00:11:49] Customer: Okay.
[00:11:57] Customer: Yeah, that's pretty neat.
[00:11:57] Customer: I like it.
[00:12:01] danmaninc: Also, I would mention that we have some possibility of connecting this block, but right now the images and the code are not consumed by the LLM.
[00:12:14] danmaninc: But I guess we may support this, especially when it is not just the plain image, it is also the code, so basically I can just send the code to the LLM.
[00:12:14] danmaninc: It may be more efficient.
[00:12:32] Customer: Yeah, let's just send only…
[00:12:32] Customer: For now, let's send only code.
[00:12:32] Customer: Images would be nice, and yeah, it would be interesting, but I think we would need to mess with different providers and all that stuff, so yeah, let's just do code for now.
[00:12:54] Customer: [inaudible]
[00:12:56] Customer: I wanted to ask, have you guys used it with anyone else?
[00:12:56] Customer: With your classmates, or coworkers, or anyone?
[00:13:08] danmaninc: Right now, no, but we plan to.
[00:13:08] danmaninc: We would like to conduct some session, that will aim to receive quality feedback, I guess.
[00:13:08] danmaninc: So we also wanted to discuss it with you, like, which goal we should pursue in this validation session with other members.
[00:13:40] Customer: Well, let's look back at our goal.
[00:13:40] Customer: What was our goal for the project?
[00:13:40] Customer: It's to validate some things.
[00:13:40] Customer: Do you remember what it was?
[00:13:53] danmaninc: As far as I remember, it is about validation of whether the usage of context will be usable here for brainstorming.
[00:14:07] Customer: Oh, I can type here.
[00:14:07] Customer: Our goals, and so what was the first one for the project?
[00:14:20] danmaninc: For this project, as I remember, it is… building… just one second.
[00:14:31] Customer: It should be somewhere in the repository, shouldn't it?
[00:14:35] danmaninc: Yeah, let me check here.
[00:14:39] danmaninc: Okay.
[00:14:56] danmaninc: No, it's not here.
[00:15:14] danmaninc: I remember that we wrote this in a document.
[00:15:19] danmaninc: Yeah, I found it.
[00:15:19] danmaninc: The goal is to verify whether and to what degree a shared board solves the problem of teams losing context when they share relevant queries and results.
[00:15:33] danmaninc: So, build the shared board that allows sharing context with LLMs, and verify whether it may solve this problem.
[00:15:47] Customer: Does our app help manage [inaudible]
[00:16:04] Customer: [inaudible]
[00:16:14] Customer: [inaudible] context, [inaudible] brainstorming.
[00:16:14] Customer: Okay…
[00:16:30] Customer: Okay, so let's have that.
[00:16:30] Customer: We have another AI…
[00:16:30] Customer: Can I use this?
[00:16:40] Customer: [inaudible]
[00:16:46] Customer: Okay, and then we're going to connect this… and And…
[00:17:08] Customer: [inaudible] is in the artifact.
[00:17:12] Customer: Awesome.
[00:17:15] Customer: [inaudible]
[00:17:23] Customer: [inaudible] our goal.
[00:17:31] Customer: [inaudible]
[00:17:35] Customer: That we can do.
[00:17:38] Customer: I'll see, I mean, it's working.
[00:17:41] Customer: Support managing LLM data [inaudible] during the brainstorming capture session.
[00:17:48] Customer: Input and LLM outputs in a structure.
[00:17:53] Customer: Okay, yeah, so it doesn't have the context of our app, that's why it says, like, tag each entry with a topic, so the user can retrieve their snippets.
[00:18:05] Customer: Provide visual grouping, show connections and quick add.
[00:18:12] Customer: Export selected context documents [inaudible].
[00:18:18] Customer: Okay, so, in your words, is this useful, or what do you think?
[00:18:34] Customer: We're actually trying the session right now, to verify and see if we can use the elements here.
[00:18:34] Customer: So maybe, okay, so the plan, the way I saw it.
[00:18:57] danmaninc: I guess it did not get that it should test with real users.
[00:18:57] danmaninc: It just thought that we need to somehow support.
[00:19:11] Customer: Oh, yeah.
[00:19:12] danmaninc: Where is the context?
[00:19:13] Customer: Yeah, okay, test on real users.
[00:19:13] Customer: I like that.
[00:19:23] Customer: Okay, and let's do it this way.
[00:19:28] Customer: And, oh, look… delete all this, maybe we can clear.
[00:19:28] Customer: Is there… oh yeah, there's a clear thing.
[00:19:38] Customer: I want to copy the prompt.
[00:19:43] Customer: I guess there's no way to rerun it, but okay, I'll just copy it.
[00:19:52] Customer: Let's save it in another text box, a history box.
[00:19:59] Customer: I'm missing the box.
[00:20:02] Customer: Oh yeah, here it is.
[00:20:03] Customer: So that's going to be our prompt.
[00:20:06] Customer: Prompt.
[00:20:09] Customer: [inaudible]
[00:20:13] Customer: So, just in case we need to remember that, we're not going to connect it, because it's a prompt.
[00:20:18] Customer: But I'll delete this, confirm…
[00:20:22] Customer: And let's see if we get a better result.
[00:20:26] Customer: [inaudible]
[00:20:32] Customer: Well, yeah, regardless of what it answered, but… it's better to find context, cool.
[00:20:42] Customer: Implement context.
[00:20:44] Customer: [inaudible]
[00:20:46] danmaninc: Oh, the prompt, I guess, is not connected.
[00:20:50] Customer: Well, yeah, I didn't connect it, on purpose.
[00:20:52] danmaninc: Because…
[00:20:52] Customer: I copy-pasted, I don't know, I don't know, we could just run the prompt, or rerun it, but it's for later.
[00:20:52] Customer: I'm just trying to use the app in whichever way I can to understand it, right?
[00:20:52] Customer: That's what we're doing, this first user study.
[00:21:14] Customer: That's what.
[00:21:14] danmaninc: [inaudible]
[00:21:16] Customer: Maybe my idea was, this is too complicated, but let me create another box here, so… you have two groups, two groups [inaudible] and all our goals.
[00:21:40] Customer: Right, and then one group, one group…
[00:21:49] Customer: [inaudible]
[00:21:54] Customer: Maybe Telegram?
[00:21:54] Customer: Like, I don't know, some messaging.
[00:22:01] Customer: Telegram.
[00:22:05] Customer: And the other…
[00:22:11] Customer: Users use your app, when brainstorming, when brainstorming.
[00:22:11] Customer: You will need to have a survey, kind of a post-survey…
[00:22:33] Customer: Maybe a pre-survey, but for sure, after.
[00:22:38] Customer: Alright, any of the surveys, or…
[00:22:44] Customer: A survey that you ask both groups.
[00:22:50] Customer: We probably will want to time them.
[00:22:56] Customer: You will want to look at the results, evaluate them, and yeah, that would give you something that would either support your assumption or kind of deny it.
[00:22:56] Customer: Of course, you don't need to run a lot of experiments, this is just, like, interesting as an approach.
[00:22:56] Customer: I would say that the survey is more important.
[00:23:36] Customer: Like, what was the blocker?
[00:23:36] Customer: Were you able to convey what you wanted, were you able to use the LLM, what about the results, and stuff like that?
[00:23:36] Customer: You probably want to think about this, how to make that survey.
[00:24:01] Customer: Yeah, and based on that, either confirm or deny this option.
[00:24:07] Customer: Does that make sense?
[00:24:10] danmaninc: Like, receive some quality of data, just basically, I forgot how it is called, like, [inaudible].
[00:24:24] Customer: Impression?
[00:24:25] danmaninc: Impression, yeah, user impression, and whether it helps them.
[00:24:35] Customer: Yeah, yeah, sometimes.
[00:24:38] Customer: It might be difficult to find two groups, but maybe you'll be able to find two groups and say, okay, you have a goal.
[00:24:50] Customer: Like, create…
[00:24:55] Customer: I don't know, give them some task, create an architecture for this some application, and you can use an LLM, and you should brainstorm, and you should be online, oh yeah, participants.
[00:25:16] Customer: [inaudible]
[00:25:20] danmaninc: Should we focus on should the participants be software developers and architects?
[00:25:20] danmaninc: We mentioned previously that we focus on these users.
[00:25:36] danmaninc: [inaudible]
[00:25:37] Customer: Of course, in a perfect world, yes, but I think your participants will be students, so whoever you will be able to find and convince to do it.
[00:25:50] Customer: And while people might be interested in using your app, I don't think people will be interested in just coming up with an architecture for some [inaudible].
[00:26:07] danmaninc: If that happens, we will note it in the limitations.
[00:26:12] Customer: I think so.
[00:26:12] danmaninc: [inaudible]
[00:26:13] Customer: Yes, yes, because, people, right, yes, actually, good point.
[00:26:21] Customer: But it's a novelty, so once the novelty wears off…
[00:26:26] Customer: So yeah, participants must use an LLM and share results.
[00:26:34] Customer: Okay, so… strong.
[00:26:39] Customer: Great.
[00:26:40] Customer: [inaudible]
[00:26:50] Customer: Yeah, [inaudible] share the queries often, and probably one of you, experiment… okay.
[00:27:08] Customer: One of you needs to be present and observe.
[00:27:22] Customer: Sure.
[00:27:23] Customer: Friction points.
[00:27:23] Customer: So, in order to do that, you'll have to have another survey, an observer survey.
[00:27:37] Customer: Sure.
[00:27:45] Customer: [inaudible]
[00:27:47] Customer: No, no.
[00:27:54] Customer: Okay.
[00:28:00] Customer: [inaudible]
[00:28:22] Customer: What's it called?
[00:28:22] Customer: User study, user…
[00:28:36] danmaninc: It's just… system usability score.
[00:28:40] danmaninc: Or…
[00:28:41] Customer: Usability, yeah, usability, yeah, usability study, right.
[00:28:46] danmaninc: Oh, okay.
[00:28:48] Customer: Okay.
[00:28:52] Customer: [inaudible] usability study, okay, Let's see.
[00:29:04] Customer: Come on.
[00:29:15] danmaninc: That's kind of an interesting challenge here, I guess.
[00:29:30] Customer: Oh, yeah, It's interesting that it's, like, not sure if I like the way it formats, maybe it's one thing we need to fix, because you see it, there's 1, 2, 3 somewhere, then it starts 4, then 5 is lost somewhere.
[00:29:53] Customer: So it's not as easy to read the output.
[00:29:57] danmaninc: I believe we should support some basic formatting, like, for example, for instance, basic Markdown syntax, simple things like numbered and unnumbered lists.
[00:30:11] Customer: Yeah, yeah, yeah, you're right.
[00:30:15] Customer: Yeah, because it's really hard, I see this and I'm like, oh, I have to read.
[00:30:19] danmaninc: Now.
[00:30:21] Customer: So users who brainstorm in their usual chat platform.
[00:30:21] Customer: Users, okay, that's what we said.
[00:30:21] Customer: Ask participants to complete a standard brainstorm and generate ideas for…
[00:30:36] Customer: And I want to ask, observe the assessment.
[00:30:39] Customer: [inaudible]
[00:30:47] Customer: Okay, sure.
[00:30:51] Customer: Survey, how do you spell survey?
[00:30:54] Customer: [inaudible]
[00:30:57] Customer: Hey, can you generate a survey for the… it'll…
[00:31:08] danmaninc: I see a pretty interesting thing in point six, analyze quantitative data on ideas.
[00:31:15] Customer: Yeah, it's not the brightest AI.
[00:31:20] danmaninc: Can we quantify the ideas?
[00:31:31] Customer: Well, yeah, it does have some formatting.
[00:31:40] Customer: [inaudible] task performance, idea relevance, idea novelty…
[00:31:52] Customer: Yeah, the result, I guess, the smartness of the LLM is not the point here, it's the process, the usefulness.
[00:32:03] Customer: So let's say I find something like ease of use.
[00:32:12] Customer: Right, so I take that, and I say, I like that one, so I'll just copy that part.
[00:32:12] Customer: I'll create another text I'll go here, and I'll put the text, and I'll say, okay, guys, here, check out this part, what do you think?
[00:32:45] Customer: Right, because I highlighted the text.
[00:32:48] Customer: And we can go and…
[00:32:56] Customer: Deal with the chunk, we can…
[00:33:04] Customer: Very difficult, very easy.
[00:33:04] Customer: I don't know if we can have our AI saying…
[00:33:13] Customer: Let's do it this way.
[00:33:13] Customer: That's interesting, so there's a pattern here: you do some kind of text, you connect.
[00:33:20] Customer: [inaudible]
[00:33:33] Customer: Right.
[00:33:35] Customer: It's of use…
[00:33:45] Customer: Agreed.
[00:33:47] Customer: So I do this, and then I do another one.
[00:33:54] Customer: Right.
[00:33:56] Customer: Say, okay, so these are problems, let's say.
[00:33:56] Customer: Problems… this can be best practices…
[00:34:12] Customer: I can connect that.
[00:34:15] Customer: And then I can say, [inaudible] practices…
[00:34:15] Customer: I don't even need to say it, because it should be in there.
[00:34:29] Customer: Here are some best practices for evaluating and improving ease of use.
[00:34:35] Customer: For their evidence…
[00:34:35] Customer: I'm going to do another AI…
[00:34:51] Customer: Contradictions.
[00:35:10] Customer: [inaudible]
[00:35:18] Customer: Okay, yes, there are a few contradictions.
[00:35:18] Customer: The best-practices list urges minimal step feedback for each design, whereas the survey measurement critique points out that surveys often ignore complex work.
[00:35:31] Customer: Oh, it can be biased by the [inaudible].
[00:35:31] Customer: It's not clear how that contradiction…
[00:35:38] Customer: This creates tension.
[00:35:38] Customer: You want to simplify the UI, but you also need to capture how users actively navigate a multi-step process.
[00:35:49] Customer: That's cute.
[00:36:00] Customer: Right.
[00:36:08] Customer: [inaudible]
[00:36:17] Customer: Yes.
[00:36:35] Customer: Okay, I guess… maybe.
[00:36:38] Customer: So yeah, that's…
[00:36:44] Customer: That's what I meant, like, you could do Right, so some of the use cases: we generated some stuff, we copy-pasted it, we asked the LLM about it, we put things together from both outputs, and kind of do it this way.
[00:36:44] Customer: Does it make sense?
[00:37:11] danmaninc: Hmm, I guess, kind of yes.
[00:37:11] danmaninc: There's…
[00:37:17] danmaninc: We need to prepare some use cases that will involve the LLM here.
[00:37:24] Customer: No, no, so I did two things.
[00:37:24] Customer: One, I was using your app, I was the user, and seeing if it works, if I could do something that I wouldn't be able to do without it.
[00:37:35] Customer: And I was trying to brainstorm by myself, to kind of come up with ideas for how you can support your idea, or just prove that it helps.
[00:37:56] Customer: But, subjectively, already, I can say that it even helps me think, because there are visual elements here, and the LLM connected.
[00:38:08] Customer: I can visually think through this part.
[00:38:17] Customer: So, I think it's already helpful.
[00:38:17] Customer: But maybe you could try it on individuals or groups.
[00:38:17] Customer: Groups would be better, because that was the point, right?
[00:38:17] Customer: It's like working with a group.
[00:38:17] Customer: Right now, I guess it didn't work out, because you guys were not sure what I was trying to do.
[00:38:38] Customer: Right, and just let me figure it out, but if everyone knows, everyone on the team knows what we're trying to brainstorm, they should be able to do it.
[00:39:03] Customer: Okay.
[00:39:08] danmaninc: Okay.
[00:39:19] Customer: Did any of you check if this functionality is available, for example, in Figma, or they don't do that kind of stuff?
[00:39:30] danmaninc: We did not consider Figma as a direct competitor here.
[00:39:43] danmaninc: We considered including it as a product alternative, but we did not include it.
[00:39:50] Customer: Okay, but yours is already better because it's simpler, it doesn't do everything else, it's focused on that, and everything is around it.
[00:39:50] Customer: So it's already better, even if they do provide this.
[00:39:50] Customer: I was just curious.
[00:40:07] danmaninc: As far as I remember, they have FigJam, which is also a board that may be connected, very similar to this one, but it does not have this feature.
[00:40:21] Customer: Okay, well, I think…
[00:40:21] Customer: I mean, that's just really cool.
[00:40:26] Customer: I think for what you have, of course, you have more features, and you could add, you can manage, but I think, for educational purposes, it would be good if you started pushing into a usability study and tried to set it up, because it takes quite a bit of time.
[00:40:26] Customer: You first have to set everything up, you have to come up with a survey, you have to run it all with someone.
[00:40:26] Customer: You need to…
[00:41:06] Customer: And then you will realize that you forgot something, then you might need to rerun it.
[00:41:06] Customer: So, in terms of how long it takes, how much time it takes?
[00:41:16] Customer: It's longer than you think, by, like, three times.
[00:41:21] Customer: And usually, in this class, we don't have that much time to do a usability study.
[00:41:21] Customer: But you already have enough features to kind of try and do that.
[00:41:46] danmaninc: Okay, I would also like to clarify, did I get it right, that we need to during the usability study, provide some feature to brainstorm on to the users, like, ask them to brainstorm on some feature?
[00:42:06] Customer: Yeah, not a feature, maybe on some kind of problem that they must solve using an LLM, and preferably it generates some kind of graphics.
[00:42:19] Customer: Like, they have to generate a chart.
[00:42:24] danmaninc: So, ideally, yeah.
[00:42:26] Customer: Yeah, ideally some kind of architectural problem.
[00:42:32] danmaninc: Okay.
[00:42:33] danmaninc: And also… yeah.
[00:42:35] Customer: Yeah, go ahead, go ahead.
[00:42:37] danmaninc: Ideally, I guess, the control group also, if it is possible, but if not, then…
[00:42:45] Customer: Yeah, yeah.
[00:42:47] Customer: Yeah, yeah, the control group.
[00:42:49] Customer: I think it will tell you a lot about what your app provides, even.
[00:42:49] Customer: My points are: observe both groups.
[00:43:04] Customer: Don't help them, don't do anything, just observe what they do.
[00:43:11] Customer: And, on top of that, surveying: giving them, after they've achieved some task, giving them a survey, like, how easy it was, or whatever things you come up with.
[00:43:26] Customer: Also, have a survey for the observer.
[00:43:30] Customer: So, some things that you want to capture, and you need to kind of think about it.
[00:43:36] Customer: And by itself, you can do it in your team, basically, you can brainstorm using your own app and see what you can do, and ask the LLM, and then you will feel some problems, and just use them as a backlog.
[00:43:36] Customer: Don't try to improve it at this point.
[00:43:55] Customer: But so you also kind of try it yourself.
[00:43:55] Customer: And then give it to other users and see how fast they can figure it out.
[00:44:07] Customer: Like, what's the difference between using your app and not using your app.
[00:44:13] Customer: It would also be very interesting to see.
[00:44:22] danmaninc: Alright, okay.
[00:44:26] danmaninc: Okay.
[00:44:28] danmaninc: Also, I would like to… like, we have currently the following things, we have the stories about highlighting, using, sharing, and oh, sorry.
[00:44:28] danmaninc: We have getting images from the LLM onto the board, and reference documents, that go into this sprint, the next stories that we'll show you at the next meeting, we plan to do it.
[00:45:06] Customer: Okay, yeah.
[00:45:06] danmaninc: Do I get you right that we consider them as nice to have, but we consider that we cover the essential features of the product, so we can also switch to the usability study.
[00:45:28] Customer: Yeah, yeah.
[00:45:31] Customer: And, as you see, there's a conflict between me as a customer and me as a teacher.
[00:45:31] Customer: Of course, as a customer, I want more features, but as an instructor, I know you will be able to spin out features.
[00:45:31] Customer: You've already shown it, you've already proven that you're fine, you can work on this app until you're done with university, right?
[00:45:31] Customer: For another year.
[00:45:31] Customer: And you'll be spinning out features, 100%, no problem.
[00:46:09] Customer: But, for you, it would be more beneficial if you do a different kind of important work, not only creating features, but also retrospecting on what you've done and analyzing how users react to it, like, creating a survey, showing it to the users, collecting data from them when they filled out the survey.
[00:46:09] Customer: It's not little, it's the type of work that is very different from just another tech feature, I think.
[00:46:58] Customer: [redacted]
[00:47:14] Customer: So, that type of work you could do in here as well, to kind of inform and learn from it.
[00:47:24] Customer: So, yeah, something you build, and then how do you validate that build with users?
[00:47:45] Customer: Okay.
[00:47:46] danmaninc: Also, like…
[00:47:51] danmaninc: But we should also demonstrate to you the analytics dashboard, collect some analytics and telemetry and put it in the dashboard and show it to you, but right now we have not prepared it yet.
[00:47:51] danmaninc: We need more time to do this.
[00:48:12] Customer: Yeah.
[00:48:12] Customer: Yeah, analytics, yeah.
[00:48:12] Customer: Yeah, analytics is good when you're doing a usability study later.
[00:48:22] danmaninc: No.
[00:48:23] Customer: It will help you, it's one of the steps.
[00:48:23] Customer: It's part of the course.
[00:48:27] Customer: And that's why we're taking you through it, and saying, okay, now set up analytics, a dashboard, and then later you'll be able to use it in your usability study.
[00:48:27] Customer: I kind of jumped ahead, because I see you guys doing great on features.
[00:48:44] Customer: And you're good on, from what I see, on processes, everything that you promised last week you delivered this week.
[00:48:44] Customer: Again, I want to highlight you don't need to create a ton of stuff, but promising a promising amount of work and delivering it in that given time.
[00:49:12] Customer: Even if it's a little bit…
[00:49:14] Customer: It's good, it's what we were looking for, we're not looking for amazing performance, like, billions of features per second.
[00:49:25] Customer: We're looking for what you promised and what you delivered to match.
[00:49:28] Customer: And that's great, that's what we wanted to see.
[00:49:35] Customer: And that's why I kind of started insisting that let's look into the analytics, not analytics, but the usability study, but you're right, one step.
[00:49:47] Customer: To get to the usability study, we set up analytics first.
[00:49:58] Customer: Should we confirm things?
[00:49:58] Customer: Because I see here, like, share LLM diagram on the board.
[00:49:58] Customer: That's done, right?
[00:49:58] Customer: We're done.
[00:50:06] danmaninc: Yeah, yeah, yeah.
[00:50:06] danmaninc: We would like also to… yeah.
[00:50:12] danmaninc: Basically highlighting…
[00:50:15] Customer: Yeah, so it's done.
[00:50:20] Customer: [inaudible] given an element on the board…
[00:50:20] Customer: I remember [inaudible] highlighted, everyone, yep, we can check it, given the member sees it highlighted [inaudible].
[00:50:20] Customer: So, yeah, all those things you can check.
[00:50:31] Customer: Check the box.
[00:50:32] danmaninc: Okay, so it's accepted.
[00:50:36] Customer: Yes.
[00:50:41] danmaninc: Alright, then, using earlier answers as context that…
[00:50:49] Customer: Yeah, it seems like it worked.
[00:50:49] Customer: The model wasn't the brightest model, but it's fine.
[00:50:56] Customer: It did figure it out, when I was messing with it, right, I generated two LLM answers and it seemed like it found some contradiction.
[00:51:09] Customer: So, supposedly, it had both.
[00:51:12] Customer: Oh, I think it works.
[00:51:15] danmaninc: It's kind of a challenge to get some very good thinking model for free.
[00:51:23] Customer: Yes, yeah, I know, that's… and, yeah.
[00:51:26] Customer: Sorry.
[00:51:32] danmaninc: Also, sharing LLM diagrams on the board.
[00:51:37] Customer: Yeah.
[00:51:39] danmaninc: Absolutely.
[00:51:39] Customer: [inaudible]
[00:51:40] danmaninc: [inaudible]
[00:51:42] Customer: Yeah, it worked, I saw it, there was a button, and switched to code, and it's cool how you added it to the board.
[00:51:42] Customer: I could add it to the board.
[00:51:55] Customer: It would be nice if it could be used as context.
[00:52:00] Customer: Or another thing, but again, if you feel like making this feature, that's fine.
[00:52:07] Customer: If not, I would say focus on the analytics and the usability study.
[00:52:14] danmaninc: Okay, we will consider this option.
[00:52:24] danmaninc: And then… oh, so there's another story about working with long text.
[00:52:34] danmaninc: Like an AI block.
[00:52:35] danmaninc: As you mentioned previously, we can see the whole text block here.
[00:52:44] danmaninc: And you can edit here.
[00:52:47] Customer: Yeah.
[00:52:49] Customer: Yeah, that's good, that works.
[00:52:49] Customer: One thing about it is that you probably want to support formatting, like Markdown, simple Markdown formatting that LLMs produce, because it's hard to go over it when it's just displayed as text.
[00:53:15] danmaninc: Yeah, I guess it's another user story, probably, not this one.
[00:53:21] Customer: Yeah, yeah.
[00:53:21] danmaninc: [inaudible]
[00:53:26] danmaninc: So let me accept this.
[00:53:28] Customer: Sure.
[00:53:36] danmaninc: And that's about it, about the stories.
[00:53:42] danmaninc: Yep.
[00:53:45] Customer: Okay, so what are you planning for next week?
[00:53:49] danmaninc: For next week, during this week, we will work on the reference documents and images, we plan to do this, but also, I guess, we'll switch more, we'll do more focus on the usability study and analytics, like…
[00:54:10] Customer: Yeah, yeah, man.
[00:54:11] danmaninc: [inaudible]
[00:54:12] Customer: Yeah.
[00:54:13] danmaninc: Next week, we also plan to work on features like accounts and exporting the board.
[00:54:26] Customer: Let's push it back, having an account, yeah, it could have, it's very one of those could-haves that you really want to build.
[00:54:40] Customer: But I think the usability study is more important than having an account.
[00:54:48] danmaninc: That we will just conduct this usability study by focusing.
[00:54:53] Customer: Or something.
[00:54:53] danmaninc: [inaudible]
[00:54:55] Customer: Yeah, yeah, than having an account, because, if you start building accounts and permissions, like, really, I will see you next year.
[00:55:06] Customer: There are so many different ways and choices and things to do, and [inaudible]
[00:55:16] Customer: Yeah.
[00:55:20] Customer: Okay, okay.
[00:55:33] danmaninc: Okay.
[00:55:35] danmaninc: Also, maybe I may briefly show you this I think, as we mentioned in previous weeks, that we also needed to show you the architecture decisions that we had made.
[00:55:52] danmaninc: That we made.
[00:55:52] danmaninc: So, we have this diagram.
[00:55:52] danmaninc: We have the frontend, the Nginx, and the backend.
[00:56:03] danmaninc: It communicates with the database.
[00:56:03] danmaninc: The database we chose for this one is SQLite.
[00:56:03] danmaninc: Currently.
[00:56:11] danmaninc: Maybe it will be migrated to another database in the future, but not at this stage right now.
[00:56:20] danmaninc: So we chose it for the simplicity here.
[00:56:27] danmaninc: And also the LLM service provider here.
[00:56:30] Customer: Yeah, you didn't have an architecture course yet, you'll have it next semester.
[00:56:38] Customer: But, one thing…
[00:56:45] Customer: So… yeah, people confuse a diagram with architecture.
[00:56:54] Customer: A diagram can represent an architecture, but not every diagram is an architecture.
[00:57:05] Customer: And if you can avoid using diagrams, do it.
[00:57:05] Customer: If you can write things in just plain text, saying, oh, we have a Python backend, we have an Nginx gateway in front of it, and then there's a frontend written in React, that talks to our backend, and our backend has a database, SQLite, and then goes to an LLM server.
[00:57:05] Customer: That way it's easy to read, you don't need any kind of arrows and things.
[00:57:56] Customer: It's better that way.
[00:57:58] Customer: If you find that explaining some kind of concept is very hard in words, and it would be easier to show a picture, then you use a picture.
[00:58:15] Customer: And then you think about, you have this deliberate step of what kind of diagram would represent my problem better.
[00:58:15] Customer: Maybe I need different perspectives to represent the problem.
[00:58:34] Customer: So, go to diagrams only when you can't, when the words are confusing, or the concept you're explaining is too wordy, it's just easier to show a picture.
[00:58:34] Customer: So what it does, it gives your picture a purpose.
[00:58:59] Customer: And if your picture has a purpose, then immediately, whoever looks at your picture sees it.
[00:58:59] Customer: Otherwise they ask, why am I looking at this picture?
[00:59:11] Customer: And if your picture has a purpose, then, yeah, I understand, they're showing me some kind of part of some kind of mechanism, like a login or something.
[00:59:24] Customer: And then I understand, I'm like, oh, okay, I'll look deeper.
[00:59:28] Customer: But if your diagram doesn't have a purpose, the only purpose of your diagram is to be a diagram, then it makes whoever looks at the diagram confused.
[00:59:28] Customer: They try to understand why they are looking at it, and the only information they can get from it is that there's a frontend, a backend, and a database.
[00:59:58] Customer: And that's it.
[00:59:58] Customer: And people start thinking, you could have told me that just by telling me that.
[01:00:08] Customer: So that's what you will pick up, hopefully, from the architecture class next semester.
[01:00:19] Customer: Yeah, so that's what I wanted to say about diagrams.
[01:00:25] Customer: [inaudible]
[01:00:32] Customer: One container, the backend also serves the frontend, the frontend gateway, the backend, [inaudible] Postgres.
[01:00:40] Customer: So, a database container, but you said that you only have [inaudible], not using Postgres?
[01:00:48] danmaninc: Yeah, we… it's a considered option, but…
[01:00:51] Customer: Oh, considered… oh, yeah.
[01:00:52] danmaninc: Thanks so much.
[01:00:52] Customer: Okay.
[01:00:53] Customer: Okay, okay, cool, cool, cool.
[01:00:55] Customer: Yeah, that's good.
[01:00:55] Customer: Thank you.
[01:00:55] Customer: Yeah, that's nice.
[01:01:00] danmaninc: I guess I'm a little bit out of time.
[01:01:03] Customer: Yeah, sorry, sorry guys, it's just fun working with you.
[01:01:03] Customer: Thank you very much.
[01:01:11] Customer: [redacted]
[01:01:15] danmaninc: Okay, thank you.
[01:01:15] danmaninc: We noticed a lot of good things to work on, so we welcome them.
[01:01:21] danmaninc: Yep.
[01:01:22] Customer: Okay, guys, have a good day.
[01:01:26] Kamil116: Thank you, you too.
[01:01:26] Kamil116: Have a good evening.
[01:01:29] Customer: Thank you, thank you.
