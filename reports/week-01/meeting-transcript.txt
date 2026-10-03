# Kickoff meeting transcript

**Date:** 2026-10-03
**Participants:** Daniil, Kamil, Customer

[00:00:00] Daniil: That way, we get all the notes.
[00:00:00] Daniil: Okay.
[00:00:04] Daniil: In this case, I will ask your permission for publishing the sanitized description in the public repository of the project.
[00:00:13] Customer: Okay.
[00:00:13] Customer: Yeah.
[00:00:13] Customer: Yes.
[00:00:13] Customer: Any sanitized description is fine, and I can even send you a summary or the entire transcript.
[00:00:37] Customer: Okay, we're good to go.
[00:00:37] Customer: Everyone's here.
[00:00:45] Daniil: Is it possible to share the screen?
[00:00:48] Customer: Yeah, of course you can go ahead.
[00:01:00] Daniil: Okay, settings, meeting settings.
[00:01:00] Daniil: It's Zoom, so there are like 50 million settings.
[00:01:00] Daniil: I haven't used Zoom for a while.
[00:01:00] Daniil: Is it very important?
[00:01:58] Daniil: I think we can continue without this.
[00:02:00] Customer: Okay, let's see.
[00:02:00] Customer: I'm going to share.
[00:02:00] Customer: Just give me one more minute.
[00:02:18] Daniil: This is just kind of like visual support with text.
[00:02:33] Customer: Okay, guys.
[00:02:33] Customer: I will probably figure out sharing for all participants here, but it looks like it will take a while to get that set up.
[00:02:33] Customer: I could share mine, but I guess I need to go into things.
[00:02:33] Customer: So let's just talk this way.
[00:02:33] Customer: Maybe you can explain.
[00:02:58] Daniil: So basically, we are team number three, and we are working on a project workspace for AI collaboration.
[00:02:58] Daniil: The description of the project says that it is an infinite whiteboard space with real-time updates for multiple users.
[00:02:58] Daniil: We define the problem space as solving the problem of teams who brainstorm with LLMs but lose context when sharing queries and results.
[00:02:58] Daniil: We believe that they aim for seamless, collaborative visual thinking, where everything stays shared and evolves together.
[00:02:58] Daniil: The main gaps we see from the analysis of alternatives and the problem space are that there is a high friction of context reuse in visual thinking tools.
[00:02:58] Daniil: Alternatives serve context reuse with a smaller variety of collaboration tools.
[00:02:58] Daniil: Some support just working with text, but not with whiteboard tools like drawing, or they provide manual user reuse of objects.
[00:02:58] Daniil: They do not preserve the whole context of the project, so you need to manually select the objects that you need to put in the context.
[00:02:58] Daniil: Also, there is a dependency on the vendor-hosted cloud.
[00:02:58] Daniil: Most alternatives provide only vendor-hosted cloud and require you to trust them to hold your data.
[00:02:58] Daniil: The third gap is poor data portability for spatial relationships.
[00:02:58] Daniil: Editable spatial and vector data are locked in the service, or the export data has poor quality.
[00:02:58] Daniil: You may export mostly text or flat objects like images.
[00:02:58] Daniil: Our main value proposition is that the user should have the ability to reuse the query and results in visual thinking tools to provide simultaneous query and results usage as context.
[00:02:58] Daniil: We also provide control over data, either via self-hosting or configuring the work with data such that the user fully controls how data is stored and may delete or edit it.
[00:02:58] Daniil: Finally, we offer enhanced data portability for structural graphs, providing the ability to export high-quality relationships between cards.
[00:02:58] Daniil: So basically, that's it about the problem space, the gaps, and the value proposition.
[00:06:10] Customer: I just wanted to say that you guys are the first team that met this semester that did their homework right away and looked into the space.
[00:06:33] Daniil: Oh yeah.
[00:06:35] Daniil: Sorry.
[00:06:37] Customer: Yeah.
[00:06:37] Customer: Yeah, I told you, you are the first team that actually did your homework and prepared for the meeting, which is pretty awesome.
[00:06:37] Customer: You already familiarized yourselves with what is going on in the space.
[00:06:37] Customer: I'll just add a couple of examples from what I've seen.
[00:06:37] Customer: I taught a class for a corporate client on software architecture, emphasizing how to use AI in designing architecture.
[00:06:37] Customer: We had exercises where everyone used tools like ChatGPT or DeepSeek to ask questions and get answers and drawings.
[00:06:37] Customer: It was strange because everyone started pasting the results into Telegram to show the team, even though they were in the same room.
[00:06:37] Customer: It looked pretty bad, was very unintuitive, and made it hard to use and merge results.
[00:06:37] Customer: Another general observation is that everyone is using AI tools, but it's hard to share those results with the team.
[00:06:37] Customer: You have your own setup, but there's no way to share what's going on or how to pipe the output into something else.
[00:06:37] Customer: That's where the idea came from, and I thought it shouldn't be very complicated to implement.
[00:06:37] Customer: I've seen attempts where they put a widget on a board for the query and the ChatGPT output is visible to multiple people.
[00:06:37] Customer: People can have their own widgets and use someone else's results right there.
[00:06:37] Customer: This part of the project is also exploratory to find the best way to organize teamwork and bring LLMs or image generation to the table.
[00:06:37] Customer: You don't have to copy-paste images into Telegram; you can organize it in a better way.
[00:06:37] Customer: To summarize, collaborating with AI tools right now sucks, but we can do better.
[00:06:37] Customer: Is it clear, or can you share what you've experienced when sharing AI work with your team?
[00:11:33] Daniil: I think the idea is pretty clear.
[00:11:33] Daniil: You take a block, put the query in a specific block on the board, and everyone can see it including the algorithm's response.
[00:11:53] Customer: Yeah, and maybe we can pipe the result into another element or shorten the answer.
[00:11:53] Customer: Text is fine to copy-paste, but when it gives diagrams, like in Mermaid, you have to find a tool to render it.
[00:11:53] Customer: Then everyone on the team has to go to a website that renders Mermaid and paste it to see it.
[00:11:53] Customer: If we can provide a shared collection of tools to work with the visual output of LLMs, it would be very useful.
[00:11:53] Customer: They give you diagrams in any DSL, and you can draw them on the board for people to add to.
[00:11:53] Customer: The course is 10 weeks, and we need to get a product out, so we can see what you can do.
[00:11:53] Customer: Getting the initial board working with multiple people seeing responses and rendering visual elements would be great.
[00:14:19] Daniil: Okay.
[00:14:22] Customer: Let's try to combine my vision with what you saw in your research and come up with something that interests you.
[00:14:52] Kamil: Yes, indeed, we have a gap in using AI.
[00:14:52] Kamil: Many boards we have seen have good shareability and access levels, but we tested AI and the real problem is in AI usage.
[00:15:13] anton: So it will be our main focus.
[00:15:14] Customer: Yeah, that's the main idea.
[00:15:14] Customer: Tools like Figma are great, but there's a gap where AI is not a team member and it's hard to deal with its outputs on the board.
[00:15:55] Daniil: I have a question about the types of artifacts on the board, like diagrams and images.
[00:15:55] Daniil: What specific types do you usually use during brainstorming?
[00:16:17] Customer: I think some diagrams would be nice, and we can support common ones.
[00:16:17] Customer: I need to look up the most used diagram DSLs, but we don't have to do everything, just a couple as a proof of concept.
[00:16:17] Customer: Diagrams are definitely useful, and images would also be pretty useful if possible.
[00:16:17] Customer: For diagrams, we can just pick one DSL that you think is useful and go with that.
[00:16:17] Customer: Images are also useful because the visual part is very cumbersome to share.
[00:16:17] Customer: You have to copy-paste an image, and if you want to select an area, like saying the people in a generated coffee shop image look weird, you have to highlight it.
[00:16:17] Customer: Then someone else types a better prompt, and we ask an image generation tool to regenerate it based on those inputs.
[00:16:17] Customer: Everyone sees the process right away and can participate.
[00:16:17] Customer: It's similar to working with diagrams, just a different medium.
[00:16:17] Customer: When multiple eyes are on a rendered diagram, people can ask questions or suggest better queries, and you can see both results on the same board.
[00:16:17] Customer: Start with diagrams and try the image use case.
[00:16:17] Customer: There are three use cases: text, diagrams, and images.
[00:16:17] Customer: Start with text, see what can be done, then go to diagrams and images.
[00:16:17] Customer: You can use this to brainstorm ideas, like eating your own dog food.
[00:16:17] Customer: Did I answer your question or confuse you?
[00:20:00] Daniil: I think I understood that it will be enough to provide drawing tools, the possibility to work with diagrams, and try to work with images.
[00:20:18] Customer: Yeah, maybe a simple highlight.
[00:20:18] Customer: You can just put a highlight with your finger, very basic and simple.
[00:20:18] Customer: We don't need different drawing pens, just a simple highlight for text because it's a useful visual clue.
[00:20:18] Customer: If we do any drawing, just to bring attention to a part of a diagram, text, or image, we can stop at that.
[00:21:03] Daniil: Okay, I would also like to ask if you need to share the brainstorming session with external users, or just within your team.
[00:21:22] Customer: Let's focus on the simplest sharing functionality you can provide.
[00:21:22] Customer: We will not think of security or multiple access levels because that rabbit hole is very deep.
[00:21:22] Customer: You could spend 10 weeks just thinking about access levels, and it's a whole project on its own.
[00:21:22] Customer: For this class, let's find the simplest sharing capability to implement.
[00:21:22] Customer: Everyone who is invited has the same rights; if not, they're not invited.
[00:21:22] Customer: Another thing is scalability; we'll assume the team is not more than 10 people.
[00:21:22] Customer: We don't want to support a million people in a session, which you shouldn't be having anyway.
[00:21:22] Customer: I would say the hard limit for simultaneous connections should be 10.
[00:21:22] Customer: Your team shouldn't be bigger than 7 to 10 people for a brainstorming session.
[00:21:22] Customer: If it's bigger, it's something else entirely with different dynamics.
[00:24:05] Daniil: Okay, specifically about the main point of sharing queries, do you use the whole context of the project for new sessions, or share specific sessions as context?
[00:24:30] Customer: I think I saw it as widgets.
[00:24:30] Customer: I don't know how it would work if you share the entire thing.
[00:24:30] Customer: You have an infinite board with queries and responses, and people are doing it in parallel.
[00:24:30] Customer: If you use the whole space as context when someone else is trying something out, the LLM will answer something else and it won't be usable.
[00:24:30] Customer: We should stick context to a widget.
[00:24:30] Customer: If we want to allow more context, we should allow you to connect your widget to other widgets to pull context from.
[00:24:30] Customer: You just point a line from your query to someone else's result to use it as context.
[00:24:30] Customer: Then you control what the context is, rather than including everything on the board.
[00:24:30] Customer: That would be more useful than adding everything to the context.
[00:24:30] Customer: Does that make sense?
[00:26:09] Daniil: To summarize, we can reuse specific queries and sessions, and connect them to define the context.
[00:26:23] Customer: Yeah, we create a new session that uses only the connected blocks, not something extra.
[00:26:36] Customer: As I said, it's an exploratory project, so if you find something else that works better, I'll be happy.
[00:26:36] Customer: So far, I see it as being able to control context explicitly.
[00:27:02] Daniil: Okay, what about privacy and the hosting service?
[00:27:02] Daniil: Is a hosted deployment acceptable, or should we have the ability to self-host?
[00:27:19] Customer: It's fine if you host it.
[00:27:19] Customer: It would be nice if your project described the requirements to host it, like what packages you use.
[00:27:19] Customer: I don't have a specific preference.
[00:27:19] Customer: One more thing about the course is that everything you work on has to be under some kind of open-source license.
[00:27:19] Customer: The reason is that we allow you to use any AI tools, and if some of it is under NDA, using Claude would technically break the NDA.
[00:27:19] Customer: Navigating licenses and NDAs is complex, involves lawyers, and takes months.
[00:27:19] Customer: That's why we ask for an open-source license so we can review the code and you can use coding tools without problems.
[00:27:19] Customer: You can deploy it if you want, but I cannot require it because it costs money for a server.
[00:27:19] Customer: I should be able to bring it up locally to try it.
[00:27:19] Customer: If you host it as a service I can use, that would be even better for a session.
[00:27:19] Customer: But I should be able to deploy it on my computer to validate it.
[00:30:01] Daniil: We will consider hosting the project and provide instructions to make the process as easy as possible.
[00:30:14] Customer: Yes, that's great.
[00:30:17] Daniil: Okay, I think you answered our question about it.
[00:30:17] Daniil: We also had questions about business goals, but I guess you summarized the answers in the first paragraph.
[00:30:17] Daniil: Let me verify that your answers are taken correctly.
[00:30:17] Daniil: You decided to create your own project instead of buying subscriptions because AI collaboration in existing products is not good enough for your goals, right?
[00:30:57] Customer: I haven't seen a good version of AI collaboration.
[00:30:57] Customer: Maybe there are tools I'm not aware of, and you guys can help me with that.
[00:30:57] Customer: But I haven't seen a level where everyone on a team can use AI and share results effectively.
[00:30:57] Customer: I haven't seen a tool where you can share queries, answers, discuss them, and pipe them into another LLM.
[00:31:50] Daniil: Okay, about the current workflow, how do you usually brainstorm with LLMs?
[00:31:50] Daniil: You mentioned putting queries in LLMs and copying and pasting them into Telegram.
[00:32:25] Customer: Yeah, but that's how most people do it.
[00:32:25] Customer: I've seen people try Figma, but Figma is like a spaceship with all the controls.
[00:32:25] Customer: If you're familiar with Figma, maybe, but usually people are not.
[00:32:25] Customer: You want to limit use cases to focus on collaborating, not making things pretty.
[00:32:25] Customer: Figma is great for designers, but those details might obscure the AI or aren't their main focus.
[00:32:25] Customer: Back in the day, you just collaborated on one document, talked, and put summary sentences.
[00:32:25] Customer: Now you have a machine generating a lot of information, and sharing it is very cumbersome.
[00:33:59] Daniil: Okay, about the artifacts, what do you usually demonstrate to other team members?
[00:33:59] Daniil: Do you specifically share prompts, queries, or maybe skills?
[00:34:23] Customer: Skills are just an extra document inputted to the LLM context.
[00:34:23] Customer: You could have a widget with a query, and then a typed or copy-pasted skill from a library.
[00:34:23] Customer: That would be useful, and I haven't thought of that yet.
[00:34:23] Customer: When we go through what's included in the context, it can be added as a text box with a skill.
[00:34:23] Customer: We just connect it to the query, run it again, and see if the result with that skill is different.
[00:34:23] Customer: There are different levels of using AI, and we can go deeper to add more versions of context.
[00:36:06] Daniil: So basically, artifacts consumed by AI may be connected using the same technique by constructing our own context.
[00:36:22] Customer: I think so.
[00:36:22] Daniil: Gotcha.
[00:36:22] Daniil: Is the brainstorming space acceptable, or do you need the possibility to store notes?
[00:36:22] Daniil: You can create text nodes in the whiteboard, but do you need directories with text documents like in Obsidian?
[00:37:01] Customer: I think you're describing ways to export the result of the brainstorm.
[00:37:01] Customer: It's a nice-to-have feature, but I don't think we'll have time for it.
[00:37:01] Customer: If you build an exporting tool, that will be great, but we'll probably just pick one common way like PDF.
[00:37:01] Customer: For this course, focus on the main features, and exporting is just nice to have.
[00:38:04] Daniil: So basically, you suggest we focus on the collaboration itself, sharing context, privacy, and security.
[00:38:09] Customer: Yeah, and sharing.
[00:38:11] Daniil: The context, privacy, and security connections are outside the scope of this project.
[00:38:20] Customer: It's all kind of outside the scope.
[00:38:20] Customer: We just want to validate the process itself to see if it makes sense.
[00:38:20] Customer: Maybe everyone is happy sending Telegram messages, and we cannot propose anything better.
[00:38:20] Customer: We should validate the core idea first, then build the machinery around it later if needed.
[00:38:58] Daniil: So we consider security and export as nice to have.
[00:38:58] Daniil: Guys, look at the features right now.
[00:39:03] Customer: Yeah, security and export are nice to have.
[00:39:03] Customer: If you host it on the public internet, you will have to think about security, or you will learn a lot.
[00:39:03] Customer: I had a team last semester host an app and they got hacked.
[00:39:03] Customer: Their database got encrypted, and they got a ransom message.
[00:39:03] Customer: There was nothing important, but they learned that a public database needs to be secure and not use standard ports.
[00:39:03] Customer: You will discover you need security if you host it publicly, otherwise it won't work.
[00:39:03] Customer: For everything else, just stick to the minimal part for this course.
[00:40:58] Daniil: Okay, gotcha.
[00:40:58] Daniil: When you use context and results, how would you describe the changes in your workflow?
[00:40:58] Daniil: How does it benefit you directly?
[00:41:17] Customer: I don't want to just turn my laptop and bash it when I see 50 million copy-paste things from AI.
[00:41:17] Customer: I have no idea what order they were in or how to understand them.
[00:41:17] Customer: I just want to copy-paste everything into another AI and say "make sense of all that."
[00:41:17] Customer: It's a blocker for a team wanting to brainstorm, even in the same room.
[00:41:17] Customer: What happens is we self-organize and give one person access to the LLM.
[00:41:17] Customer: We send all queries to that person, who copy-pastes and gets the results.
[00:41:17] Customer: That person becomes the aggregator for everything we and the AI generated.
[00:41:17] Customer: Everyone gives up using the LLM and dedicates one person to do it, which is very inefficient.
[00:41:17] Customer: That person gets frustrated with all the information going through them.
[00:41:17] Customer: We basically couldn't use it, and I think it's a problem for all teams trying to use it.
[00:41:17] Customer: This tool will solve the aggregation problem so everyone can use it and aggregate results.
[00:41:17] Customer: It aggregates all information into something everyone can use, take a chunk from, and go off from there.
[00:44:21] Daniil: Would you describe this as one of the annoying parts of brainstorming when using LLMs?
[00:44:41] Customer: Well, yeah, it's the most annoying thing because the team can't use it efficiently.
[00:44:41] Customer: It's about aggregating that information.
[00:44:41] Customer: The LLM is yet another medium, and we have no experience on how to aggregate notes from multiple LLM outputs.
[00:44:41] Customer: We have experience aggregating pictures by drawing on a single board, but not for LLM data.
[00:44:41] Customer: All this data needs to be merged or analyzed, and I hope your tool will do that.
[00:46:11] Daniil: Okay, I guess that's all for my questions.
