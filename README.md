## HOW TO RUN THIS PROJECT:

```bash
cd kannact-backend
npm i
npm run start
```

```bash
cd kannact-frontend
npm i
npm run dev
```

## HOW TO RUN THE TESTS:

```bash
cd kannact-frontend
npm run test
```

### ADDITIONAL INFORMATION:

We have **3 docs** in this project.

This is the main README where I explain the things the reviewer should know about the code — like some assumptions I made, and why you might find some solutions that aren't optimal. I just wanted to show that I know how to handle them, but since this is a small test, I decided not to go too deep into some parts.

You can also check `QUESTIONS.MD`, where I answer the questions that were sent attached to the test.

The last one is the `README.md` inside the frontend app. There I explain my testing approach and decisions.

---

### BACKEND CONSIDERATIONS

I used `json-server` to mock the backend. Obviously this is not a production-ready solution — I had to play a bit with how data is sent because `json-server` isn't great with complex requests — but I think it’s a fair enough solution for a small test like this.

---

### FRONTEND CONSIDERATIONS

**ERRORS**  
I used `react-query` and wrapped the requests in `try-catch`, but I didn’t implement UI error handling. Ideally, I would show toasts or modals to notify users. On the homepage, you can see a basic example using `react-hot-toast`.

**LOADING STATES**  
I didn’t implement skeletons since it wasn't required, but they would be highly recommended. For mutations, I would also handle optimistic updates and error rollback properly.

**STYLES**  
I reused a lot of UI components from other personal projects. The design is very basic, but I tried to keep things clean and simple. I used CSS modules, but I'm comfortable with other approaches like Tailwind or styled-components. On bigger projects, I usually go with Material UI, which I use daily.

**PROJECT CONSIDERATIONS**  
I didn’t include Linter or Prettier configs here because I already have them set up in my VSCode. I use them daily, and of course, I’d include them in a real project — but didn’t think it was necessary for this test.

Also, I added a 2-second delay to each request to simulate a slow backend.
