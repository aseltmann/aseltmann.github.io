"use strict";(function(){const t={cache:!0};t.doc={id:"id",field:["title","content"],store:["title","href","section"]};const e=FlexSearch.create("balance",t);window.bookSearchIndex=e,e.add({id:0,href:"/posts/aoc2023-day01/",title:"AOC 2023 - Day 1: Trebuchet?!",section:"Posts",content:` Part 1 # Our first task is the following: The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
For example:
1abc2 pqr3stu8vwx a1b2c3d4e5f treb7uchet In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.
Consider your entire calibration document. What is the sum of all of the calibration values?
Lets start jupyter in our shell to start coding!
conda activate tf jupyter lab --no-browser --port=8888 First, load the test document
import pandas as pd import re txt = pd.read_table(&#39;data/2023-12-01-1-aoc.txt&#39;, names=[&#39;code&#39;]) txt code 0 jjfvnnlfivejj1 1 6fourfour 2 ninevbmltwo69 3 pcg91vqrfpxxzzzoneightzt 4 jpprthxgjfive3one1qckhrptpqdc .. ... 995 583sevenhjxlqzjgbzxhkcl5 996 81s 997 2four3threesxxvlfqfive4 998 nine6eightsevenzx9twoxc 999 hmbfjdfnp989mfivefiverpzrjs [1000 rows x 1 columns] Second, extract the digits. I had to wrap my head around regex matching in python first, because I first tried pandas.extract (which only extracts the first match), then pandas.extractall (which extracts all matches but puts them into a multiindex which makes things more difficult in this case). So I settled for the re.findall version, which returns a list. To concatenate the elements in the list, we take use the join function.
txt[&#39;digits&#39;] = txt.loc[:, &#39;code&#39;].apply( lambda x: &#39;&#39;.join(re.findall(r&#39;(\\d+)&#39;, x))) txt code digits 0 jjfvnnlfivejj1 1 1 6fourfour 6 2 ninevbmltwo69 69 3 pcg91vqrfpxxzzzoneightzt 91 4 jpprthxgjfive3one1qckhrptpqdc 31 .. ... ... 995 583sevenhjxlqzjgbzxhkcl5 5835 996 81s 81 997 2four3threesxxvlfqfive4 234 998 nine6eightsevenzx9twoxc 69 999 hmbfjdfnp989mfivefiverpzrjs 989 [1000 rows x 2 columns] Next, combine the first and the last digit and convert the result from string to integer
txt[&#39;calibration&#39;] = txt.loc[:, &#39;digits&#39;].apply( lambda x: int(x[0] + x[-1])) txt code digits calibration 0 jjfvnnlfivejj1 1 11 1 6fourfour 6 66 2 ninevbmltwo69 69 69 3 pcg91vqrfpxxzzzoneightzt 91 91 4 jpprthxgjfive3one1qckhrptpqdc 31 31 .. ... ... ... 995 583sevenhjxlqzjgbzxhkcl5 5835 55 996 81s 81 81 997 2four3threesxxvlfqfive4 234 24 998 nine6eightsevenzx9twoxc 69 69 999 hmbfjdfnp989mfivefiverpzrjs 989 99 [1000 rows x 3 columns] Lastly, get the sum of our calibration numbers
txt.loc[:, &#39;calibration&#39;].sum() 56465 Part 2 # Now follows part two: Your calculation isn&rsquo;t quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid &ldquo;digits&rdquo;.
Equipped with this new information, you now need to find the real first and last digit on each line. For example:
two1nine eightwothree abcone2threexyz xtwone3four 4nineeightseven2 zoneight234 7pqrstsixteen In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.
What is the sum of all of the calibration values?
Okay, let&rsquo;s see if we can update the pattern matching. To deal with potential overlapping values like oneight which contains one as well as eight, I used the regex positive lookahead ?= as described here. Because this enables capturing overlapping values, I used \\d (one digit) instead of \\d+ (one or more digits), otherwise digits might double. Afterwards, just replace the spelled out digits with their numerical value.
for i, r in enumerate(txt.loc[:, &#39;code&#39;]): matches = re.findall( r&#39;(?=(\\d|one|two|three|four|five|six|seven|eight|nine))&#39;, r) result = &#39;&#39;.join([match for match in matches]) result = result.replace(&#39;one&#39;, &#39;1&#39;).replace(&#39;two&#39;, &#39;2&#39;).replace( &#39;three&#39;, &#39;3&#39;).replace(&#39;four&#39;, &#39;4&#39;).replace(&#39;five&#39;, &#39;5&#39;).replace( &#39;six&#39;, &#39;6&#39;).replace(&#39;seven&#39;, &#39;7&#39;).replace(&#39;eight&#39;, &#39;8&#39;).replace( &#39;nine&#39;, &#39;9&#39;) txt.loc[i, &#39;digits2&#39;] = result txt code digits calibration digits2 0 jjfvnnlfivejj1 1 11 51 1 6fourfour 6 66 644 2 ninevbmltwo69 69 69 9269 3 pcg91vqrfpxxzzzoneightzt 91 91 9118 4 jpprthxgjfive3one1qckhrptpqdc 31 31 5311 .. ... ... ... ... 995 583sevenhjxlqzjgbzxhkcl5 5835 55 58375 996 81s 81 81 81 997 2four3threesxxvlfqfive4 234 24 243354 998 nine6eightsevenzx9twoxc 69 69 968792 999 hmbfjdfnp989mfivefiverpzrjs 989 99 98955 [1000 rows x 4 columns] Now, construct the calibration value as before&hellip;
txt[&#39;calibration2&#39;] = txt.loc[:, &#39;digits2&#39;].apply(lambda x: int(x[0] + x[-1])) txt code digits calibration digits2 calibration2 0 jjfvnnlfivejj1 1 11 51 51 1 6fourfour 6 66 644 64 2 ninevbmltwo69 69 69 9269 99 3 pcg91vqrfpxxzzzoneightzt 91 91 9118 98 4 jpprthxgjfive3one1qckhrptpqdc 31 31 5311 51 .. ... ... ... ... ... 995 583sevenhjxlqzjgbzxhkcl5 5835 55 58375 55 996 81s 81 81 81 81 997 2four3threesxxvlfqfive4 234 24 243354 24 998 nine6eightsevenzx9twoxc 69 69 968792 92 999 hmbfjdfnp989mfivefiverpzrjs 989 99 98955 95 [1000 rows x 5 columns] &hellip; and get the correct sum!
txt.loc[:, &#39;calibration2&#39;].sum() 55902 `}),e.add({id:1,href:"/docs/notes/poetry/",title:"Poetry",section:"Notes",content:` Lǎozǐ # I am partial to the translation of Derek Lin
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
`}),e.add({id:2,href:"/docs/projects/",title:"Projects",section:"Docs",content:` Current projects # I am a believer in the principles of Open Science, Open Data and Open Source. Thus, I am currently working on a reproducible way of conducting my research on simulation of Fluorescence Correlation Spectroscopy (FCS) measurements and correcting artifacts using neural networks, such as Convolutional Neural Nets (CNNs). I do not have my workflow fixed yet, but to have an insight in my current approach - and with the principles of Open-notebook science in mind:
Fluotracify - doctoral research project done in a reproducible way
Description: In a current project, we apply Deep Learning techniques on Fluorescence Correlation Spectroscopy (FCS) data to correct a variety of hardware- and sample-related artifacts, such as photobleaching, contamination from additional slow moving particles, or sudden drops in intensity because of detector anomalies.
Conference talks # Seltmann A, Eggeling C, Waithe D. Automated, User-independent Correction of Artifacts in Fluorescence Correlation Spectroscopy Measurements using Convolutional Neural Networks. Quantitative BioImaging Conference (QBI); 2020 Jan 6-9; Oxford, UK `})})()