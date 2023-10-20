import React, { useState, useEffect } from "react";
import "../../App.css";
import {
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Ideamodal } from "../../Components/index";
import { AiOutlinePlus } from "react-icons/ai";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { useAuth, useTheme } from "Context";
import { Icon } from "@chakra-ui/icon";
import { Link } from "react-router-dom";
import { Toast } from "../../Components/Toast/Toast";
const category = [1, 2, 3, 4, 5, 6];
export default function Explore() {
  // const [ideas, setIdeas] = useState([]);
  const ideas = [
    {
      id: "xyz",
      title: "Product Recommendation Systems",
      description:
        "Recommender systems have become more prevalent in our lives as a result of the emergence of Youtube, Amazon, Netflix, and other similar web services. They’re algorithms that help people find items that are relevant to them. In some businesses, recommender systems are crucial since they can produce a large amount of revenue or serve as a method to differentiate yourself from competitors. It determines the compatibility of the user and the object, as well as the similarities between users and items, in order to make recommendations.",
      user_profile: {
        firstname: "Subham",
        lastname: "Jaiswal",
        link: "https://picsum.photos/200",
      },
      category: { category_name: "artificial intelligence" },
      upvotes: [1, 3],
    },
    {
      id: "xyz2",
      title: "Dog and Cat Classification",
      description:
        "Dogs vs. Cats is a simple computer vision project concept that entails categorizing photographs into one of two categories. There were various machine learning algorithms used to handle this use case, however, deep learning convolutional neural networks were the most effective in the recent several years. It can be used to learn and practice building, evaluating, and using convolutional deep-learning neural networks for image categorization from the ground up. You will gain a thorough understanding of how to apply CNN in advanced AI projects as a result of doing so",
      user_profile: {
        firstname: "Krishanu",
        lastname: "Dutta",
        link: "https://picsum.photos/200",
      },
      category: { category_name: "artificial intelligence" },
      upvotes: [1, 3, 4],
    },
  ];
  const [initialIdeas, setInitialIdeas] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState(false);
  const { themeState } = useTheme();
  const { theme } = themeState;
  const user = {};
  // const { user } = useAuth();

  const getAllIdeas = async () => {
    // try {
    //   let { data, error } = await supabase
    //     .from("ideas")
    //     .select(
    //       `*, user_profile!ideas_user_id_fkey(id,firstname,lastname),category(*),upvotes(*)`
    //     )
    //     .order("created_at", { ascending: false });
    //   setIdeas(data);
    //   setInitialIdeas(data);
    //   if (error) {
    //     console.log(error);
    //   }
    // } catch (e) {
    //   console.log("Some error occured", e);
    // }
  };

  useEffect(() => {
    getAllIdeas();
  }, [isFiltered]);

  const searchItems = (searchText) => {
    setSearchText(searchText);
    if (searchText !== "") {
      const filteredIdeas = ideas.filter((item) => {
        return Object.values(item.title)
          .join("")
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
      console.log(filteredIdeas);
      // setIdeas(filteredIdeas);
    } else {
      // setIdeas(initialIdeas);
    }
  };

  const sortIdeas = (ascending) => {
    ascending
      ? ideas.sort((a, b) => a.upvotes.length - b.upvotes.length)
      : ideas.sort((a, b) => b.upvotes.length - a.upvotes.length);
  };

  //  *****
  // id, title, description, user_profile, category
  // const { category_name } = category;
  // { upvotes : [1 ,2 ,3] , }

  return (
    <div className="explore-section">
      <div className="explore-header">
        <div className="explore-search">
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.400" />}
            />
            <Input
              type="text"
              placeholder="Search idea"
              name="seacrh"
              onInput={(e) => searchItems(e.target.value)}
            />
          </InputGroup>
          <Link to={`${user ? `/Profile/${user ? user?.id : ""}` : "/login"}`}>
            <Button colorScheme="teal" variant="solid">
              Add new idea
            </Button>
          </Link>
          {/* <div className="explore-actions">
           {sort ? 
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => {
                  setSort(false);
                  sortIdeas(false);
                }}
              >
                <BiUpArrowAlt />Most Upvotes
              </Button>
          :
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => {
                  setSort(true);
                  sortIdeas(true);
                }}
              >
                <BiDownArrowAlt />Least upvotes
              </Button>}
          </div> */}
        </div>
      </div>
      <div className="idea_models">
        {ideas.map((idea) => {
          return <Ideamodal idea={idea} key={idea.id} />;
        })}
      </div>
    </div>
  );
}
