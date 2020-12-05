This is a guide to the API calls to the NodeJS backend:

# #NOTES

# 1. Switched DB to Mongoose - Now works for all DB calls tested

# 2 On the apis that I have tested, works fine:
    --signup, login, get posts, add post, post details api calls
#3 1) Post comments - API
   2) Posts by (user, popularity, recommended)
   3) Share Post
   4) Like a post
   5) Comment on a post/or reply to a comment
   6) User Profile API
   7) Search APIs


   1. Get a post's comments using the Post comments API with the following parameters:
      [postId, authHeaders]
      Example:
      useEffect(() => {

        axios.get(API_URL + 'postComments', {headers: authHeader(), params: {postId: postId}}).then(response => {
            console.log(response.data);
            //
            setComments(response.data);

        }).catch(error => {
            console.log(error);
        });

       }); 

   2. Get posts from the DB (already created for public posts, and posts for a login user).
   3. Share post -- TO DO


   4. Like a post - using the like post API with the following parameters:
      [postId, authHeaders, likeValue]
      //set the likeValue = 1 (somewhere inside the 'PostReaction' component, in the 'likePost function), then make the API call below.
       Example:
      useEffect(() => {

        axios.put(API_URL + 'posts', { headers: authHeader(), params: {postId, likeValue}}).then(response => {
                console.log(response.data);
                setPosts(response.data);

            }).catch(error => {
                console.log(error);
            });

      }); 

    5. Comment on a post/other comment
     //api call is
     axios.post(API_URL + "postComments", {
                title,
                imageUrl,        //if attaching an image to comment
                createdBy,
                postId,
                parentCommentId  //if commenting on another comment
            },
            { headers: authHeader() })
            .then(response => {
                window.location.replace("/posts"); //redirect to posts page
               // return response.data;
            });
    6. User profile API (already done, check the UserProfile Component)
    7. Search APIS -- TO DO
    8. users api for users list:
      Example:
      useEffect(() => {

        axios.get(API_URL + 'users', {headers: authHeader()}).then(response => {
            console.log(response.data);
            //
            setPost(response.data);

        }).catch(error => {
            console.log(error);
        });

       }); 
   9. update post:  
      #place all your updated info in the 'postInfo' object.
       #Then send it below.
       #Please check the post model in coox api for the correct format, 
       #for example, if you are changing the post title only, it should be: postInfo: {title: newtitle};
       #postId MUST be included for each call

       axios.put(API_URL + "posts",
             {postId,
              postInfo
             },
            { headers: authHeader() })
            .then(response => {
                window.location.replace("/posts"); //redirect to posts page
               // return response.data;
            }); 







# Remaining work
   1) All Chats/Messages Components - View List, Send, Reply, Delete
   2) Testing
   3) Background workers
   4) Misc - Anything that may come up


# 3 shoot me a message on Slack if you need any clarification!!







