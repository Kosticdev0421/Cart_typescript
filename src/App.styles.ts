import { IconButton } from "@material-ui/core";
import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    overflow: hidden;
`;

export const StyledButton = styled(IconButton)`
    position: fixed;
    z-index: 99;
    right: 20px;
    top: 20px;
`;