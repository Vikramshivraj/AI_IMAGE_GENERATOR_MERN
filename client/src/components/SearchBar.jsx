import React from 'react';
import { SearchOutlined } from '@mui/icons-material';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  max-width: 550px;
  width: 90%;
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px 16px;
  border-radius: 10px;

  background: ${({ theme }) => theme.card || "#fff"};
  border: 1px solid ${({ theme }) => theme.text_secondary || "#ccc"};

  transition: all 0.25s ease;

  cursor: text;

  &:hover {
    border-color: ${({ theme }) => theme.primary || "#4a90e2"};
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.primary || "#4a90e2"};
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;

  font-size: 16px;
  font-weight: 500;

  color: ${({ theme }) => theme.text_primary || "#000"};  /* ✅ FIX TEXT */
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary || "#888"};
  }
`;

const SearchBar = ({ search, setSearch }) => {
  return (
    <SearchBarContainer>
      <SearchOutlined style={{ color: "#888" }} />
      <Input
        placeholder="Search with prompt or name."  
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;