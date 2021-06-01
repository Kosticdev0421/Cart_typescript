import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column-reverse;
    font-family: Arial, Helvetica, sans-serif;
    border-bottom: 1px solid lightblue;
    padding-bottom: 20px;
    div {
        
    }
    .information,
    .buttons {
        display: flex;
        justify-content: space-between;
    }
    img {
        max-width: 150px;
        max-height: 200px;
        margin-left: 20px;
    }
`;
