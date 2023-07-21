const { Router } = require("express");
const {csrfTokenLimiter} = require("../../Middlewares/rateLimit")
const router = Router();

router.get("/", async (req, res, next) => {
    res.status(200).json({
        successful:true,
        message:"Welcome to the Metahome API"
    })  
})
router.get('/csrfToken', csrfTokenLimiter, (req, res) => {
  const csrfToken = req.csrfToken();
  res.json({ csrfToken });
});
// how to use csrf token in react
// const { csrfToken } = await fetch('/api/csrf').then(res => res.json());
{/* <form action="/submit" method="POST">
  <!-- Add the CSRF token field -->
  <input type="hidden" name="_csrf" value="{{ csrfToken }}">
  <!-- Other form fields -->
  ...
</form> */}


// how to use csrf token in axios
// fetch('/api/endpoint', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'X-CSRF-Token': csrfToken,
//   },
//   body: JSON.stringify({ ...data }),
// })
//   .then((response) => response.json())
//   .then((responseData) => {
//     // Handle the response
//   })
//   .catch((error) => {
//     // Handle errors
//   });

module.exports = router;