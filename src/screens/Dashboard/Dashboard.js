import React, { useEffect, useState } from "react";

import {
  Button,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  InputBase,
  styled,
  alpha,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  getArticles,
  searchArticles,
} from "../../redux/actions/articlesAction";

import styles from "./Dashboard.styles.js";
import Article from "../../components/Article/Article";
import { logoutUser } from "../../redux/actions/loginAction";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(7),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const Dashboard = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  // const [search, setSearch] = useState("");
  const { articles, filteredArticles, searchInput } = useSelector(
    (state) => state.article
  );
  const { accessToken } = useSelector((state) => state.auth);

  const searchHandler = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    dispatch(searchArticles(searchQuery));
    // setSearch(lowerCase);
  };
  const SubmitSearch = (e) => {
    e.preventDefault();
  };
  const logoutHandler = () => {
    // history.push("/");
    dispatch(logoutUser());
  };
  useEffect(() => {
    dispatch(getArticles(page));
  }, []);
  const scrollToEnd = () => {
    setPage(page + 1);
    dispatch(getArticles(page));
  };

  const articlesToDispaly = searchInput ? filteredArticles : articles;

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollToEnd();
    }
  };

  if (accessToken === "") {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar sx={styles.toolbar}>
          <Typography variant="h6">Articles</Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={searchHandler}
              onSubmit={SubmitSearch}
            />
          </Search>
          <Box>
            <Button
              sx={styles.btnLogout}
              onClick={logoutHandler}
              variant="contained"
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {articlesToDispaly.map((article, index) => {
        return (
          <Grid item key={index} md={12} sm={6} xs={12}>
            <Article
              abstract={article?.abstract}
              lead_paragraph={article?.lead_paragraph}
              keywords={article?.keywords}
              person={article?.byline?.person}
            />
          </Grid>
        );
      })}
    </div>
  );
};
export default Dashboard;
