import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: 10px 24px;
  border: none;

  @media (max-width: 600px) {
    padding: 8px 12px;
  }

  ${({ variant, theme }) =>
    variant === "secondary"
      ? `background: ${theme.secondary};`
      : `background: ${theme.primary};`}

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: not-allowed;
  `}

  ${({ flex }) =>
    flex &&
    `
    flex: 1;
  `}
`;

const Button = ({
  text,
  isLoading = false,
  isDisabled = false,
  rightIcon,
  leftIcon,
  variant = "primary",
  onClick,
  flex,
  type = "button",
}) => {
  const disabled = isDisabled || isLoading;

  return (
    <StyledButton
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      variant={variant}
      flex={flex}
      type={type}
    >
      {isLoading && (
        <CircularProgress size={18} style={{ color: "white" }} />
      )}
      {!isLoading && leftIcon}
      {text}
      {!isLoading && rightIcon}
    </StyledButton>
  );
};

export default Button;