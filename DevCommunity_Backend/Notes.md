
Dev Tinder
--------------------------------------------------------------------------------

`````````````````````````````````````````````````````````````````````````````````
#authRouter
-Post  /signup
-Post  /login
-Post  /logout

#profileRouter
-Get   /profile/view
-Patch /profile/edit
-Patch /profile/password - for forgot password 

#requestRouter
-/request/send/:status/:toUserId
-/request/review/:status/:requestId

#userRouter
-Get  /user/connections
-Get  /user/requests
-Get  /user/feed -

````````````````````````````````````````````````````````````````````````````````````

1. Router (ExpressJS) - It's like a traffic cop that redirect incoming request to right place.

- Make a seprete folder for routers. seprete file for all the routs like signup, login, etc

app.use('/',authRouter)
app.use('/',profileRouter)

when we are request /profile - first goes to authrouter and check is /profile present if not its move. when find in profilerouter /profile excute the code inside the profile.

[enum?]
----------------------------------------------------------------------------------
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {

-----------------------------------------------------------------------------------

indexing in moongoodb.
    $or:-logical or,not..


    1. $or — Logical OR

The $or operator is used when you want documents that match any of multiple conditions.
Syntax-{ $or: [ { condition1 }, { condition2 }, ... ] }
ex-db.users.find({
  $or: [
    { city: "Delhi" },
    { age: 25 }
  ]
})


2. $and — Logical AND

The $and operator is used when you want documents that match all conditions.

ex-db.users.find({
  $and: [
    { city: "Delhi" },
    { age: 25 }
  ]
})

-----------------------------------------------------

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,


*ref,populate--ref set the reffrence of db collection.ref stablished connection . and pupulate fetch data.-
userRouter.get('/users/requests/received',userAuth,async(req,res)=>{
        try {
            const loggedInUser=req.user
            const connectionRequests = await ConnetionRequest.find({
                toUserId:loggedInUser._id,
                status:'intrested'
            }).populate('fromUserId','firstName lastName age gender skills about profileImg',)
