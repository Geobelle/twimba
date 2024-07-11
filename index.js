import { tweetsData } from "./data.js";

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', function(e){
   if (e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
   else if (e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
   else if(e.target.dataset.comment){
    handleCommentClick(e.target.dataset.comment)
    }
    else if (e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.dataset.tweet){
        handlePostBtnClick(e.target.dataset.tweet)
    }

 })
    
 function handleLikeClick(tweetId){

    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

if (targetTweetObj.isLiked){
    targetTweetObj.likes--
}
else {
    targetTweetObj.likes++
}
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}
function handleRetweetClick(tweetId){
   const targetRetweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
   })[0]
   if (targetRetweetObj.isRetweeted){
        targetRetweetObj.retweets--
   }
   else {
        targetRetweetObj.retweets++
   }
   targetRetweetObj.isRetweeted = !targetRetweetObj.isRetweeted
   render()
  
}

function handleCommentClick(commentId){
    document.getElementById(`comment-${commentId}`).classList.toggle('hidden')
          
}
function handleReplyClick(replyId){
    document.getElementById(`reply-${replyId}`).classList.toggle('hidden')
}
function  handlePostBtnClick(tweetId){
    const targetReplyObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
   })[0]
    const commentInput = document.getElementById(`${tweetId}`)
    if (!commentInput.value == ""){
       
       targetReplyObj.comments.unshift({
            handle: `@scrimba`,
                    profilePic: `images/scrimbalogo.png`,
                    tweetText: `${commentInput.value}`,
            })
        render()
        }
}
function handleTweetBtnClick(){

    const tweetInput = document.getElementById('tweet-input')
    if (!tweetInput.value == ""){
    tweetsData.unshift({
        handle: `@scrimba`,
                profilePic: `images/scrimbalogo.png`,
                likes: 0,
                retweets: 0,
                tweetText: `${tweetInput.value}`,
                comments: [],
                isLiked: false,
                isRetweeted: false,
                uuid: uuidv4()
        })
    render()
    }
    tweetInput.value =""
}


function getFeedHtml(){

    let feedHtml = ``

    tweetsData.forEach(function(tweet) {
        let likeIconClass = ''
              
       if (tweet.isLiked){
            likeIconClass='liked'
       }

       let retweetIconClass = ''

       if (tweet.isRetweeted){
            retweetIconClass='retweeted'
       }

       let commentHtml = ''

        if(tweet.comments.length > 0){
            tweet.comments.forEach(function(comment){
                commentHtml += `
                                <div class="tweet-reply">
                                    <div class="tweet-inner">
                                        <img src="${comment.profilePic}" class="profile-pic">
                                            <div>
                                                <p class="handle">${comment.handle}</p>
                                                <p class="tweet-text">${comment.tweetText}</p>
                                            </div>
                                        </div>
                                </div>
                `
            })
        }

        let replyHtml = `<div class= "comment-div">
                        <textarea placeholder="my thoughts" class = "comment-input" id="${tweet.uuid}"></textarea>
                        <button id="comment-btn" data-tweet="${tweet.uuid}">Tweet</button>
                        </div>
                            `

        feedHtml+= `
                                    <div class="tweet">
                                        <div class="tweet-inner">
                                            <img src="${tweet.profilePic}" class="profile-pic">
                                            <div>
                                                <p class="handle">${tweet.handle}</p>
                                                <p class="tweet-text">${tweet.tweetText}</p>
                                                <div class="tweet-details">
                                                    <span class="tweet-detail">
                                                    <i class="fa-regular fa-comment-dots" data-comment="${tweet.uuid}"></i>
                                                       ${ tweet.comments.length}
                                                    </span>
                                                    <span class="tweet-detail">
                                                    <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                                                        ${tweet.likes}
                                                    </span>
                                                    <span class="tweet-detail">
                                                     <i class="fa-solid fa-retweet  ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                                                        ${tweet.retweets}
                                                    </span>
                                                     <span class="tweet-detail">
                                                     <i class="fa-solid fa-reply " data-reply="${tweet.uuid}"></i>
                                                    </span>
                                                </div>   
                                            </div>            
                                        </div>
                                        <div class = "hidden tweet-comment" id="comment-${tweet.uuid}">
                                                ${commentHtml}
                                        </div>  
                                        <div class = "hidden " id="reply-${tweet.uuid}">
                                                ${replyHtml}
                                        </div>  
                                    </div>
        `


    }) 
    return feedHtml
    
    }

function render(){
    document.getElementById("feed").innerHTML = getFeedHtml()
    
}
render()
