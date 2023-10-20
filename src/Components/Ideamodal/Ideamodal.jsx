import React, { useState, useEffect } from "react";
import { useDisclosure, Button, Tag } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import "../Ideamodal/Ideamodal.css";
import { useTheme } from "Context";

import { useAuth } from "Context";
import { Toast } from "../../Components/Toast/Toast"
import { ModalDialog } from "Components";
import { Link } from "react-router-dom";
function Ideamodal({ idea, isProfilePage }) {
  const { id, title, description, user_profile, category } = idea;
  const { firstname, lastname } = user_profile;

  const [upvoteToggle, setUpvoteToggle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState("");
  const [ideaComments, setIdeaComments] = useState([]);
  // const ideaUpvotes = [{upvotedby_userid: "xyz"},{upvotedby_userid: "xyz2"}]
  const [ideaUpvotes, setIdeaUpvotes] = useState([{upvotedby_userid: "xyz"},{upvotedby_userid: "xyz2"}]);
  const [commentAdded, setCommentAdded] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const { themeState } = useTheme();
  const { theme } = themeState;
  const { category_name } = category;
  const theme_text = theme === "light" ? "text_light" : "text_dark";
  const user = {};
  // const { user } = useAuth();
  const { userId } = useParams();

  const isUserSame = user?.id === userId;

  const getCommentsByIdeaId = async () => {
    // try {
    //   let { data, error } = await supabase
    //     .from("comments")
    //     .select(`*,user_profile(firstname,lastname)`)
    //     .eq("idea_id", id);
    //   setIdeaComments(data);
    //   setCommentAdded(false);
    //   if (error) {
    //     console.log(error);
    //   }
    // } catch (e) {
    //   console.log("Some error occured", e);
    // }
  };

  useEffect(() => {
    getCommentsByIdeaId();
  }, [commentAdded]);

  const updateUpvote = async () => {
    if(upvoteToggle){
      const hello = ideaUpvotes.filter((item) => item.upvotedby_userid !== "xyz3")
      setIdeaUpvotes(hello);
    }else {
      setIdeaUpvotes(prev => [...prev ,{upvotedby_userid: "xyz3"} ])
      // ideaUpvotes.push({upvotedby_userid: "xyz3"})
    }
  //   if (upvoteToggle) {
  //     try {
  //       const { data:upvote, error } = await supabase
  //         .from("upvotes")
  //         .select('*')
  //         .match({"idea_id": id, upvotedby_userid : user.id});
  //         console.log(upvote)
  //         debugger;
  //       if (error) console.log(error);
  //       else{
  //         try 
  //         {
  //           const { data, error } = await supabase
  //             .from("upvotes")
  //             .delete()
  //             .eq('id',upvote[0].id);
  //           setIsUpvoted(true);
  //           setUpvoteToggle(false)
  //           if (error) console.log(error);
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       }
      
  //   } 
  //   catch(e){
  //     console.log(e)
  //   }
  // }
  //   else{
  //     try {
  //       const { data, error } = await supabase
  //         .from("upvotes")
  //         .insert([{ idea_id: id, upvotedby_userid: user.id }]);
  //       setIsUpvoted(true);
  //       setUpvoteToggle(true);
  //       if (error) console.log(error);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //       }
     
    }
  
  const getUpvotesByIdeaId = async () => {
    // try {
    //   let { data, error } = await supabase
    //     .from("upvotes")
    //     .select(`*`)
    //     .eq("idea_id", id);
    //   setIdeaUpvotes(data);
    //   setIsUpvoted(false);
    //   if (error) {
    //     console.log(error);
    //   }
    // } catch (e) {
    //   console.log("Some error occured", e);
    // }
  };

  useEffect(() => {
    getUpvotesByIdeaId();
  }, [isUpvoted]);

  const postComment = async () => {
    setIdeaComments([{id: "xyz", comment: comment, user_profile: {firstname: "test" , lastname: "user"}}])
    // try {
    //   const { data, error } = await supabase
    //     .from("comments")
    //     .insert([{ comment: comment, idea_id: id, user_id: user.id }]);
    //   setCommentAdded(true);
    //   if (error) {
    //     console.log(error);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const submitComment = () => {
    postComment();
    setComment("");
  };

 const isUpvotedByMe = () => ideaUpvotes?.some(vote => vote.upvotedby_userid === user?.id) 

  return (
    <div>
      <div className="idea-showcase">
        <section>
          <div onClick={onOpen} className="cursor">
            <h1 className={`bold-font ${theme_text}`}>{title}</h1>
            <p className={`idea-intro ${theme_text}`}>{description}</p>
          </div>

          {isProfilePage ? (
            <Tag size="lg" variant="subtle" colorScheme="teal">
              {category_name}
            </Tag>
          ) : (
            <Link to={`/Profile/${idea.user_profile.id}`}>
              <Button colorScheme="teal" variant="link">
                {firstname + " " + lastname}
              </Button>
            </Link>
          )}
        </section>
        <div className="flex-col">
          <Button
            className="buttonZindex"
            colorScheme="teal"
            variant={"outline"}
            onClick={() => {
              setUpvoteToggle(prev => !prev);
              updateUpvote();
              !user && Toast("Login Please", "warning");
            }}
          >
            {isUpvotedByMe() ? <ArrowDownIcon /> : <ArrowUpIcon />}
            <h1>{ideaUpvotes.length}</h1>
          </Button>
          <Button colorScheme="teal" variant="solid" onClick={onOpen}>
            View
          </Button>
        </div>
      </div>
      <ModalDialog
        explore={true}
        idea={idea}
        isOpen={isOpen}
        submitComment={submitComment}
        comment={comment}
        setComment={setComment}
        ideaComments={ideaComments}
        onClose={onClose}
        upvoteToggle={upvoteToggle}
        setUpvoteToggle={setUpvoteToggle}
        ideaUpvotes={ideaUpvotes}
        updateUpvote={updateUpvote}
        isUpvotedByMe={isUpvotedByMe}
      />
    </div>
  );
}
export { Ideamodal };
