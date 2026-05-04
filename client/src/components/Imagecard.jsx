import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";

const Card = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;

  background: ${({ theme }) => theme.card || "#fff"};
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  transition: 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledImage = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HoverOverlay = styled.div`
  opacity: 0;
  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;

  padding: 12px;
  border-radius: 12px;

  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(3px);
  color: white;

  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-size: 14px;
  font-weight: 500;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Author = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DownloadIcon = styled(DownloadRounded)`
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.2);
    color: #00ffcc;
  }
`;

const downloadImage = (base64) => {
  const link = document.createElement("a");
  link.href = base64;
  link.download = "image.jpg";
  link.click();
};

const Imagecard = ({ item }) => {
  return (
    <Card>
      <StyledImage
        alt={item?.prompt}
        src={item?.photo}
      />

      <HoverOverlay>
        <Prompt>{item?.prompt}</Prompt>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Author>
            <Avatar sx={{ width: "32px", height: "32px" }}>
              {item?.name?.[0]}
            </Avatar>
            {item?.name}
          </Author>

          <DownloadIcon onClick={() => downloadImage(item?.photo)} />
        </div>
      </HoverOverlay>
    </Card>
  );
};

export default Imagecard;