import React from 'react';
import styled from 'styled-components';
import SearchBar from "../components/SearchBar";
import Imagecard from '../components/Imagecard';
import { useEffect } from 'react';
import { GetPosts } from "../api";
import { CircularProgress } from "@mui/material";


const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  @media(max-width:768px){
    padding: 6px 10px;
  }
`;

const Headline = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  text-align: center;
  flex-direction: column;

  @media(max-width:600px){
    font-size: 24px;
  }
`;

const Span = styled.span`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.secondary};

   @media(max-width:768px){
    padding: 20px;
  }
`;

const Wrapper = styled.div`
width: 100%;
max-width: 1400px;
padding: 32px 0px;
  display: flex;
  justify-content: center;
  `;
const Cardwrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

 display: grid;
 gap: 20px;

 @media(min-width:1200px){
  grid-template-columns: repeat(4,1fr);
 }
  @media(min-width:640px) and (max-width:1199px){
  grid-template-columns: repeat(3,1fr);
 }
   @media(max-width:639px){
  grid-template-columns: repeat(2,1fr);
 }
  `;
const Home = () => {
  const[posts,setPosts] = React.useState([]);
  const [loading,setLoading] = React.useState(false);
  const [error,setError] = React.useState("");
  const [search,setSearch] = React.useState("");
  const [filteredPosts,setFilteredPosts] = React.useState([]);
  const getPosts = async()=>{
      setLoading(true);
      await GetPosts().then((res)=>{
        setLoading(false);
        setPosts(res.data.data);
        setFilteredPosts(res?.data?.data);
      })
      .catch((err)=>{
        setLoading(false);
        setError(error?.response?.data?.message || "Error fetching posts");
      });
    };
    useEffect(()=>{
      getPosts();
    },[getPosts]);
    useEffect(()=>{
      if(!search){
        setFilteredPosts(posts);
      }
      const SearchFilteredPosts=posts.filter((post)=>{
        const promptMatch=post?.prompt?.toLowerCase().includes(search.toString().toLowerCase())
        const authorMatch=post?.name?.toLowerCase().includes(search.toString().toLowerCase())
        return promptMatch|| authorMatch;
      });
      if(search){
        setFilteredPosts(SearchFilteredPosts);
      }
    },[posts,search]);
  return (
    <Container>
      <Headline>
        Explore popular posts in the Community!
        <Span> ⦿ Generated with AI ⦿</Span>
      </Headline>
      <SearchBar search={search} setSearch={setSearch} />
      <Wrapper>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {loading ? (
          <CircularProgress />
        ) : (
          <Cardwrapper>
            {filteredPosts.length === 0 ? 
              (<>No Posts Found</>)
              :(
                <>
          {filteredPosts
          .slice()
          .reverse()
          .map((item,index)=>(
          <Imagecard key={index} item={item}/>
          ))}
          </>
        )}
        </Cardwrapper>
  )}
      </Wrapper>
    </Container>
  );
};

export default Home;