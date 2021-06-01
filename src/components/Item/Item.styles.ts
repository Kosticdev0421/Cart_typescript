import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    border: 1px solid lightblue;
    border-radius: 20px;
    height: 100%;
    button {
        border-radius: 0 0 20px 20px;
        background-color: #272727;
        color: white;
    }
    button:hover{
        color: black;
    }
    img {
        max-height: 50%;
        max-width: 80%;
        object-fit: cover;
        margin: 0 auto;
        border-radius: 20px 20px 0 0;
    }
    div {
        font-family: Arial, Helvetica, sans-serif;
        padding: 1rem;
    }
`;
