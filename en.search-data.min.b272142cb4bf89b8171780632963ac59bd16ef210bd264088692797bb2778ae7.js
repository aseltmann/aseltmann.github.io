"use strict";(function(){const t={cache:!0};t.doc={id:"id",field:["title","content"],store:["title","href","section"]};const e=FlexSearch.create("balance",t);window.bookSearchIndex=e,e.add({id:0,href:"/docs/notes/poetry/",title:"Poetry",section:"Notes",content:` Lǎozǐ # I am partial to the translation of Derek Lin
Dàodéjīng - Chapter 11 (The use of what has no substantive existence) [&hellip;]
Mix clay
to create a container
In its emptiness, there is
the function of a container
[&hellip;]
Therefore,
that which exists is used to create benefit
That which is empty is used to create functionality
Dàodéjīng - Chapter 15 (The exhibition of the qualities of the Dao) The Tao masters of antiquity
Subtle wonders through mystery
Depths that cannot be discerned
Because one cannot discern them
Therefore one is forced to describe the appearance
Hesitant,
like crossing a wintry river
Cautious,
like fearing four neighbors
Solemn,
like a guest
Loose,
like ice about to melt
Genuine,
like plain wood
Open,
like a valley
Opaque,
like muddy water
Who can be muddled yet desist
In stillness gradually become clear?
Who can be serene yet persist
In motion gradually come alive?
One who holds this &lt;i&gt;Tao&lt;/i&gt; does not wish to be overfilled
Because one is not overfilled
Therefore one can preserve and not create anew
Dàodéjīng - Chapter 20 (Being different from ordinary people) Cease learning, no more worries
Respectful response and scornful response
How much is the difference?
Goodness and evil
How much do they differ?
What the people fear,
I cannot be unafraid
So desolate! How limitless it is!
The people are excited
As if enjoying a great feast
As if climbing up to the terrace in spring
I alone am quiet and uninvolved
Like an infant
not yet smiling
So weary,
like having no place to return
The people all have surplus
While I alone seem lacking
I have the heart of a fool indeed -
so ignorant!
Ordinary people are bright
I alone am muddled
Ordinary people are scrutinizing
I alone am obtuse
So tranquil, like the ocean
So moving, as if without limits
The people all have goals
And I alone am stubborn and lowly
I alone am different from them
And value the nourishing mother
`}),e.add({id:1,href:"/docs/projects/",title:"Projects",section:"Docs",content:` Current projects # I am a believer in the principles of Open Science, Open Data and Open Source. Thus, I am currently working on a reproducible way of conducting my research on simulation of Fluorescence Correlation Spectroscopy (FCS) measurements and correcting artifacts using neural networks, such as Convolutional Neural Nets (CNNs). I do not have my workflow fixed yet, but to have an insight in my current approach - and with the principles of Open-notebook science in mind:
Fluotracify - doctoral research project done in a reproducible way
Description: In a current project, we apply Deep Learning techniques on Fluorescence Correlation Spectroscopy (FCS) data to correct a variety of hardware- and sample-related artifacts, such as photobleaching, contamination from additional slow moving particles, or sudden drops in intensity because of detector anomalies.
Conference talks # Seltmann A, Eggeling C, Waithe D. Automated, User-independent Correction of Artifacts in Fluorescence Correlation Spectroscopy Measurements using Convolutional Neural Networks. Quantitative BioImaging Conference (QBI); 2020 Jan 6-9; Oxford, UK `}),e.add({id:2,href:"/posts/aoc2023-day02/",title:"Advent of code 2023 - Day 2: Cube Conundrum",section:"Posts",content:`This year I try to record my attempt at solving the Advent of Code 2023 riddles. This is Day 2 - see https:adventofcode.com/2023/day/2
Part 1 # Lets first read the task:
As you walk, the Elf shows you a small bag and some cubes which are either red, green, or blue. Each time you play this game, he will hide a secret number of cubes of each color in the bag, and your goal is to figure out information about the number of cubes.
To get information, once a bag has been loaded with cubes, the Elf will reach into the bag, grab a handful of random cubes, show them to you, and then put them back in the bag. He&rsquo;ll do this a few times per game.
You play several games and record the information from each game (your puzzle input). Each game is listed with its ID number (like the 11 in Game 11: ...) followed by a semicolon-separated list of subsets of cubes that were revealed from the bag (like 3 red, 5 green, 4 blue).
For example, the record of a few games might look like this:
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green In game 1, three sets of cubes are revealed from the bag (and then put back again). The first set is 3 blue cubes and 4 red cubes; the second set is 1 red cube, 2 green cubes, and 6 blue cubes; the third set is only 2 green cubes.
The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
In the example above, games 1, 2, and 5 would have been possible if the bag had been loaded with that configuration. However, game 3 would have been impossible because at one point the Elf showed you 20 red cubes at once; similarly, game 4 would also have been impossible because the Elf showed you 15 blue cubes at once. If you add up the IDs of the games that would have been possible, you get 8.
Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?
Okay, let&rsquo;s load our python kernel in emacs-jupyter and get coding! First of all, let&rsquo;s load the input and split the riddle code by colon : to extract the game id and the rest of the code by semicolon ; to get the number of sets played in each game.
import pandas as pd import re txt = pd.read_table(&#39;data/2023-12-02-1-aoc.txt&#39;, names=[&#39;code&#39;]) txt[&#39;id&#39;] = txt.loc[:, &#39;code&#39;].str.split(&#39;:&#39;).apply( lambda x: int(x[0].strip(&#39;Game &#39;))) txt[&#39;code&#39;] = txt.loc[:, &#39;code&#39;].str.split(&#39;:&#39;).apply(lambda x: x[1]) # txt[&#39;code&#39;] = txt.loc[:, &#39;code&#39;].str.split(&#39;;&#39;) # txt[&#39;nsets&#39;] = txt.loc[:, &#39;code&#39;].apply(lambda x: len(x)) txt code id 0 1 green, 1 blue, 1 red; 1 green, 8 red, 7 blu... 1 1 9 red, 7 green, 3 blue; 15 green, 2 blue, 5 r... 2 2 3 red, 1 blue, 4 green; 6 red, 3 green, 2 blu... 3 3 2 blue, 2 green, 19 red; 3 blue, 11 red, 16 g... 4 4 8 green, 1 red, 12 blue; 10 green, 6 red, 13 ... 5 .. ... ... 95 2 red, 2 green, 1 blue; 1 red, 4 green; 1 green 96 96 4 red, 5 green; 5 blue, 3 red; 8 blue, 2 gree... 97 97 1 blue; 2 green, 1 red; 5 red, 2 green; 4 red... 98 98 6 blue, 5 red, 2 green; 9 red, 1 blue; 2 gree... 99 99 1 blue, 13 green, 14 red; 11 green, 11 blue, ... 100 [100 rows x 2 columns] Now, let&rsquo;s extract the three colors in different columns with regex. We use the lookahead assertion ?= to find the respective colours and only exctract the digits \\d+ coming before. Then we just keep the max imum drawn number of cubes per color, since this is the only information that matters at the moment.
txt[&#39;green&#39;] = txt.loc[:, &#39;code&#39;].apply( lambda code: re.findall(r&#39;\\d+(?=.green)&#39;, code)).apply( lambda list: max([int(i) for i in list])) txt[&#39;red&#39;] = txt.loc[:, &#39;code&#39;].apply( lambda code: re.findall(r&#39;\\d+(?=.red)&#39;, code)).apply( lambda list: max([int(i) for i in list])) txt[&#39;blue&#39;] = txt.loc[:, &#39;code&#39;].apply( lambda code: re.findall(r&#39;\\d+(?=.blue)&#39;, code)).apply( lambda list: max([int(i) for i in list])) txt code id green red blue 0 1 green, 1 blue, 1 red; 1 green, 8 red, 7 blu... 1 2 10 10 1 9 red, 7 green, 3 blue; 15 green, 2 blue, 5 r... 2 15 10 3 2 3 red, 1 blue, 4 green; 6 red, 3 green, 2 blu... 3 4 6 16 3 2 blue, 2 green, 19 red; 3 blue, 11 red, 16 g... 4 16 20 18 4 8 green, 1 red, 12 blue; 10 green, 6 red, 13 ... 5 10 6 14 .. ... ... ... ... ... 95 2 red, 2 green, 1 blue; 1 red, 4 green; 1 green 96 4 2 1 96 4 red, 5 green; 5 blue, 3 red; 8 blue, 2 gree... 97 5 4 8 97 1 blue; 2 green, 1 red; 5 red, 2 green; 4 red... 98 2 5 2 98 6 blue, 5 red, 2 green; 9 red, 1 blue; 2 gree... 99 2 9 11 99 1 blue, 13 green, 14 red; 11 green, 11 blue, ... 100 13 15 11 [100 rows x 5 columns] Lastly, we just filter the DataFrame to only include games where all drawn cubes were below or equal the number of cubes in the game and sum the result!
txt[&#39;id&#39;][(txt[&#39;green&#39;] &lt; 14) &amp; (txt[&#39;red&#39;] &lt; 13) &amp; (txt[&#39;blue&#39;] &lt; 15)].sum() 3035 Part 2 # First, let&rsquo;s get the instruction from the second part:
As you continue your walk, the Elf poses a second question: in each game you played, what is the fewest number of cubes of each color that could have been in the bag to make the game possible?
Again consider the example games from earlier:
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes. If any color had even one fewer cube, the game would have been impossible. Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue cubes. Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes. Game 4 required at least 14 red, 3 green, and 15 blue cubes. Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag. The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. The power of the minimum set of cubes in game 1 is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively. Adding up these five powers produces the sum 2286.
For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?
Luckily, this task is made trivial by the approach we have taken before. We just have to multiply the green, red and blue columns:
txt[&#39;power&#39;] = txt.loc[:, &#39;green&#39;] * txt.loc[:, &#39;blue&#39;] * txt.loc[:, &#39;red&#39;] txt code id green red blue \\ 0 1 green, 1 blue, 1 red; 1 green, 8 red, 7 blu... 1 2 10 10 1 9 red, 7 green, 3 blue; 15 green, 2 blue, 5 r... 2 15 10 3 2 3 red, 1 blue, 4 green; 6 red, 3 green, 2 blu... 3 4 6 16 3 2 blue, 2 green, 19 red; 3 blue, 11 red, 16 g... 4 16 20 18 4 8 green, 1 red, 12 blue; 10 green, 6 red, 13 ... 5 10 6 14 .. ... ... ... ... ... 95 2 red, 2 green, 1 blue; 1 red, 4 green; 1 green 96 4 2 1 96 4 red, 5 green; 5 blue, 3 red; 8 blue, 2 gree... 97 5 4 8 97 1 blue; 2 green, 1 red; 5 red, 2 green; 4 red... 98 2 5 2 98 6 blue, 5 red, 2 green; 9 red, 1 blue; 2 gree... 99 2 9 11 99 1 blue, 13 green, 14 red; 11 green, 11 blue, ... 100 13 15 11 power 0 200 1 450 2 384 3 5760 4 840 .. ... 95 8 96 160 97 20 98 198 99 2145 [100 rows x 6 columns] And for this one, the sum is:
txt[&#39;power&#39;].sum() 66027 `}),e.add({id:3,href:"/posts/aoc2023-day01/",title:"Advent of code 2023 - Day 1: Trebuchet?!",section:"Posts",content:`This year I try to record my attempt at solving the Advent of Code 2023 riddles. This is Day 1 - see https:adventofcode.com/2023/day/1
Part 1 # Our first task is the following:
The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
For example:
1abc2 pqr3stu8vwx a1b2c3d4e5f treb7uchet In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.
Consider your entire calibration document. What is the sum of all of the calibration values?
Lets start jupyter in our shell to start coding!
conda activate tf jupyter lab --no-browser --port=8888 First, load the test document
import pandas as pd import re txt = pd.read_table(&#39;data/2023-12-01-1-aoc.txt&#39;, names=[&#39;code&#39;]) txt code 0 jjfvnnlfivejj1 1 6fourfour 2 ninevbmltwo69 3 pcg91vqrfpxxzzzoneightzt 4 jpprthxgjfive3one1qckhrptpqdc .. ... 995 583sevenhjxlqzjgbzxhkcl5 996 81s 997 2four3threesxxvlfqfive4 998 nine6eightsevenzx9twoxc 999 hmbfjdfnp989mfivefiverpzrjs [1000 rows x 1 columns] Second, extract the digits. I had to wrap my head around regex matching in python first, because I first tried pandas.extract (which only extracts the first match), then pandas.extractall (which extracts all matches but puts them into a multiindex which makes things more difficult in this case). So I settled for the re.findall version, which returns a list. To concatenate the elements in the list, we take use the join function.
txt[&#39;digits&#39;] = txt.loc[:, &#39;code&#39;].apply( lambda x: &#39;&#39;.join(re.findall(r&#39;(\\d+)&#39;, x))) txt code digits 0 jjfvnnlfivejj1 1 1 6fourfour 6 2 ninevbmltwo69 69 3 pcg91vqrfpxxzzzoneightzt 91 4 jpprthxgjfive3one1qckhrptpqdc 31 .. ... ... 995 583sevenhjxlqzjgbzxhkcl5 5835 996 81s 81 997 2four3threesxxvlfqfive4 234 998 nine6eightsevenzx9twoxc 69 999 hmbfjdfnp989mfivefiverpzrjs 989 [1000 rows x 2 columns] Next, combine the first and the last digit and convert the result from string to integer
txt[&#39;calibration&#39;] = txt.loc[:, &#39;digits&#39;].apply( lambda x: int(x[0] + x[-1])) txt code digits calibration 0 jjfvnnlfivejj1 1 11 1 6fourfour 6 66 2 ninevbmltwo69 69 69 3 pcg91vqrfpxxzzzoneightzt 91 91 4 jpprthxgjfive3one1qckhrptpqdc 31 31 .. ... ... ... 995 583sevenhjxlqzjgbzxhkcl5 5835 55 996 81s 81 81 997 2four3threesxxvlfqfive4 234 24 998 nine6eightsevenzx9twoxc 69 69 999 hmbfjdfnp989mfivefiverpzrjs 989 99 [1000 rows x 3 columns] Lastly, get the sum of our calibration numbers
txt.loc[:, &#39;calibration&#39;].sum() 56465 Part 2 # Now follows part two:
Your calculation isn&rsquo;t quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid &ldquo;digits&rdquo;.
Equipped with this new information, you now need to find the real first and last digit on each line. For example:
two1nine eightwothree abcone2threexyz xtwone3four 4nineeightseven2 zoneight234 7pqrstsixteen In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.
What is the sum of all of the calibration values?
Okay, let&rsquo;s see if we can update the pattern matching. To deal with potential overlapping values like oneight which contains one as well as eight, I used the regex positive lookahead ?= as described here. Because this enables capturing overlapping values, I used \\d (one digit) instead of \\d+ (one or more digits), otherwise digits might double. Afterwards, just replace the spelled out digits with their numerical value.
# for i, r in enumerate(txt.loc[:, &#39;code&#39;]): # matches = re.findall( # r&#39;(?=(\\d|one|two|three|four|five|six|seven|eight|nine))&#39;, r) # result = &#39;&#39;.join([match for match in matches]) # result = result.replace(&#39;one&#39;, &#39;1&#39;).replace(&#39;two&#39;, &#39;2&#39;).replace( # &#39;three&#39;, &#39;3&#39;).replace(&#39;four&#39;, &#39;4&#39;).replace(&#39;five&#39;, &#39;5&#39;).replace( # &#39;six&#39;, &#39;6&#39;).replace(&#39;seven&#39;, &#39;7&#39;).replace(&#39;eight&#39;, &#39;8&#39;).replace( # &#39;nine&#39;, &#39;9&#39;) # txt.loc[i, &#39;digits2&#39;] = result # txt # a very nice alternative suggested by Tomalak: digits = &#39;\\d one two three four five six seven eight nine&#39;.split() txt[&#39;digits2&#39;] = txt.loc[:, &#39;code&#39;].apply(lambda v: &#39;&#39;.join( str(digits.index(m)) if m in digits else m for m in re.findall(rf&#39;(?=({&#34;|&#34;.join(digits)}))&#39;, v) )) txt code digits calibration digits2 0 jjfvnnlfivejj1 1 11 51 1 6fourfour 6 66 644 2 ninevbmltwo69 69 69 9269 3 pcg91vqrfpxxzzzoneightzt 91 91 9118 4 jpprthxgjfive3one1qckhrptpqdc 31 31 5311 .. ... ... ... ... 995 583sevenhjxlqzjgbzxhkcl5 5835 55 58375 996 81s 81 81 81 997 2four3threesxxvlfqfive4 234 24 243354 998 nine6eightsevenzx9twoxc 69 69 968792 999 hmbfjdfnp989mfivefiverpzrjs 989 99 98955 [1000 rows x 4 columns] Now, construct the calibration value as before&hellip;
txt[&#39;calibration2&#39;] = txt.loc[:, &#39;digits2&#39;].apply(lambda x: int(x[0] + x[-1])) txt code digits calibration digits2 calibration2 0 jjfvnnlfivejj1 1 11 51 51 1 6fourfour 6 66 644 64 2 ninevbmltwo69 69 69 9269 99 3 pcg91vqrfpxxzzzoneightzt 91 91 9118 98 4 jpprthxgjfive3one1qckhrptpqdc 31 31 5311 51 .. ... ... ... ... ... 995 583sevenhjxlqzjgbzxhkcl5 5835 55 58375 55 996 81s 81 81 81 81 997 2four3threesxxvlfqfive4 234 24 243354 24 998 nine6eightsevenzx9twoxc 69 69 968792 92 999 hmbfjdfnp989mfivefiverpzrjs 989 99 98955 95 [1000 rows x 5 columns] &hellip; and get the correct sum!
txt.loc[:, &#39;calibration2&#39;].sum() 55902 `})})()