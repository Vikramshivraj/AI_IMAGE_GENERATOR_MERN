import React from 'react'; 
import styled from 'styled-components'; 
import GenerateImageForm from "../components/GenerateImageForm";
import GenratedImageCard from "../components/GenratedImageCard";

const Container = styled.div`

  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  @media(max-width:768px){
    padding: 6px 10px;
  }
`;
const Wrapper = styled.div`
height:fit-content;
width: 100%;
max-width: 1200px;
gap:8%;

  display: flex;
  justify-content: center;
  @media(max-width:768px){
  flex-direction: column;
  }
  `;


const CreatePost = () => {
  const[genrateImageLoading, setGenrateImageLoading] = React.useState(false);
  const[createPostLoading, setCreatePostLoading] = React.useState(false);
  const[post,setPost] = React.useState({
    name:"",
    prompt:"",
    photo:"",
  });

  return (
  <Container>
    <Wrapper>
      <GenerateImageForm 
      post={post} 
      setPost={setPost} 
      createPostLoading={createPostLoading} 
      setGenrateImageLoading={setGenrateImageLoading}
      genrateImageLoading={genrateImageLoading}
      setCreatePostLoading={setCreatePostLoading}
      />
      <GenratedImageCard src ={post?.photo}loading={genrateImageLoading}/>
    </Wrapper>
  </Container>
  );
};
export default CreatePost;