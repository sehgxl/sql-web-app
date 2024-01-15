# SQL Web App

SQL web app is a simple application which allows users to input multiple sql queries and see their results.

Deployed App Link : [sql-web-app](https://sql-web-app.vercel.app/)


## 👨‍💻 Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install the app.

```bash
npm run dev
```

## 📝 Libraries Used
- [react](https://react.dev/) : For rendering the UI
- [react-query](https://tanstack.com/query/v3/docs/react/overview) : For handling the fetching of data
- [antd](https://ant.design/) : For UI components
- [tailwind](https://tailwindcss.com/) : For making quick custom UI components
- [papaparse](https://papaparse.com/) : For converting JSON to CSV
- [vite](https://vitejs.dev/) : For setting up the project

## 💻 Demo Video 

Loom has a limit of 5 minutes on the free account so you have to switch to the part 2 to watch the complete demo.

- [Part 1](https://www.loom.com/share/8bd7d14809d342ca9b760243de96f579?sid=09ba9ac9-6d83-4bb0-b0c9-060b898d70c1)
- [Part 2](https://www.loom.com/share/077c1f6c86a847ecbdb8a12a2b8689ea?sid=0312ff53-1c37-47ab-9dfc-8ed1cf81f54c)

Note : There is one change in the demo video which is the shortcut to hide the query select element. In the video it is option + h but now I have changed it to option + q. The reason was I later figured out that the previous combo resutls in a dead result which can be envoked by other key combinations as well.

## 🤔 Thinking Process 

I guarantee that none of this is written by ChatGPT :) 

### What are the prime essential features?

Essential features here mean that if we take any of them out, the whole application looses its meaning. I tried to stick with the following three : 

- User can input the query.
- User can see the result that the query produced.
- Table for showing the original data on which the query is being operated on.

### What are the cherry on top style features?

These features will not make the application completely useless if removed. But I added them as a form of adding some finesse to the app keeping in mind how can I make things easier for the user.

- Each row has a copy button at the start of the row which pastes the id of that row to the clipboard. I think a user will find this quite useful as an id serves as the primary index of the row. So when shared with others, it can serve as a quick tool to reference the row. And allowing the user to quickly grab the id makes the sharing process smoother.

- User can download the resulted table as a whole in the form of a CSV file. I think data analysts or professionals who do the same type of work need not just to view but also store the result that they are producing. So this, also serves as an additional useful feature.

- User can switch between multiple tabs. I think this makes it a bit easier for the user to build their sql muscle. As being able to quickly see multiple queries and the results they produced will help the user to build that connection which will make them better with each iteration.

- Keyboard shortcuts for making things a bit more snappier. There are two keyboard shortcuts present.
  - option + d which does the same action as when clicked on the download button.
  - option + q to hide the query select element allowing the user to only view the data table.

### Mock drafts to decide the layout

I used [excalidraw](https://excalidraw.com/) for this. Excuse the fact they are a bit chaotic.

#### Draft 1 

![image](https://github.com/sehgxl/sql-web-app/assets/83122406/ae29eb68-3d4d-42da-bfb2-1a1fec01fa3f)

#### Draft 2 

![image](https://github.com/sehgxl/sql-web-app/assets/83122406/531e40f9-64c0-40e4-a8fa-6ae86af0e6e5)

### Performance

I chose light house to measure the performance. Below is an attached screenshot of the result. I used the guestmode on chrome so that the extensions installed do not hamper the result. Although I would admit to the fact that I could not improve the metircs in any way. But in the process I did learn some things like LCP which I think was quite interesting. I interpreted LCP as the biggest bottleneck in this context. Like if you don't improve LCP all other improvements are not that useful. But I could be wrong here.

![image](https://github.com/sehgxl/sql-web-app/assets/83122406/dfee37d7-4f79-4aae-b8ea-920166ded2ed)

### What could have been better?

- Taking real sql queries as input and displaying thier results would have been interesting  to build instead of using mock api calls.
- Ability to delete the tabs.
- Ability to delete the custom query after being added.
- Actual improvement in a performance metric.
- Allowing the user to upload a csv file and run sql queries on that data.




