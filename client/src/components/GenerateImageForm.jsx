import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./button";
import TextInput from "./TextInput";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { CreatePost, GenerateImage } from "../api";

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

const GenerateImageForm = ({
  post,
  setPost,
  createPostLoading,
  setGenrateImageLoading,
  genrateImageLoading,
  setCreatePostLoading,
}) => {
  const navigate = useNavigate();
  const [err, setError] = useState("");

  const generateImageFun = async () => {
    try {
      setGenrateImageLoading(true);

      const res = await GenerateImage({ prompt: post.prompt });

      setPost({
        ...post,
       photo: res.data.photo,
      });

      setGenrateImageLoading(false);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || "Something went wrong");
      setGenrateImageLoading(false);
    }
  };

  const createPostfun = async () => {
    try {
      setCreatePostLoading(true);

      await CreatePost(post);

      setCreatePostLoading(false);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
      setCreatePostLoading(false);
    }
  };
  return (
    <Form>
      <Top>
        <Title>Generate Image with prompt</Title>
        <Desc>
          Write your prompt according to the image you want to generate
        </Desc>
      </Top>

      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name.."
          name="name"
          value={post.name}
          onChange={(e) =>
            setPost({ ...post, name: e.target.value })
          }
        />

        <TextInput
          label="Image Prompt"
          placeholder="Write a detailed prompt about the image you want to generate..."
          name="prompt"
          value={post.prompt}
          onChange={(e) =>
            setPost({ ...post, prompt: e.target.value })
          }
        />

        {err && (
          <div style={{ color: "red", fontSize: "14px" }}>
            {err}
          </div>
        )}

        <p>
          You can post the AI generated image to the community to inspire others and show your creativity
        </p>
      </Body>

      <Actions>
        <Button
          text="Generate image"
          flex
          leftIcon={<AutoAwesome />}
          isLoading={genrateImageLoading}
          isDisabled={post.prompt === ""}
          onClick={generateImageFun}
        />

        <Button
          text="Post Image"
          flex
          type="secondary"
          leftIcon={<CreateRounded />}
          isLoading={createPostLoading}
          isDisabled={
            post.name === "" || post.prompt === "" || post.photo === ""
          }
          onClick={createPostfun}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;