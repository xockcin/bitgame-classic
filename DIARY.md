### 6/14/23

Step 1 - Sandbox - is complete

Next things I do should be:
-refactor buttons so that they are an array.map() situation
-proceed onto step 2, which is Game

addendum: button refactor is done
addendum: proceeded to step 2!

There is now and origin and a goal. It doesn't keep track of your steps and it doesn't tell you when you win. Those, probably latter then former, will be next steps. A few notes:

When-you-win is tricky because bytes are all initialized to zero, which looks like a win, and I am hesitant to initialize them to a random number. But maybe I just should and if it causes a problem I can deal with it later.

Keep-track-of-steps should be easy. But now I need to stop.

### 6/15/23

Step 2 - Game - is complete.

I have not put in Redux yet, and might not. Need to review useContext first.

Next step is Difficulty, which will be a little tricky because I'll need to review and reimplement that algorithm that finds all the answers. For now I will spend some time reading the documentation.

### 6/18/23

Componentized winscreen and gamescreen. The latter has a ton of props, perhaps too many. Should review how reducer and context work.

### 6/21/23

No new code, just a few thoughts:
1. Use Redux instead of useContext. More boilerplate, but better. Use it to store game and token data. Will need to review it. I remember that it's easier than it used to be.
2. Figure out the rules. Bitmoves and peeking should both cost one token each. Getting to a solution should earn you tokens, but the question is how much? There should be a bonus for getting an optimal solution. How much baseline and how much bonus? First step should be to implement tokens. Choose however much for costs. Then play around with it.
3. Figure out how to implement difficulty. Shouldn't be too hard. Use already-existing data if necessary.
4. Declutter program by sorting components into their own files. Move states and functions that alter state into Redux.
5. Make it look good! Use React Bootstrap. Be sure it's responsive.

I expect none of this will get done before the trip to Spain. Start with Redux next time I have time to work on it.