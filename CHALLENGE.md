# FounderNest Backend Challenge

## Business context

At **FounderNest**, we help **connecting founders and investors (or corporates)** in a **neutral, efficient, and transparent way**. To achieve that, our initial strategy was to start by attracting the investor side of the marketplace. How? By building a tool for them that we called the Screener, which was an automated analyst where they could upload the companies they were currently considering to invest in (a.k.a, their deal flow or pipeline).

Let’s see a quick example of how the Screener would work with an anonymous user randomly extracted from our database. Tony S. (email: tony@stark-industries.com) logs into the Screener, with his existing account. He received an email from a founder this morning, and wants to know how her company would match with him. For that purpose, Tony uploads the company: Umbrella Corp., and obtains a detailed scorecard from FounderNest, not only with information about the company (when it was founded, previous funding rounds, employees info…), but also with a Matching Score that shows how it matches with Tony’s preferences. Since Tony already configured his criteria in the Screener:

- Location is New York or Boston.
- Industries are Energy and Materials Engineering.
- CTO has studied at MIT.

The Screener compares Tony’s criteria with the information extracted about Umbrella Corp, a pharmaceutical company based in Raccoon City, whose CTO is unknown, and determines that Umbrella Corp. is not a good match for Tony, which is displayed with a matching score of 10%. With that info, Tony decides to pass on the company instead of having a meeting with them.

You can use the [very first MVP of this product](http://beta.928684.foundernest.com:8080/), to get your own idea. What you will see is what Tony sees after logging in: a dashboard with all the companies awaiting his decision (either meeting with them, or passing). He can click on the company name to see the scorecard with the information about how this company matches with his criteria (shown as a Y / N / ? that can be updated in case he has more information), and he can make a decision by clicking on Meet or Pass.

## The challenge

Imagine you have been hired by FounderNest and this is your first task. You have a week to design and implement a back-end that will provide data for FounderNest's [first MVP](http://beta.928684.foundernest.com:8080/). Please, include also an **estimate of the time you have spent** working on the challenge as a whole and a break-down of this estimate in the main parts you have structured your work in.

- **Design your own way**: bear in mind that this MVP was our first approach and it's far from perfect. For this reason and regarding your back-end, feel free to add, remove or change endpoints, restructure the data to fit your new models, etc. if you think it makes more sense.
- **You have a week**: we will contact you in a week to agree on a time to present your work. Don’t worry if you are busy and you would prefer to present a day earlier / later. We are flexible!
- **Use Node and whatever else you want**: since our current stack is all based on Node, we prefer you to use it. Apart from it, feel free to use any other technology / tools you want! Our advice is to use the ones you know and that you are most comfortable with, so that you can show your best work.
- **No need to implement everything**: if you organize your code using any kind of architectural pattern, there is no need to implement everything. As long as you show, at least, one or two examples of each layer / role, should be enough. Of course, if you decide to implement the whole thing, that’s bonus points!
- **Think ahead**: as a startup, we have to constantly deal with the trade-off: short-term vs long-term. Even though this is a week-long project with a clear deliverable, imagine you (and maybe others) will have to continue working on it afterwards. What would (or will) you do differently?
- **Show off as much as possible!**: note that we will use this project to try to infer your real skills, so try to show as many (and as much) of them as possible. Still have doubts? Some ideas:
  - You love Clean Code and organizing your code in small, clear, reusable functions? Do it!
  - You think that everything starts with a good Product work and having a well defined backlog that connects with the business requirements? Do it!
  - You are a freak of testing and cannot sleep well with a test coverage below 100%? Do it!
  - You hate installing tools in your laptop and always use virtual machines / containers because it’s much cleaner? Do it!
  - You think that documentation is essential when working with a team and secretly contribute to Swagger / JSDoc / PyDoc / Notion (?) / Confluence (!)… at nights? Do it!
  - You believe Prod / Dev parity is key and like to have a Minikube to mimic your production Kubernetes? Do it!
  - You iterate a lot in your code and consider a must to have some kind of version control (Git, SVN, CVS, Mercurial…) with detailed commit messages? Do it!
  - You know and love X tool / framework / library / technology and think it is awesome for Y problem / situation / task? Guess what… do it!
