const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

router.get("", async (req, res) => {
  try {
    const locals = {
      title: "Content menegment website",
      description: "Simple bloging website",
    };
    let perpage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perpage * page - perpage)
      .limit(perpage)
      .exec();

    const count = await Post.count();
    const nextpage = parseInt(page) + 1;
    const hasnextpage = nextpage <= Math.ceil(count / perpage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextpage: hasnextpage ? nextpage : null,
      currentRoute: "/",
    });
  } catch (err) {
    console.log(err);
  }
});
// post
router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    const locals = {
      title: data.title,
      description: "Simple bloging website",
    };
    res.render("post", { locals, data, currentRoute: `/post/${slug}` });
  } catch (err) {
    console.log(err);
  }
});
// search
router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple bloging website",
    };
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    res.render("search", { data, locals });
    // res.send(searchTerm);
  } catch (err) {
    console.log(err);
  }
});
// router.get("", async (req, res) => {
//   const locals = {
//     title: "NodeJs blog",
//     description: "Simple bloging website",
//   };
//   try {
//     const data = await Post.find();
//     res.render("index", { locals, data });
//   } catch (err) {
//     console.log(err);
//   }
// });

router.get("/about", (req, res) => {
  res.render("about", { currentRoute: "/about" });
});
// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "The Art of Debugging in JavaScript",
//       body: "Master the art of debugging in JavaScript and uncover hidden issues in your code.",
//     },
//     {
//       title: "Creating RESTful APIs with Express.js",
//       body: "A comprehensive guide to building RESTful APIs using Express.js, a popular Node.js framework.",
//     },
//     {
//       title: "Securing Your Node.js Applications",
//       body: "Learn best practices for securing your Node.js applications and protecting them from vulnerabilities.",
//     },
//     {
//       title: "JavaScript ES6 Features Every Developer Should Know",
//       body: "Explore the powerful ES6 features in JavaScript that can enhance your coding skills.",
//     },
//     {
//       title: "Introduction to NoSQL Databases with MongoDB",
//       body: "Get started with NoSQL databases using MongoDB and understand its key concepts.",
//     },
//     {
//       title: "Building Real-Time Chat Applications with Socket.io",
//       body: "Learn how to create real-time chat applications using Socket.io and Node.js.",
//     },
//     {
//       title: "Optimizing Node.js Applications for Performance",
//       body: "Discover strategies for optimizing the performance of Node.js applications to deliver faster responses.",
//     },
//     {
//       title: "Scaling Node.js Applications with Load Balancing",
//       body: "Scaling Node.js applications through load balancing to handle increased traffic and ensure high availability.",
//     },
//     {
//       title: "Unit Testing in Node.js with Mocha and Chai",
//       body: "Master the art of unit testing in Node.js using Mocha and Chai to ensure code reliability.",
//     },
//     {
//       title: "Exploring JavaScript Promises and Async/Await",
//       body: "Dive into JavaScript Promises and async/await to simplify asynchronous code and enhance readability.",
//     },
//     {
//       title: "Introduction to GraphQL and Apollo Server",
//       body: "Learn the fundamentals of GraphQL and how to build a GraphQL server with Apollo Server.",
//     },
//     {
//       title: "Handling File Uploads in Node.js",
//       body: "Learn how to handle file uploads in Node.js using libraries like multer and fs.",
//     },
//     {
//       title: "Caching Strategies for Node.js Web Applications",
//       body: "Explore various caching strategies to improve the performance of your Node.js web applications.",
//     },
//     {
//       title: "Authentication and Authorization in Node.js",
//       body: "Implement user authentication and authorization in Node.js applications for secure user access.",
//     },
//     {
//       title: "Using WebSockets for Real-Time Notifications",
//       body: "Create real-time notifications in your web applications using WebSockets and Node.js.",
//     },
//   ]);
// }
// insertPostData();

module.exports = router;
